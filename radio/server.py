#!/usr/bin/env python3
"""
Delhi FM Radio - Local Web Server
Hosts the web application on any specified port (default: 8080)
Supports static file serving with CORS and an optional audio proxy.
"""

import http.server
import socketserver
import urllib.request
import urllib.parse
import sys
import os
import mimetypes

# Set stdout/stderr to UTF-8 for Windows compatibility
if sys.platform == 'win32':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
        sys.stderr.reconfigure(encoding='utf-8')
    except Exception:
        pass

DEFAULT_PORT = 8080

class DelhiRadioHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Enable CORS headers for smooth local development
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')
        self.send_header('Cache-Control', 'no-cache')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_HEAD(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path in ('/stream-proxy', '/hls-proxy'):
            self.do_GET()
        else:
            super().do_HEAD()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        
        # Transparent HLS and Audio Stream Proxy
        if parsed.path in ('/stream-proxy', '/hls-proxy'):
            params = urllib.parse.parse_qs(parsed.query)
            target_url = params.get('url', [None])[0]
            if not target_url:
                self.send_response(400)
                self.end_headers()
                self.wfile.write(b"Missing url parameter")
                return

            try:
                req = urllib.request.Request(
                    target_url,
                    headers={
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) DelhiRadio/1.0',
                        'Icy-MetaData': '1'
                    }
                )
                with urllib.request.urlopen(req, timeout=10) as remote_resp:
                    content_type = remote_resp.headers.get('Content-Type', '')
                    
                    # If this is an M3U8 manifest, rewrite relative segment/variant URLs to go through this proxy
                    if '.m3u8' in target_url.lower() or 'mpegurl' in content_type.lower():
                        raw_data = remote_resp.read().decode('utf-8', errors='ignore')
                        rewritten_lines = []
                        for line in raw_data.splitlines():
                            line_s = line.strip()
                            if line_s and not line_s.startswith('#'):
                                abs_seg_url = urllib.parse.urljoin(target_url, line_s)
                                rewritten_line = f"/hls-proxy?url={urllib.parse.quote(abs_seg_url, safe='')}"
                                rewritten_lines.append(rewritten_line)
                            else:
                                rewritten_lines.append(line)
                        rewritten_body = '\n'.join(rewritten_lines).encode('utf-8')
                        self.send_response(200)
                        self.send_header('Content-Type', 'application/vnd.apple.mpegurl')
                        self.send_header('Content-Length', str(len(rewritten_body)))
                        self.end_headers()
                        self.wfile.write(rewritten_body)
                        return

                    # Otherwise, stream binary audio segment / mp3 / aac directly
                    self.send_response(remote_resp.status)
                    for k, v in remote_resp.headers.items():
                        if k.lower() in ['content-type', 'content-length', 'icy-name', 'icy-genre', 'icy-br']:
                            self.send_header(k, v)
                    self.end_headers()

                    while True:
                        chunk = remote_resp.read(8192)
                        if not chunk:
                            break
                        self.wfile.write(chunk)
            except Exception as e:
                return
            return

        # Default static file serving
        return super().do_GET()


def run_server(port=DEFAULT_PORT):
    # Set working directory to project root
    os.chdir(os.path.dirname(os.path.abspath(__file__)))

    # Ensure custom mimetypes
    mimetypes.add_type("application/javascript", ".js")
    mimetypes.add_type("text/css", ".css")
    mimetypes.add_type("application/vnd.apple.mpegurl", ".m3u8")

    class ThreadedTCPServer(socketserver.ThreadingMixIn, socketserver.TCPServer):
        allow_reuse_address = True
        daemon_threads = True

    try:
        with ThreadedTCPServer(("0.0.0.0", port), DelhiRadioHandler) as httpd:
            print("=" * 60)
            print(f"📻 DELHI FM LIVE RADIO PLAYER IS NOW RUNNING!")
            print(f"👉 Local URL:   http://localhost:{port}")
            print(f"👉 Network URL: http://127.0.0.1:{port}")
            print(f"👉 Broadcasters: Red FM 93.5, Mirchi 98.3, AIR FM Gold 100.1,")
            print(f"                 AIR FM Rainbow 102.6, Ishq 104.8 FM, Vividh Bharati")
            print("=" * 60)
            sys.stdout.flush()
            httpd.serve_forever()
    except OSError as e:
        if "Address already in use" in str(e) or e.errno == 98 or e.errno == 10048:
            alt_port = port + 1
            print(f"Port {port} busy, switching to port {alt_port}...")
            run_server(alt_port)
        else:
            raise e

if __name__ == '__main__':
    port = DEFAULT_PORT
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
        except ValueError:
            pass
    run_server(port)

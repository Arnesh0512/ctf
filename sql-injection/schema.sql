-- ====================================================================
-- CHUSHUL DEFENSE NET // CTF SQL INJECTION SCHEMA
-- ====================================================================

-- 1. Create Challenge Table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  role VARCHAR(30) DEFAULT 'user'
);

-- 2. Insert Dummy Records
INSERT INTO users (username, password, role)
VALUES 
  ('admin', 'S3cr3tAdm!nP@ss_2026_x99', 'administrator'),
  ('operator', 'EchoTangoBravo_77', 'operator'),
  ('guest', 'guest', 'guest')
ON CONFLICT (username) DO NOTHING;

-- 3. Verify Table
SELECT * FROM users;

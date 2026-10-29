-- ====================================================================
-- DAULATABAD FORTRESS (DEOGIRI) // CITADEL ACCESS GATEWAY
-- ====================================================================

-- 1. Create Garrison Table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  role VARCHAR(30) DEFAULT 'guardian'
);

-- 2. Insert Garrison Records
INSERT INTO users (username, password, role)
VALUES 
  ('admin', 'D@ul@tCitadel_Pass1327', 'kiladar_commander'),
  ('kotwal', 'ChandMinar_Sentinel_99', 'citadel_warden'),
  ('sentinel', 'AndheriPassage_Gatekeeper', 'passage_guard')
ON CONFLICT (username) DO NOTHING;

-- 3. Verify Table
SELECT * FROM users;

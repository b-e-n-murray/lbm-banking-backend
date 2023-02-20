INSERT INTO users (username, password, is_admin)
VALUES ('Username', 'Password', false);

CREATE TABLE balances (
  id SERIAL PRIMARY KEY,
  user_id INT,
  current_balance VARCHAR(255),
  savings VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES users(id));
  
INSERT INTO balances (user_id, current_balance, savings)
VALUES 
(1, '$5,000,000.33', '$10,000,000.91'),









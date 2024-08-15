-- create new user table
CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                first_name VARCHAR(100),
                last_name VARCHAR(100),
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                phone VARCHAR(15),
                dob DATE,
                gender CHAR(1) CHECK (gender IN ('m', 'f', 'o')),
                address TEXT,
                isAdmin BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );


-- Insert into user table
INSERT INTO users (first_name, last_name, email, password, phone, dob, gender, address, isAdmin, created_at, updated_at) 
VALUES ('Testuser', 'surname', 'test@example.com', 'hashed_password', '1234567890', '1990-01-01', 'm', '123 Main St', false, NOW(), NOW());
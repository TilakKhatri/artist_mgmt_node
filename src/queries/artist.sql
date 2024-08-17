
-- artist table

CREATE TABLE artists (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                address TEXT,
                first_release_year TEXT NOT NULL,
                no_of_album_release INT NOT NULL,
                dob DATE,
                gender CHAR(1) CHECK (gender IN ('m', 'f', 'o')),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );


-- insert
INSERT INTO artists (name, address, first_release_year, no_of_album_release, dob, gender)
VALUES
('John Doe', '123 Main St', '2000', 5, '1980-01-01', 'm'),
('Jane Smith', '456 Oak Ave', '2002', 3, '1982-02-02', 'f'),
('Mike Johnson', '789 Pine Rd', '1998', 7, '1979-03-03', 'm'),
('Emily Davis', '321 Maple Dr', '2005', 4, '1985-04-04', 'f'),
('Chris Brown', '654 Cedar Ln', '2010', 2, '1990-05-05', 'm'),
('Laura Wilson', '987 Elm St', '2012', 1, '1992-06-06', 'f'),
('David Taylor', '159 Birch Blvd', '1995', 6, '1975-07-07', 'm'),
('Sophia Martinez', '753 Spruce Ct', '2008', 5, '1988-08-08', 'f'),
('Michael Lee', '357 Fir Pl', '2015', 3, '1995-09-09', 'm'),
('Olivia Kim', '951 Ash Cir', '2020', 4, '2000-10-10', 'f');



-- Create a music of each artist
CREATE TABLE music (
    id SERIAL PRIMARY KEY,
    artist_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    album_name VARCHAR(255) NOT NULL,
    genre CHAR(15) CHECK (genre IN ('rnb','country','classic','rock','jazz')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (artist_id) REFERENCES artist(id) ON DELETE CASCADE
);


--  artist_id,title,album_name,genre,created_at,updated_at

INSERT INTO music (artist_id, title, album_name, genre, created_at, updated_at)
VALUES
(1, 'Midnight Groove', 'Late Night Vibes', 'rnb', NOW(), NOW()),
(2, 'Country Roads', 'Backroads Journey', 'country', NOW(), NOW()),
(3, 'Symphony No. 5', 'Classical Hits', 'classic', NOW(), NOW()),
(4, 'Rock Anthem', 'Electric Dreams', 'rock', NOW(), NOW()),
(5, 'Jazz Lounge', 'Smooth Sounds', 'jazz', NOW(), NOW()),
(1, 'Sunset Serenade', 'Romantic Escapes', 'rnb', NOW(), NOW()),
(3, 'Beethoven’s Moonlight', 'Piano Classics', 'classic', NOW(), NOW()),
(2, 'Southern Comfort', 'Country Classics', 'country', NOW(), NOW()),
(4, 'Electric Pulse', 'Rock Revolution', 'rock', NOW(), NOW()),
(5, 'Evening Chill', 'Jazz Essentials', 'jazz', NOW(), NOW());
INSERT 0 10
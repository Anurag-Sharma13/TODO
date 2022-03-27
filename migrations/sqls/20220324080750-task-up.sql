/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS tasks(
    id INT PRIMARY KEY,
    label VARCHAR(100) NOT NULL,
    complete BOOLEAN NOT NULL
)
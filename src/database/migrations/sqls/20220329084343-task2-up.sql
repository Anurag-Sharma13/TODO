/* Replace with your SQL commands */
ALTER TABLE tasks ADD user_id INT, ADD FOREIGN KEY(user_id) REFERENCES users(id)


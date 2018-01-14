-- Postico was used for this postgresql and npm pg to link the server to the database. 

-- CREATE a database titled todo_app and the following to be created on the database. 

-- Create a table titled categories to store said information into. click execute statement or cmd + enter to create table.    

CREATE TABLE categories (
	id SERIAL PRIMARY KEY,
	category VARCHAR(50) NOT NULL
);

-- Create a table titled tasks to store said information into. click execute statement or cmd + enter to create table. 
	
CREATE TABLE tasks (
	id SERIAL PRIMARY KEY,
	task VARCHAR(255) NOT NULL,
	categories_id INT REFERENCES categories,
	completion_status BOOLEAN NOT NULL, 
	due_date DATE
);

-- This is a test insert to see how the table turns out. remove /* at the start and */ at the end and execute each statement then refresh to see the results on the table.

/* INSERT INTO categories (category)
VALUES ('test');

INSERT INTO tasks (task, categories_id, completion_status, due_date)
VALUES ('nothing', 1, true, '10/10/2010'); */
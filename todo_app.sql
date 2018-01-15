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
	completion_status BOOLEAN DEFAULT false, 
	due_date DATE
);

SELECT * FROM categories WHERE categories.category = 'test';


-- Insert the following examples into the table to have a few base categories already listed as well as some tasks.

INSERT INTO categories (category)
VALUES ('Schoolwork');

INSERT INTO categories (category)
VALUES ('Officework');

INSERT INTO categories (category)
VALUES ('Home');

INSERT INTO categories (category)
VALUES ('Work');

INSERT INTO tasks (task, categories_id, completion_status, due_date)
VALUES ('Finish Homework', 1, false, '10/10/2010'); 

INSERT INTO tasks (task, categories_id, completion_status, due_date)
VALUES ('Attend Meeting', 2, false, '08/10/2018'); 

INSERT INTO tasks (task, categories_id, completion_status, due_date)
VALUES ('Do laundry', 3, true, '01/01/2018'); 

INSERT INTO tasks (task, categories_id, completion_status, due_date)
VALUES ('Work... OUT', 4, false, '12/12/2018'); 



-- FAILED ATTEMPTS AT POSTCODE
-- FAILED IF/ELSE  TESTS
/* 
INSERT INTO categories (category)
VALUES ('test');

INSERT INTO tasks (task, categories_id, due_date)
VALUES ('nothing', 1, '10/10/2010');

INSERT INTO tasks (task, categories_id, due_date)
VALUES ('nothingagain',
		IF 'test' = (SELECT categories.category
			FROM categories
			WHERE categories.category = 'test')
		THEN SELECT categories.id
		WHERE categories.category = 'test'
		END IF,
		'10/11/2010');
		
	
DO $$
DECLARE
   a VARCHAR := 'test';
BEGIN 
  	IF EXISTS (SELECT categories.category
			FROM categories
			WHERE categories.category = a)
		THEN SELECT categories.id
		FROM categories
		WHERE categories.category = 'test';
	END IF;
END $$;

		IF EXISTS (SELECT categories.category FROM categories WHERE categories.category = 'test')
		THEN SELECT categories.id
		FROM categories
		WHERE categories.category = 'test';
		END IF;
		
		SELECT categories.category FROM categories WHERE categories.category = 'test';
		
		SELECT * FROM categories WHERE categories.category = 'test';

*/

SELECT categories.category, categories.id, tasks.id AS tasks_id, tasks.task, tasks.categories_id, tasks.completion_status, tasks.due_date FROM categories, tasks;

SELECT categories.id, categories.category, tasks.id AS "task_id", tasks.task, tasks.categories_id, tasks.completion_status, tasks.due_date FROM categories JOIN tasks ON categories.id = tasks.categories_id;


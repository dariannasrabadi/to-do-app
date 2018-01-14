# 3rd Weekend Challenge

## TO-DO APP Check List

### PRE-START


- [x] Create the framework/folders needed from server to public. 

- [x] Create files needed for all sides, database, server and client side (this includes server.js, pool.js, index.html, etc)

- [x] Create a database with the name "todo_app" and save a blank .sql file to the folder where this is stored. 

- [x] Do the following on console npm init, npm install express --save, npm install body-parser --save, npm install jquery --save, npm install bootstrap --save, npm install pg --save

- [x] Create a .gitignore including node_modules etc


### CLIENT SIDE

- [x] link vendors, script, styles to index.html

- [x] On index.html create the base layout of how the webapplication will look like (tasks input, add, delete, table for tasks, etc)

- [x] Create a function to run listeners once document is ready with the get method ajax listener included at start.  

- [x] Link multiple buttons to functions that will run Ajax when the button is clicked

- [ ] Create listeners for each button when clicked to run their respective function.

- [x] Send the data from add tasks button back to the server for process and storage. Data sent is done via Ajax with a Post method. 

    - On success activate get ajax to reset display
    
    - On failure log out reason and alert user 

- [x] Retrieve data back from the server with Ajax via a Get method.

    - On success store data into a let variable 
    
    - On failure log out reason and alert user 

- [ ] Display data unto the DOM in a table format 

- [ ] Store the task id unto each row via .data()

- [ ] Delete button sends the id info the the server via Ajax with the delete method. 

    - On success activate get ajax to reset display
    
    - On failure log out reason and alert user 

- [ ] Add base CSS/Bootstrap


### DATABASE SIDE 


- [x] Create a table for categories

    - Takes in a varchar of categories

    - SERIAL PRIMARY KEY of id

- [x] Create a table titled tasks

    - Takes in a varchar of tasks
    
    - Boolean of status (true for complete/fasle for not complete)

    - SERIAL PRIMARY KEY of id

    - REFERENCE KEY of categories

    - Due Date 


### SERVER SIDE 


- [ ] create consts for express, app, port, modules, etc. 

- [ ] write base codes that start up the port the server is hosted on, the static files, etc. 

- [ ] Grab the GET/POSTS/DELETE from client side and send to proper router. 

- [ ] edit pool.js information to link server.js to the database 

- [ ] On the router file create function to send the post input into the database 

    - .then sends back status to the client on success (200)
    
    - .catch sends back status to the client on failure (500)

- [ ] On the router file create function to delete a row from the database 

    - .then sends back status to the client on success (200)
    
    - .catch sends back status to the client on failure (500)
    
- [ ] On the router file create function to retrieve the GET input from the database 

    - .then sends back rows of data to the client on success

    - .catch sends back status to the client on failure (500)


## BASE MODE

- [ ] Create a front end experience that allows a user to create a task.

- [ ] When the task is created, it should be stored inside of a database (SQL)

- [ ] Whenever a task is created the front end should refresh to show all tasks that need to be completed.

- [ ] Each task should have an option to 'Complete' or 'Delete'.

- [ ] When a task is complete, its visual representation should change on the front end (for example, the background of the task container could change from gray to green, as well as the complete option 'checked off'. Each of these are accomplished in CSS, but will need to hook into logic to know whether or not the task is complete)

- [ ] Whether or not a task is complete should also be stored in the database.

- [ ] Deleting a task should remove it both from the Front End as well as the Database.

- [ ] Make sure that you also show us your best styling chops. Explore icons, fonts, libraries. Really work your CSS muscles.

## HARD MODE

- [ ] Create a table of categories and allow Tasks to be assigned a single (1) category. This creates a one-to-many relationship (many tasks can have one category). You will need to add in joins in order to display and use this new data!

- [ ] In whatever fashion you would like, create an 'are you sure: yes / no' option when deleting a task.

## PRO MODE (In no particular order)

- [ ] Publish your app to Heroku.

- [ ] Adjust the logic so that completed tasks are brought to the bottom of the page, where the remaining tasks left to complete are brought to the top of the list.

- [ ] Add a due date to your tasks and put the items which need to be completed next at the top of the page. Highlight overdue tasks in red.

- [ ] Add any additional features that you think would be useful or interesting!

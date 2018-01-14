const express = require('express');
const app = express();
const todoRouter = require('./routes/todo-app');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;


app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('server/public'));

//sends the gets/posts/deletes/puts into the todo route
app.use('/tasks', todoRouter);

app.listen(port, ()=>{ //Spins up server 
    console.log('Server running on: ', port);
}); 
  
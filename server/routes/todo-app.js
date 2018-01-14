const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => { // START OF GET /TASKS '/' route!
    // query DB
    const queryText = `SELECT * FROM task`;
    pool.query(queryText)
        // runs on successful query
        .then((result) => {
            console.log('"/" GET results: ', result.rows);            
            res.send(result.rows);
        })
        // error handling
        .catch((err) => {
            console.log('error making "/" GET query:', err);
            res.sendStatus(500);
        });

}); // END OF GET /TASKS '/' Tasks route!

router.post('/', (req, res) => { // START OF POST /TASKS '/' route!
    // check if category already exists
    const checkQuery = `SELECT * FROM categories WHERE categories.category = '${req.body.category}';`;
    let categoryCheck = {};
    let queryText;
    let dataArray = [];    
    pool.query(checkQuery)
        .then((result) => {
            console.log('"/" GET results of checking categories: ', result.rows[0].id);   
            console.log(checkQuery, req.body.category);         
            res.send(categoryCheck = {
                category: result.rows[0].category,
                categories_id: result.rows[0].id
            });
        })
        // error handling
        .catch((err) => {
            console.log('error checking categories for duplicate category in "/" GET query:', err);
            res.sendStatus(500);
        }); // END CHECKING IF CATEGORY ALREADY EXISTS
    console.log('Inside the post router', categoryCheck);

    if (categoryCheck.category == '') {//If there was no match in category
        queryText = `
        INSERT INTO categories (category)
        VALUES $1;
            
        INSERT INTO tasks (task, categories_id, due_date)
        VALUES ($2, $3, $4);
        `;
        dataArray = [req.body.category, req.body.task, categoryCheck.categories_id, req.body.due_date]
    }//If there was no match in category
    else {//There was a match in category
        queryText = `
        INSERT INTO tasks (task, categories_id, due_date)
        VALUES ($1, $2, $3);
        `;
        let categoryID = getID(req.body.category)
        console.log('CHECK THIS TO SEE WHAT CATEGORYID IS IM OVER HERE ', categoryID);
        dataArray = [req.body.task, categoryID.id, req.body.due_date];
    }//There was a match in category
    pool.query(queryText, dataArray)
        // runs on successful query
        .then((result) => {
            console.log('"/" POST results: ', result);            
            res.sendStatus(200);
        })
        // error handling
        .catch((err) => {
            console.log('error making "/" POST query:', err);
            res.sendStatus(500);
        });

}); // END OF POST /TASKS '/' Tasks route!






function getID(data) {
    let idQuery = `SELECT categories.id FROM categories WHERE categories.category = '${data}'`
    let idNumber = {};
    pool.query(idQuery)
    .then((result) => {
        console.log('Get ID function', result.rows[0].id);            
        idNumber = {
            id: result.rows[0].id
        };
    })
    // error handling
    .catch((err) => {
        console.log('UNABLE TO GET THE ID NUMBER:', err);
        res.sendStatus(500);
    }); // END CHECKING IF CATEGORY ALREADY EXISTS
    console.log('test id number', idNumber);
    return idNumber
}

module.exports = router;
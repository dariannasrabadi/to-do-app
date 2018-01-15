const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => { // START OF GET /TASKS '/' route!
    // query DB
    const queryText = `SELECT * FROM tasks, categories;`;
    pool.query(queryText) // START OF FIRST GET QUERY
        // runs on successful query
        .then((result) => {
            console.log('"/" INSIDE FIRST GET QUERY FORLOOP: ', result.rows); 
            res.send(result.rows);
        })
        // error handling
        .catch((err) => {
            console.log('error making "/" GET query:', err);
            res.sendStatus(500);
        }); // END OF FIRST GET QUERY

}); // END OF GET /TASKS '/' Tasks route!

router.post('/', (req, res) => { // START OF POST /TASKS '/' route!
    // check if category already exists
    const checkQuery = `SELECT * FROM categories WHERE categories.category = '${req.body.category}';`;
    let categoryCheck = {};
    let queryText;
    let dataArray = [];    
    pool.query(checkQuery)
        .then((result) => {//START OF INITIAL THEN QUERY
            console.log('"/" GET results of checking categories: ', result.rows);   
            console.log(typeof(result.rows[0]));
            if (result.rows[0] == undefined) { // Start IF results is blank array UNABLE TO FIND A WAY TO CHECK IF ITS BLANK THEN DONT GRAB IT
                categoryCheck = {
                    category: '',
                }
            } // END IF results is blank array
            else { // Start ELSE NOT blank array
                console.log('INNNNNNN',typeof(result.rows[0]));                
                categoryCheck = {
                    category: result.rows[0].category,
                    categories_id: result.rows[0].id
                };
            } // End ELSE NOT blank array
            if (categoryCheck.category == '') {//If there was no match in category
                queryText = `
                INSERT INTO categories (category)
                VALUES ($1);
                `;
                dataArray = [req.body.category]
                pool.query(queryText, dataArray) //START OF SECOND QUERY - A
                // runs on successful query
                    .then((result) => {
                     
                        queryText = `
                        SELECT * FROM categories WHERE categories.category = '$1';
                        `;
                        dataArray = [req.body.category]
                        pool.query(queryText, dataArray) //START OF THIRD QUERY - A
                        // runs on successful query
                            .then((result) => {
                                categoryCheck = {
                                    category: result.rows[0].category,
                                    categories_id: result.rows[0].id
                                };
                                queryText = `
                                INSERT INTO tasks (task, categories_id, due_date)
                                VALUES ($1, $2, $3);
                                `;
                                dataArray = [req.body.task, categoryCheck.categories_id, req.body.due_date]
                                pool.query(queryText, dataArray) //START OF FOURTH QUERY - A
                                // runs on successful query
                                    .then((result) => {
                                        console.log('"/" POST results: ', result);            
                                        res.sendStatus(200);
                                })
                                // error handling
                                    .catch((err) => {
                                        console.log('error making "/" POST THIRD query A:', err);
                                        res.sendStatus(500);
                                }); //END OF FOURTH QUERY - A
                            })
                            .catch((err) => {
                                console.log('error making "/" POST SECOND query A:', err);
                                res.sendStatus(500);
                            });// END OF THIRD QUERY -A 
                    })
                // error handling
                    .catch((err) => {
                        console.log('error making "/" POST SECOND query A:', err);
                        res.sendStatus(500);
                }); //END OF SECOND QUERY - A
            }//END OF If there was no match in category
            else {//There was a match in category
                console.log('Inside else router', categoryCheck);
                let idQuery = `SELECT categories.id FROM categories WHERE categories.category = '${categoryCheck.category}'`
                let idNumber = {};
                pool.query(idQuery)
                    .then((result) => { // START OF SECOND QUERY - B
                        console.log('Get ID function', result.rows[0].id);            
                        idNumber = {
                            id: result.rows[0].id
                        };
                        console.log('CHECK THIS TO SEE WHAT CATEGORYID IS IM OVER HERE ', idNumber);
                        queryText = `
                        INSERT INTO tasks (task, categories_id, due_date)
                        VALUES ($1, $2, $3);
                        `;
                        dataArray = [req.body.task, idNumber.id, req.body.due_date];
                        pool.query(queryText, dataArray)
                                // runs on successful query
                                .then((result) => { // START OF THIRD QUERY - B
                                    console.log('"/" POST results: ', result);            
                                    res.sendStatus(200);
                                })
                                // error handling
                                .catch((err) => {
                                    console.log('error making "/" POST THIRD query B:', err);
                                    res.sendStatus(500);
                                }); // END OF THIRD QUERY - B
                    })
                    // error handling
                    .catch((err) => {
                        console.log('UNABLE TO GET THE ID NUMBER:', err);
                        res.sendStatus(500);
                    }); // END OF SECOND QUERY -B 
            }
        })//END OF INITIAL THEN QUERY
        // error handling
        .catch((err) => {
            console.log('error checking categories for duplicate category in "/" GET query:', err);
            res.sendStatus(500);
        }); // END OF INITIAL CATCH QUERY

}); // END OF POST /TASKS '/' Tasks route!


module.exports = router;
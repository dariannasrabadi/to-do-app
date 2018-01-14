const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => { // START OF GET '/' route!
    // query DB
    const queryText = `SELECT jokes.id, authors.whosejoke, jokes.jokequestion, jokes.punchline, jokes.funniness
    FROM
        jokes
        JOIN authors ON jokes.authors_id = authors.id
        ORDER BY jokes.id;`;
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

}); // END OF GET '/' Tasks route!
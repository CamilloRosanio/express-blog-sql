/*
Prima di questi step, devo aver eseguito "npm i mysql2".
Non appena tutto è stato dichiarato, userò la "connection" esportata nel CONTROLLER.
*/



// DICHIARAZIONE DEL PACCHETTO mysql2
const mysql = require('mysql2');


// DICHIARAZIONE DELLA CONNESSIONE AL DB
const connection = mysql.createConnection({

    // Queste sono le credenziali impostate quando ho creato la connessione al Server su mySQL Workbench.
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'blog'
});

// AVVIO LA CONNESSIONE
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL: blog_db');
});


// EXPORT DELLA CONNESSIONE AL DB
module.exports = connection;
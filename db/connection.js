/*
Prima di questi step, devo aver eseguito "npm i mysql2".
Non appena tutto è stato dichiarato, userò la "connection" esportata nel CONTROLLER.
*/



// DICHIARAZIONE DEL PACCHETTO mysql2
const mysql = require('mysql2');


// DICHIARAZIONE DELLA CONNESSIONE AL DB
const connection = mysql.createConnection({

    // Queste sono le credenziali impostate quando ho creato la connessione al Server su mySQL Workbench.
    // NOTA: queste credenziali sono definite nel ".env", ma in questo caso le passo in chiaro per permettere la correzione dell'esercizio.
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'blog'
});

// AVVIO LA CONNESSIONE
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Database: [blog]');
});


// EXPORT DELLA CONNESSIONE AL DB
module.exports = connection;
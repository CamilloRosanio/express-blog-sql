/****************************************************
| CONFIGURAZIONE DOTENV
****************************************************/
const dotEnv = require('dotenv').config();

// Dichiarzione variabili DOTENV
const port = process.env.PORT;
const host = process.env.HOST;



/****************************************************
| CONFIGURAZIONE EXPRESS JS
****************************************************/


// Dichiarazione EXPRESS JS
const express = require('express');
const app = express();


// MIDDLEWARES
app.use(express.static('public'));
app.use(express.json());
const checkTime = require('./middlewares/checkTime');
app.use(checkTime);
const errorsHandler = require('./middlewares/errorsHandler');
const notFound = require('./middlewares/notFound');

// CORS (CROSS-ORIGIN-RESOURCE-SHARING)
// I CORS prevengono che anche se sbaglio PORT il server mi fornisca comunque i dati, senza mandarmi in errore nonostante lo STATUS 200 (SUCCESS)
const cors = require('cors');
app.use(cors());

/*
NOTA: se volessi applicare "checkTime" solo alla ROUTE dei Posts, posso specificarlo in "app.use" come parametro PATH,
questo se voglio centralizzare tutti i MIDDLEWARE sul file "app.js" invece che ciascun ROUTER, e si scrive come segue:
app.use('./posts', checkTime);
*/


// ROUTERS
const postsRouter = require('./routers/posts');
app.use('/posts', postsRouter);


// ROUTE della Homepage
app.get('/',
  (req, res, next) => {
    console.log('Eseguita la funzione 1');
    res.send('Il mio Blog');

    // senza questo NEXT le prossime funzioni sarebbero ignorate
    next();
  },
  (req, res, next) => {
    console.log('Eseguita tramite precedente NEXT la funzione 2');

    // senza questo NEXT le prossime funzioni sarebbero ignorate
    next();
  },
  (req, res) => {
    console.log('Eseguita tramite precedente NEXT la funzione 3');
  }
)


// MIDDLEWARES (ERRORS MANAGEMENT)
app.use(errorsHandler);
app.use(notFound);


// Dichiarazione LISTEN
app.listen(port, () => {
  console.log(`Listen attivo e in ascolto su ${host}:${port}`)
})
// Dichiarazione dei REQUIRE delle risorse
const postsData = require('../data/posts.js');
const port = process.env.PORT;
const host = process.env.HOST;
const folderPath = `/img/`;
const finalPath = `${host}:${port}${folderPath}`;


// DICHIARAZIONE DELLA CONNECTION AL DB SQL
const connection = require('../db/connection');



// index
function index(req, res) {

    // Dichiarazione SQL QUERY
    const postsSql = 'SELECT * FROM `blog`.`posts`';

    // Utilizzo della QUERY
    connection.query(postsSql, (err, results) => {

        // Gestione dell'ERRORE
        if (err) {
            // Riporto in Console l'errore con i dettagli, così oltre al messaggio di risposta so anche il perchè la query abbia fallito.
            console.log(err);
            return res.status(500).json({ error: 'Database query failed' });
        }

        // risposta positiva
        res.json(results);
    })
}

// show
function show(req, res) {

    // Estrazione ID dall'URL
    const id = parseInt(req.params.id);

    // Dichiarazione SQL QUERY
    // NOTA: per evitare "SQL INJECTIONS" di malitenzionati, invece del valore dell'id, uso "?", e passo l'id reale successivamente come parametro.
    const postsSql = 'SELECT * FROM `blog`.`posts` WHERE `posts`.`id` = ?';

    // Utilizzo della QUERY
    // Qui passo anche "id", che sostituirà "?" nella QUERY dandoci il risultato richiesto.
    // Si possono usare anche più paramentri, che saranno sostituiti come segue: il primo "?" sarà sostituito dal primo elemento dell'ARRAY di parametri che passo; il secondo "?" rispettivamente dal secondo e così via.
    connection.query(postsSql, [id], (err, results) => {

        // Gestione dell'ERRORE
        // Errore nella QUERY
        if (err) {
            // Riporto in Console l'errore con i dettagli, così oltre al messaggio di risposta so anche il perchè la query abbia fallito.
            console.log(err);
            return res.status(500).json({ error: 'Database query failed' });
        }

        // gestione Gestione dell'ERRORE
        // 404 (not found) centralizzata tramite MIDDLEWARE
        if (results.lenght === 0) {
            console.log(err);
            return res.status(404).json({ error: 'Element not found' });
        }

        // risposta positiva
        res.json(results[0]);
    })


}

// store
function store(req, res) {

    // recupero le informazioni JSON, su cui essendo un OBJECT posso fare un DESTRUCTURING ricavando solo le proprietà che voglio
    // questo qualora ve ne fossero altre a cui non sono interessato e che non voglio passare
    const { title, content, img, tags, category, published } = req.body;

    // gestione errore (MANUALE e singola solo per questa ROUTE)
    // if (
    //     !title ||
    //     !content ||
    //     !img ||
    //     !tags ||
    //     !Array.isArray(tags) ||
    //     !tags?.length
    // ) {
    //     // (gestione errore MANUALE e singola solo per questa ROUTE)
    //     // return res.status(400).json(`Missing or wrong format values`);

    //     // gestione errore centralizzata tramite MIDDLEWARE
    //     const err = new Error('Missing or wrong format values');
    //     err.code = 400;
    //     throw err;
    // }

    // generazione ID progressivo (in questo caso numerico) partendo dall'ID dell'ultimo elemento dell'Array
    // const newId = postsData.at(-1).id + 1;

    // generazione ID progressivo basato sul MAX_ID numerico + 1
    let generateId = () => {
        let max = 0;

        postsData.forEach(element => {
            if (parseInt(element.id) > max) {
                max = element.id
            }
        })

        return max + 1;
    }

    // creazione di un nuovo OBJECT con nuovo ID
    const newElement = {
        id: generateId(),
        category,
        title,
        content,
        // Mapping del PATH del'immagine
        img: finalPath + img,
        tags,
        published,
    }

    // PUSH del nuovo elemento nell'Array di Posts
    postsData.push(newElement);

    // risposta positiva
    res.json(newElement);
}

// update
function update(req, res) {

    // logica
    const id = parseInt(req.params.id);
    let foundElement = postsData.find(post => post.id == id);

    // gestione errore (MANUALE e singola solo per questa ROUTE)
    // if(!foundElement) {
    //     return res.status(404).json('Element not found');  
    // }

    // gestione errore centralizzata tramite MIDDLEWARE
    if (!foundElement) {
        const err = new Error('Element not found');
        err.code = 404;
        throw err;
    }

    // Recupero i dati dalla richiesta PUT
    const { title, content, img, tags, category, published } = req.body;

    // gestione errore
    // if (
    //     !title ||
    //     !content ||
    //     !img ||
    //     !tags ||
    //     !Array.isArray(tags) ||
    //     !tags?.length
    // ) {
    //     // gestione errore (MANUALE e singola solo per questa ROUTE)
    //     // return res.status(400).json(`Missing or wrong format values`);

    //     // gestione errore centralizzata tramite MIDDLEWARE
    //     const err = new Error('Missing or wrong format values');
    //     err.code = 400;
    //     throw err;
    // }

    // logica
    foundElement.title = title;
    foundElement.content = content;
    foundElement.img = finalPath + img;
    foundElement.tags = tags;
    foundElement.category = category;
    foundElement.published = published;

    // risposta positiva
    res.json(foundElement);
}

// modify
function modify(req, res) {

    // logica
    const id = parseInt(req.params.id);
    let foundElement = postsData.find(post => post.id == id);

    // gestione errore (MANUALE e singola solo per questa ROUTE)
    // if(!foundElement) {
    //     return res.status(404).json('Element not found');  
    // }

    // gestione errore centralizzata tramite MIDDLEWARE
    if (!foundElement) {
        const err = new Error('Element not found');
        err.code = 404;
        throw err;
    }

    // Recupero i dati dalla richiesta PUT
    const { title, content, img, tags, category, published } = req.body;

    // gestione errore
    // if (tags) {
    //     if (!Array.isArray(tags) || !tags?.length) {

    //         //gestione errore (MANUALE e singola solo per questa ROUTE)
    //         // return res.status(400).json(`Missing or wrong format values`);

    //         // gestione errore centralizzata tramite MIDDLEWARE
    //         const err = new Error('Missing or wrong format values');
    //         err.code = 400;
    //         throw err;
    //     }
    // }

    // logica
    if (title) foundElement.title = title;
    if (content) foundElement.content = content;
    if (img) foundElement.img = finalPath + img;
    if (tags) foundElement.tags = tags;
    if (category) foundElement.category = category;
    if (published) foundElement.published = published;

    // risposta positiva
    res.json(foundElement);
}

// destroy
function destroy(req, res) {

    // logica
    const id = parseInt(req.params.id);
    let foundElement = postsData.find((post, index) => post.id == id);
    let deleteIndex = postsData.indexOf(foundElement);

    // gestione errore (MANUALE e singola solo per questa ROUTE)
    // if(!foundElement) {
    //     return res.status(404).json('Element not found');  
    // }

    // gestione errore centralizzata tramite MIDDLEWARE
    if (!foundElement) {
        const err = new Error('Element not found');
        err.code = 404;
        throw err;
    }

    // logica
    postsData.splice(deleteIndex, 1);

    // risposta positiva
    res.json({
        foundPosts: postsData.length,
        posts: postsData,
    });
}



// EXPORT delle funzioni CRUD
module.exports = {
    index,
    show,
    store,
    update,
    modify,
    destroy,
}
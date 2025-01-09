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

    // logica
    const term = req.query.term ?? '';

    let filteredArray = postsData.filter((element) => {

        // query TITLE
        const titleIncludesTerm = element.title.toLowerCase().includes(term.toLowerCase());
        // query CONTENT
        const contentIncludesTerm = element.content.toLowerCase().includes(term.toLowerCase());

        // query TAGS
        let tagsIncludesTerm = false;

        element.tags.forEach((tag) => {
            if (tag.toLowerCase().includes(term.toLowerCase())) tagsIncludesTerm = true;
        })

        return titleIncludesTerm || contentIncludesTerm || tagsIncludesTerm;
    })

    // Mapping dinamico e centralizzato del PATH delle immagini (.img in questo caso)
    postsData.forEach(element => {
        if (!element.img.includes(finalPath)) {
            filteredArray.map(element => element.img = finalPath + element.img);
        }
    })

    // risposta positiva
    res.json({
        foundElements: filteredArray.length,
        elements: filteredArray,
    });
}

// show
function show(req, res) {

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

    // Mapping dinamico e centralizzato del PATH dell'immagine'
    if (!foundElement.img.includes(finalPath)) {
        foundElement.img = finalPath + foundElement.img;
    }

    // risposta positiva
    res.json(foundElement);
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
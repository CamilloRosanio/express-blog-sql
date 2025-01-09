/****************************************************
| ARRAY DI PARTENZA
****************************************************/

const postsData = [
    {
        id: 2,
        category: 'Recipes',
        title: 'Ciambellone',
        content: 'Delizioso ciambellone',
        img: `ciambellone.jpeg`,
        tags: ['ciambellone', 'Dolce', 'Torte'],
        published: true,
    },
    {
        id: 4,
        category: 'Recipes',
        title: 'Cracker di barbabietola',
        content: 'Preparazione cracker di barbabietola',
        img: `cracker_barbabietola.jpeg`,
        tags: ['barbabietola', 'Cracker', 'impasto', 'salato'],
        published: true,
    },
    {
        id: 50,
        category: 'Recipes',
        title: 'Pane fritto',
        content: 'Come fare il pane fritto',
        img: `pane_fritto_dolce.jpeg`,
        tags: ['dolce', 'Pane fritto'],
        published: true,
    },
    {
        id: 8,
        category: 'Recipes',
        title: 'Pasta di barbabietola',
        content: 'Come preparare la pasta alla barbabietola',
        img: `pasta_barbabietola.jpeg`,
        tags: ['barbabietola', 'pasta', 'impasto', 'salato'],
        published: true,
    },
    {
        id: 10,
        category: 'Recipes',
        title: 'Torta paesana',
        content: 'La torta paesana più buona',
        img: `torta_paesana.jpeg`,
        tags: ['torte', 'torta paesana', 'dolce'],
        published: true,
    }
]




/****************************************************
| ELEMENTI TEST
****************************************************/
/*
ATTENZIONE: elementi scritti in modo tale da essere letti come JSON, quindi con gli apici anche nelle PROPERTIES dell'OBJECT


******************* STORE
const newElement =
{
    "title": "Pizza alla nutella",
    "content": "Ricetta per una strepitosa pizza alla nutella",
    "img": "pizza-alla-nutella.webp",
    "tags": ["nutella", "impasto", "dolce"]
}


******************* UPDATE

{
    "title": "Ciambellone Update",
    "content": "Delizioso ciambellone update",
    "img": "ciambellone.jpeg",
    "tags": ["ciambellone", "dolcissimo", "update"]
}


******************* MODIFY

{
    "title": "Cracker di Modify",
    "content": "Modifica di un cracker di barbabietola",
    "img": "cracker_barbabietola2.jpeg",
    "tags": ["Modificato", "Supermodificato", "Modify"]
}

*/





// EXPORT dell'Array per utilizzo su altri file JS
module.exports = postsData;
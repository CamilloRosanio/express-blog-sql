function notFound(req, res, next) {
    console.log('MIDDLEWARE (GLOBAL) "notFound" eseguito');
    res.status(404);
    res.json({
        status: 'KO',
        error: err.message,
    })
};





// EXPORT
module.exports = notFound;
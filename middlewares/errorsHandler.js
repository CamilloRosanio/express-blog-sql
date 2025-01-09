function errorsHandler(err, req, res, next) {
    console.log('MIDDLEWARE (GLOBAL) "errorsHandler" eseguito');
    res.status(err.code ?? 500);
    res.json({
        status: 'KO',
        error: err.message,
    });
};





// EXPORT
module.exports = errorsHandler;
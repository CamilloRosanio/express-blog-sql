function postsCheckTime(req, res, next) {
    const now = new Date();
    const nowText = now.toLocaleString();
    console.log('MIDDLEWARE (ROUTER) "postsCheckTime" - eseguito il ' + nowText);

    next();
};





// EXPORT
module.exports = postsCheckTime;
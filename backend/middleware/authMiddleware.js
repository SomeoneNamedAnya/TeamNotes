require('dotenv').config();
const jswt = require('jsonwebtoken');


// Для корректного декодирования необходимо добавить в запрос req 
// заголовок authorization со значением 'Bearer <полученный при авторизации токен>'
module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") next();
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(403).json({message: "Вы не авторизованы"});
        }
        //console.log(token,  process.env.SECRET)
        const decodedTokenData = jswt.verify(token, process.env.SECRET);
        req.user = decodedTokenData;
        next();
    }
    catch (err) {
        console.log(err);
        return res.status(403).json({message: "Вы не авторизованы"});
    }
}
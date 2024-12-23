// Stateless Authentication
const jwt = require('jsonwebtoken');
const secret = "dprahul@2021$$$";

function setUser(user){
    return jwt.sign(
    {
        _id:user._id,
        email:user.email
    },
    secret);
}

function getUser(token){
    if(!token) return null
    try {
        return jwt.verify(token,secret);
    } catch (error) {
        return null;
    }
}

module.exports = {
    getUser,
    setUser
}

























// This is Statefull Authentication
// const sessionIdToUserMap = new Map();

// function setUser(id,user){
//     sessionIdToUserMap.set(id,user);
// }

// function getUser(id){
//     return sessionIdToUserMap.get(id);
// }

// module.exports = {
//     getUser,
//     setUser
// }
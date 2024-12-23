const { getUser } = require("../services/auth");

function checkForAuthentication(req,res,next){
  const authorizationHeaderValue = req.headers["authorization"];
  req.user = null;

  if(!authorizationHeaderValue || !authorizationHeaderValue.startswith("Bearer")){
    return next();
  }

  const token = authorizationHeaderValue.split("Bearer ")[1];
  const user = getUser(token);

  req.user = user;
  return next();
}

module.exports = {
  checkForAuthentication,
}


// This is the code for authentication of middleware
// async function checkingUserLoggedInOrNot(req, res, next) {
  //   const userUid = req.cookies?.uid;
  
  //   if (!userUid) return res.redirect("/login");
  //   const user = getUser(userUid);
  
  //   if (!user) return res.redirect("/login");
  
  //   req.user = user;
  //   next();
  // }
  
  // async function checkAuth(req, res, next) {
  //   const userUid = req.cookies?.uid;
  
  //   const user = getUser(userUid);
  
  //   req.user = user;
  //   next();
  // }
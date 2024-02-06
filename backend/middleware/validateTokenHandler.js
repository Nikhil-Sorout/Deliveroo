const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const validateToken = asyncHandler(async(req, res, next)=>
{
    let token;

    let authHeader = await req.headers.authorization || req.headers.Authorization;

    if(authHeader && authHeader.startsWith("Bearer"))
    {
        token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=>{
            if(err){
                res.status(401);
                throw new Error("Unauthorized access");
            }
            console.log(decoded);

            req.user = decoded.user;

            next();
        })
    }
})

module.exports = validateToken;
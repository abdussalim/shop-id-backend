// const redisClient = require("../config/redis");
// const commonsHelper = require("../helpers/common");

// const redisMiddleware = {
//     cookiesProductData : async (request,response,next) => {
//         productID = request.params.id;
//         productData = await redisClient.get(`products/${productID}`);
//         if(productData){
//             return commonsHelper.responseResult(response, JSON.parse(productData), 200, "Get data success from Redis");
//         }
//         next();
//     },
    
//     deleteCookiesProductData : (request, response, next) => {
//         productID = request.params.id;
//         redisClient.del(`products/${productID}`);
//         next();
//     }
// }

// module.exports = redisMiddleware;
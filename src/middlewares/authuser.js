const createError = require("http-errors");

const rules = {

    seller: {
        users: {
                GET: true,
                POST: true,
                PUT: true,
                DELETE: false
        },
        products: {
                    GET: true,
                    POST: true,
                    PUT: true,
                    DELETE: true
        },
        categories: {
                        GET: true,
                        POST: true,
                        PUT: true,
                        DELETE: true
        },
        transactions: {
                        GET: true,
                        POST: true,
                        PUT: true,
                        DELETE: false
        },
        detail_transactions: {
                                GET: true,
                                POST: false,
                                PUT: true,
                                DELETE: false
        },
        payment: {
                    GET: true,
                    POST: true,
                    PUT: true,
                    DELETE: false
        }
    },

    buyer: {
        users: {
                GET: true,
                POST: true,
                PUT: true,
                DELETE: false
        },
        products: {
                    GET: true,
                    POST: false,
                    PUT: false,
                    DELETE: false
        },
        categories: {
                        GET: true,
                        POST: false,
                        PUT: false,
                        DELETE: false
        },
        transactions: {
                        GET: true,
                        POST: true,
                        PUT: true,
                        DELETE: false
        },
        detail_transactions: {
                                GET: true,
                                POST: false,
                                PUT: true,
                                DELETE: false
        },
        payment: {
                GET: true,
                POST: true,
                PUT: true,
                DELETE: false
        }
    }

}

const authRoles = (request, response, next)=> {
    
    const {baseUrl, method, params} = request;
    const {path, pathname, search} = request._parsedUrl;
    const role = request.payload.role;

    if(role === "admin"){
        if (path == "/" || 
            path == "/"+params.id || 
            path == pathname+search
            ){
                
            next();
            
        }else{
            next(new createError.NotFound());
        }
    }else if(role === "seller"){

        const {users, 
            products, 
            categories, 
            transactions, 
            detail_transactions, 
            payment} = rules.seller;

        if (path == "/" || path == "/"+params.id) {
            switch(baseUrl) {

                case "/main/users":
                        try {
                            if (method === "GET" && users.GET!==true||
                                method === "POST" && users.POST!==true||
                                method === "PUT" && users.PUT!==true||
                                method === "DELETE" && users.DELETE===false
                                ) throw "Access Denied";
    
                            next();
    
                        } catch (error) {
                            return response.send({message : error});
                        }
                    break;
                    
                case "/main/products":
                    try {
                        if (method === "GET" && products.GET !== true||
                            method === "POST" && products.POST !== true||
                            method === "PUT" && products.PUT !== true||
                            method === "DELETE" && products.DELETE !== true
                            ) throw "Access Denied";
    
                        next();
    
                    } catch (error) {
                        return response.send({message : error});
                    }
                    break;
    
                case "/main/categories":
                    try {
                        if (method === "GET" && categories.GET !== true||
                            method === "POST" && categories.POST !== true||
                            method === "PUT" && categories.PUT !== true||
                            method === "DELETE" && categories.DELETE !== true
                            ) throw "Access Denied";
    
                        next();
    
                    } catch (error) {
                        return response.send({message : error});
                    }
                    break;
    
                case "/main/transactions":
                    try {
                        if (method === "GET" && transactions.GET!==true||
                            method === "POST" && transactions.POST!==true||
                            method === "PUT" && transactions.PUT!==true||
                            method === "DELETE" && transactions.DELETE===false
                            ) throw "Access Denied";
    
                        next();
    
                    } catch (error) {
                        return response.send({message : error});
                    }
                    break;
    
                case "/main/detail_transactions":
                    try {
                        if (method === "GET" && detail_transactions.GET !== true ||
                            method === "POST" && detail_transactions.POST === false ||
                            method === "PUT" && detail_transactions.PUT !== true ||
                            method === "DELETE" && detail_transactions.DELETE === false
                            ) throw "Access Denied";
    
                        next();
    
                    } catch (error) {
                        return response.send({message : error});
                    }
                    break;
    
                case "/main/payment":
                    try {
                        if (method === "GET" && payment.GET !== true||
                            method === "POST" && payment.POST !== true||
                            method === "PUT" && payment.PUT !== true||
                            method === "DELETE" && payment.DELETE === false
                            ) throw "Access Denied";
    
                        next();
    
                    } catch (error) {
                        return response.send({message : error});
                    }
                    break;
    
                default:
                    next(new createError.NotFound());
            }

        }else if(path == pathname+search){
            next();
        }else{
            next(new createError.NotFound());
        }

    }
    else if(role === "buyer"){ 

        const {users, 
            products, 
            categories, 
            transactions, 
            detail_transactions, 
            payment} = rules.buyer;

        if (path == "/" || path == "/"+params.id) {
            switch(baseUrl) {

                case "/main/users":
                        try {
                            if (method === "GET" && users.GET!==true||
                                method === "POST" && users.POST!==true||
                                method === "PUT" && users.PUT!==true||
                                method === "DELETE" && users.DELETE===false
                                ) throw "Access Denied";
    
                            next();
    
                        } catch (error) {
                            return response.send({message : error});
                        }
                    break;
                    
                case "/main/products":
                    try {
                        if (method === "GET" && products.GET !== true||
                            method === "POST" && products.POST === false||
                            method === "PUT" && products.PUT === false||
                            method === "DELETE" && products.DELETE === false
                            ) throw "Access Denied";
    
                        next();
    
                    } catch (error) {
                        return response.send({message : error});
                    }
                    break;
    
                case "/main/categories":
                    try {
                        if (method === "GET" && categories.GET !== true||
                            method === "POST" && categories.POST === false||
                            method === "PUT" && categories.PUT === false||
                            method === "DELETE" && categories.DELETE === false
                            ) throw "Access Denied";
    
                        next();
    
                    } catch (error) {
                        return response.send({message : error});
                    }
                    break;
    
                case "/main/transactions":
                    try {
                        if (method === "GET" && transactions.GET!==true||
                            method === "POST" && transactions.POST!==true||
                            method === "PUT" && transactions.PUT!==true||
                            method === "DELETE" && transactions.DELETE===false
                            ) throw "Access Denied";
    
                        next();
    
                    } catch (error) {
                        return response.send({message : error});
                    }
                    break;
    
                case "/main/detail_transactions":
                    try {
                        if (method === "GET" && detail_transactions.GET !== true ||
                            method === "POST" && detail_transactions.POST === false ||
                            method === "PUT" && detail_transactions.PUT !== true ||
                            method === "DELETE" && detail_transactions.DELETE === false
                            ) throw "Access Denied";
    
                        next();
    
                    } catch (error) {
                        return response.send({message : error});
                    }
                    break;
    
                case "/main/payment":
                    try {
                        if (method === "GET" && payment.GET !== true||
                            method === "POST" && payment.POST !== true||
                            method === "PUT" && payment.PUT !== true||
                            method === "DELETE" && payment.DELETE === false
                            ) throw "Access Denied";
    
                        next();
    
                    } catch (error) {
                        return response.send({message : error});
                    }
                    break;
    
                default:
                    next(new createError.NotFound());
            }

        }else if(path == pathname+search){
            next();
        }else{
            next(new createError.NotFound());
        }

    }
}

module.exports = {authRoles};
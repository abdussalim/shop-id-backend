const postgreDB = require('../config/db');

const productsModel = {
    
    showAllProducts : (numberPerPage,startPage,sort,sortby,querySearch) => {
      return postgreDB.query(`SELECT * FROM products ${querySearch} ORDER BY ${sortby} ${sort} LIMIT ${numberPerPage} OFFSET ${startPage}`);
    },

    countOfproducts : () => {
      return postgreDB.query(`SELECT COUNT(*) FROM products`);
    },

    showProduct : (id) => {
      return postgreDB.query(`SELECT * FROM products WHERE id='${id}'`);
    },

    addProduct : (data) => {
      const {
        id,name,stock,price,thumbnail,description,categories_id,transactions_id,condition,brand}= data;
      return postgreDB.query(
        `INSERT INTO products(id,name,stock,price,thumbnail,description,categories_id,transactions_id,condition,brand) VALUES('${id}','${name}','${stock}','${price}','${thumbnail}','${description}','${categories_id}','${transactions_id}','${condition}','${brand}')`
      );
    },
    
    editProduct : (data) => {
      const {id, name, stock, price, thumbnail, description, condition, brand, categories_id, transactions_id} = data;
      return postgreDB.query(
        `UPDATE products SET name='${name}', stock='${stock}', price='${price}' ,thumbnail='${thumbnail}' ,description='${description}' ,condition='${condition}', brand='${brand}', categories_id='${categories_id}', transactions_id='${transactions_id}' WHERE id='${id}'`
      );
    },
    
    deleteProduct : (id) => {
      return postgreDB.query(`DELETE FROM products WHERE id='${id}'`);
    },

    findProductID : (id) => {
      return  new Promise ((resolve,reject)=> 
      postgreDB.query(`SELECT id FROM products WHERE id='${id}'`,(error,result)=>{
        if(!error){
          resolve(result);
        }else{
          reject(error);
        }
      })
      )
    }

};


module.exports = productsModel;
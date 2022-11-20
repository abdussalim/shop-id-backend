const postgreDB = require('../config/db');

const categoriesModel = {

  searchKeywordsCategories : (keywords) => {
    return postgreDB.query("SELECT * FROM categories WHERE id || ' ' || name LIKE $1", [`%${keywords}%`]);
  },

  showAllCategories : (numberPerPage,startPage,sort,sortby) => {
  return postgreDB.query(`SELECT * FROM categories ORDER BY ${sortby} ${sort} LIMIT ${numberPerPage} OFFSET ${startPage}`);
  },

  countOfCategories : () =>{
    return postgreDB.query('SELECT COUNT(*) FROM categories');
  },

  showCategory : (id) => {
    return postgreDB.query('SELECT * FROM categories WHERE'+` id='${id}'`);
  },

  addCategory : (name) => {
    return postgreDB.query(`INSERT INTO categories(name) VALUES ('${name}')`);
  },

  editCategory : (id, name) => {
    return postgreDB.query(`UPDATE categories SET name='${name}' WHERE id='${id}'`);
  },

  deleteCategory : (id) => {
    return postgreDB.query(`DELETE FROM categories WHERE id='${id}'`);
  }

};


module.exports = categoriesModel;

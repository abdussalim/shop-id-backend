const postgreDB = require('../config/db');

const detailTransactionsModel = {

  searchKeywordsDetailTransactions : (keywords) => {
    return postgreDB.query("SELECT * FROM detail_transactions WHERE id || ' ' || total || ' ' || payment_id ILIKE $1", [`%${keywords}%`]);
  },

  showAllDetailTransactions : (numberPerPage,startPage,sort,sortby) => {
    return postgreDB.query(`SELECT p.id,
    p.name,
    p.stock, 
    p.price, 
    categories.name AS categories, 
    transactions.address AS address, 
    detail_transactions.total AS total 
    FROM products AS p 
    INNER JOIN categories ON p.categories_id = categories.id 
    INNER JOIN transactions ON transactions.id = categories.id 
    INNER JOIN detail_transactions ON detail_transactions.id = categories.id 
    ORDER BY ${sortby} ${sort} LIMIT ${numberPerPage} OFFSET ${startPage}`);
  },

  countOfDetailTransactions : () => {
    return postgreDB.query(`SELECT COUNT(*) FROM detail_transactions`);
  },

  showDetailTransaction : (id) => {
    return postgreDB.query(`SELECT * FROM detail_transactions WHERE id='${id}'`);
  },

  addDetailTransaction : (total, payment_id) => {
    return postgreDB.query(`INSERT INTO detail_transactions(total,payment_id) VALUES (
      ${total},
      ${payment_id}
      )`
    );
  },

  editDetailTransaction : (id, total, payment_id) => {
    return postgreDB.query(`UPDATE detail_transactions SET 
      total=${total},
      payment_id=${payment_id}
    WHERE id='${id}'`
    );
  },

  deleteDetailTransaction : (id) => {
    return postgreDB.query(`DELETE FROM detail_transactions WHERE id='${id}'`);
  }

};

module.exports = detailTransactionsModel;
const postgreDB = require('../config/db');

const paymentModel = {

  searchKeywordsPayments : (keywords) => {
    return postgreDB.query("SELECT * FROM payment WHERE id || ' ' || amount LIKE $1", [`%${keywords}%`]);
  },

  showAllPayments : (numberPerPage,startPage,sort,sortby) => {
    return postgreDB.query(`SELECT * FROM payment ORDER BY ${sortby} ${sort} LIMIT ${numberPerPage} OFFSET ${startPage}`);  
  },

  countOfPayments : () => {
    return postgreDB.query(`SELECT COUNT(*) FROM payment`);
  },
  
  showPayment : (id) => {
    return postgreDB.query(`SELECT * FROM payment WHERE id='${id}'`);
  },
  
  addPayment : (amount) => {
    return postgreDB.query(`INSERT INTO payment(amount) VALUES (
      ${amount})`
    );
  },

  editPayment : (id, amount) => {
    return postgreDB.query(`UPDATE payment SET amount=${amount} WHERE id='${id}'`);
  },

  deletePayment : (id) => {
    return postgreDB.query(`DELETE FROM payment WHERE id='${id}'`);
  }

};

module.exports = paymentModel;
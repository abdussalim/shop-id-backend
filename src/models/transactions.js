const postgreDB = require('../config/db');

const transactionsModel = {

  searchKeywordsTransactions : (keywords) => {
    return postgreDB.query(`SELECT * FROM transactions WHERE
                               id || ' ' 
                            || address || ' '
                            || detail_transactions_id
                             LIKE $1`, [`%${keywords}%`]);
  },
  
  showAlltransactions : (numberPerPage,startPage,sort,sortby) => {
    return postgreDB.query(`SELECT * FROM transactions ORDER BY ${sortby} ${sort} LIMIT ${numberPerPage} OFFSET ${startPage}`);   
  },

  countOftransactions : () => {
    return postgreDB.query(`SELECT COUNT(*) FROM transactions`);
  },

  showTransaction : (id) => {
    return postgreDB.query(`SELECT * FROM transactions WHERE id='${id}'`);
  },

  addTransaction : (address, detail_transactions_id) => {
    return postgreDB.query(`INSERT INTO transactions(address,detail_transactions_id) VALUES (
    '${address}',
    ${detail_transactions_id})`
    );
  },

  editTransaction : (id, address, detail_transactions_id) => {
    return postgreDB.query(`UPDATE transactions SET 
    address = '${address}',
    detail_transactions_id = ${detail_transactions_id}
    WHERE id='${id}'`
    );
  },

  deleteTransaction : (id) => {
    return postgreDB.query(`DELETE FROM transactions WHERE id='${id}'`);
  }
};

module.exports = transactionsModel;
const transactionsModel = require("../models/transactions");
const commonsHelper = require("../helpers/common");

const transactionsController = {

  searchKeywordsTransactions : async (request, response) => {

    try {

      const keywords = ''||request.query.keyword;
      const result = await transactionsModel.searchKeywordsTransactions(keywords);
         response.status(200).json(
          {
           data:result.rows ,
        }
        );
      
    } catch (error) {
      console.log(error);
    }
  
},

  showAllTransactions : async (request, response) => {

    try{
      const currentPage = Number(request.query.currentPage) || 1;
      const numberPerPage = Number(request.query.numberPerPage) || 5;
      const startPage = (currentPage - 1) * numberPerPage;
      const sortby = request.query.sortby || "address";
      const sort = request.query.sort|| "ASC";
      console.log(sort);
      const result = await transactionsModel.showAlltransactions(numberPerPage, startPage, sort, sortby);
      const {rows: [rowsNumber]} = await transactionsModel.countOftransactions();
      const totalData = parseInt(rowsNumber.count);
      const totalPage = Math.ceil(totalData/numberPerPage);
      console.log(result);
      const pagination = {
        currentPage: currentPage,
        numberPerPage: numberPerPage,
        totalData: totalData,
        totalPage: totalPage
      };
    const data = result.rows;
    commonsHelper.responseResult(response, data, 200, "Transactions available", pagination);
    }catch(error){
      console.log(error);
    }
  },
  showTransaction: (request, response) => {

    const id = Number(request.params.id)
    transactionsModel.showTransaction(id)
      .then(
        result => response.json(result.rows)
      )
      .catch(error => response.send(error)
      )

  },
  addTransaction: (request, response) => {

    const { 
            address,
            detail_transactions_id
          } = request.body;

    transactionsModel.addTransaction(address, detail_transactions_id)
      .then(
        () => response.json("Transaction created")
      )
      .catch(error => response.send(error)
      );

  },
  editTransaction: (request, response) => {

    const id = Number(request.params.id);

    const {address, detail_transactions_id} = request.body;

    transactionsModel.editTransaction(id, address, detail_transactions_id)
      .then(
        () => response.json("Transaction updated")
      )
      .catch(error => response.send(error)
      );

  },
  deleteTransaction: (request, response) => {

    const id = Number(request.params.id);

    transactionsModel.deleteTransaction(id)
      .then(
        () => response.json("Transaction deleted")
      )
      .catch(error => response.send(error)
      );
  }

}

module.exports = transactionsController;
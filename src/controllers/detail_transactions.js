const detailTransactionsModel = require("../models/detail_transactions");
const commonsHelper = require("../helpers/common");

const detailTransactionsController = {

  searchKeywordsDetailTransactions : async (request, response) => {

    try {

      const keywords = ''||request.query.keyword;
      const result = await detailTransactionsModel.searchKeywordsDetailTransactions(keywords);
         response.status(200).json(
          {
           data:result.rows ,
        }
        );
      
    } catch (error) {
      console.log(error);
    }
  
},

  showAllDetailTransactions : async (request, response) => {

    try{
      const currentPage = Number(request.query.currentPage) || 1;
      const numberPerPage = Number(request.query.numberPerPage) || 5;
      const startPage = (currentPage - 1) * numberPerPage;
      const sortby = request.query.sortby || "id";
      const sort = request.query.sort|| "ASC";
      console.log(sort);
      const result = await detailTransactionsModel.showAllDetailTransactions(numberPerPage, startPage, sort, sortby);
      const {rows: [rowsNumber]} = await detailTransactionsModel.countOfDetailTransactions();
      const totalData = Number(rowsNumber.count);
      const totalPage = Math.ceil(totalData/numberPerPage);
      console.log(result);
      const pagination = {
        currentPage: currentPage,
        numberPerPage: numberPerPage,
        totalData: totalData,
        totalPage: totalPage
      };
      const data = result.rows;
      commonsHelper.responseResult(response, data, 200, "Detail Transactions available", pagination);
    }catch(error){
      console.log(error);
    }
  },
  showDetailTransaction: (request, response) => {
    const id = Number(request.params.id)
    detailTransactionsModel.showDetailTransaction(id)
      .then(
        result => response.json(result.rows)
      )
      .catch(error => response.send(error)
      )
  },
  addDetailTransaction: (request, response) => {

    const { 
            total,
            payment_id
          } = request.body;

    detailTransactionsModel.addDetailTransaction(total, payment_id)
      .then(
        () => response.json("Detail transactions created")
      )
      .catch(error => response.send(error)
      );

  },
  editDetailTransaction: (request, response) => {

    const id = Number(request.params.id);

    const {total, payment_id} = request.body;

    detailTransactionsModel.editDetailTransaction(id, total, payment_id)
      .then(
        () => response.json("Detail transaction updated")
      )
      .catch(error => response.send(error)
      );

  },
  deleteDetailTransaction: (request, response) => {

    const id = Number(request.params.id);

    detailTransactionsModel.deleteDetailTransaction(id)
      .then(
        () => response.json("Detail transaction deleted")
      )
      .catch(error => response.send(error)
      );
  }

}

module.exports = detailTransactionsController;
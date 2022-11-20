const paymentModel = require("../models/payment");
const commonsHelper = require("../helpers/common");

const paymentController = {

  searchKeywordsPayments : async (request, response) => {

    try {

      const keywords = ''||request.query.keyword;
      const result = await paymentModel.searchKeywordsPayments(keywords);
         response.status(200).json(
          {
           data:result.rows ,
        }
        );
      
    } catch (error) {
      console.log(error);
    }
  
},

  showAllPayments : async (request, response) => {

    try{
      const currentPage = Number(request.query.currentPage) || 1;
      const numberPerPage = Number(request.query.numberPerPage) || 5;
      const startPage = (currentPage - 1) * numberPerPage;
      const sortby = request.query.sortby || "id";
      const sort = request.query.sort|| "ASC";
      console.log(sort);
      const result = await paymentModel.showAllPayments(numberPerPage, startPage, sort, sortby);
      const {rows: [rowsNumber]} = await paymentModel.countOfPayments();
      const totalData = Number(rowsNumber.count);
      const totalPage = Math.ceil(totalData/numberPerPage);
      const pagination = {
        currentPage: currentPage,
        numberPerPage: numberPerPage,
        totalData: totalData,
        totalPage: totalPage
      };
    const data = result.rows;
    commonsHelper.responseResult(response, data, 200, "Payment available", pagination);
    
  }catch(error){
      console.log(error);
    }
  },
  showPayment: (request, response) => {
    const id = Number(request.params.id)
    paymentModel.showPayment(id)
      .then(
        result => response.json(result.rows)
      )
      .catch(error => response.send(error)
      )
  },
  addPayment: (request, response) => {

    const amount = request.body.amount;

    paymentModel.addPayment(amount)
      .then(
        () => response.json("Payment created")
      )
      .catch(error => response.send(error)
      );

  },
  editPayment: (request, response) => {

    const id = Number(request.params.id);

    const amount = request.body.amount;

    paymentModel.editPayment(id, amount)
      .then(
        () => response.json("Payment updated")
      )
      .catch(error => response.send(error)
      );

  },
  deletePayment: (request, response) => {

    const id = Number(request.params.id);

    paymentModel.deletePayment(id)
      .then(
        () => response.json("Payment deleted")
      )
      .catch(error => response.send(error)
      );
  }

}

module.exports = paymentController;
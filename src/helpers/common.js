const responseResult = (response, result, status, message, pagination)=>{
      const printResult = {};
            printResult.status = "success";
            printResult.statusCode = status;
            printResult.data = result;
            printResult.message = message || null;
            printResult.pagination = pagination || {};

            response.status(status).json(printResult);

};

module.exports = {responseResult};
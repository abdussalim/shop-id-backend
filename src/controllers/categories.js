  const categoriesModel = require("../models/categories");
const commonsHelper = require("../helpers/common");

const categoriesController = {

  searchKeywordsCategories : async (request, response) => {

        try {

          const keywords = ''||request.query.keyword;
          const result = await categoriesModel.searchKeywordsCategories(keywords);
          response.status(200).json(
          {
            data:result.rows ,
          }
          );
          
        } catch (error) {
          console.log(error);
        }    
  },

  showAllCategories : async (request, response) => {

    try{
        const currentPage = Number(request.query.currentPage) || 1;
        const numberPerPage = Number(request.query.numberPerPage) || 5;
        const startPage = (currentPage - 1) * numberPerPage;
        const sortby = request.query.sortby || "id";
        const sort = request.query.sort|| "ASC";
        const result = await categoriesModel.showAllCategories(numberPerPage, startPage, sort, sortby);
        const {rows: [rowsNumber]} = await categoriesModel.countOfCategories();
        const totalData = Number(rowsNumber.count);
        const totalPage = Math.ceil(totalData/numberPerPage);
        const pagination = {
          currentPage: currentPage,
          numberPerPage: numberPerPage,
          totalData: totalData,
          totalPage: totalPage
        };
      const data = result.rows;
      commonsHelper.responseResult(response, data, 200, "Categories available", pagination);
    }catch(error){
      console.log(error);
    }
  },

  showCategory: (request, response) => {

    const id = Number(request.params.id);

    categoriesModel.showCategory(id)
      .then(
        result => response.json(result.rows)
      )
      .catch(error => response.send(error)
      )
  },

  addCategory: (request, response) => {

      const name = request.body.name;

    categoriesModel.addCategory(name)
      .then(
        () => response.json("Category created")
      )
      .catch(error => response.send(error)
      );

  },

  editCategory: (request, response) => {

    const id = Number(request.params.id);

    const name = request.body.name;

    categoriesModel.editCategory(id, name)
      .then(
        () => response.json("Category updated")
      )
      .catch(error => response.send(error)
      );

  },
  
  deleteCategory: (request, response) => {

    const id = Number(request.params.id);

    categoriesModel.deleteCategory(id)
      .then(
        () => response.json("Category deleted")
      )
      .catch(error => response.send(error)
      );
  }

}

module.exports = categoriesController;
const { v4: uuidv4 } = require("uuid");
const createError = require("http-errors");
const commonsHelper = require("../helpers/common");
const productsModel = require("../models/products");
const deleteGoogleDrive = require("../utils/deleteGoogleDrive");
const { uploadGDProductThumbnails } = require("../utils/uploadGoogleDrive");
// const redisClient = require("../config/redis");

const productsController = {
  showAllProducts: async (request, response) => {
    try {
      const currentPage = Number(request.query.currentPage) || 1;
      const numberPerPage = Number(request.query.numberPerPage) || 25;
      const startPage = (currentPage - 1) * numberPerPage;
      const sortby = request.query.sortby || "name";
      const sort = request.query.sort || "ASC";
      const search = request.query.search || "";
      const keywords = search.toLowerCase();
      let querySearch = "";
      if (keywords) {
        querySearch = `WHERE name || brand ILIKE '%${keywords}%'`;
      }
      const result = await productsModel.showAllProducts(
        numberPerPage,
        startPage,
        sort,
        sortby,
        querySearch
      );
      const {
        rows: [rowsNumber],
      } = await productsModel.countOfproducts();
      const totalData = parseInt(rowsNumber.count);
      const totalPage = Math.ceil(totalData / numberPerPage);
      const pagination = {
        currentPage: currentPage,
        numberPerPage: numberPerPage,
        totalData: totalData,
        totalPage: totalPage,
      };
      const data = result.rows;
      delete data.categories_id;
      delete data.transactions_id;

      commonsHelper.responseResult(
        response,
        data,
        200,
        "Products available",
        pagination
      );
    } catch (error) {
      console.log(error);
    }
  },

  showProduct: (request, response) => {
    const id = request.params.id;
    productsModel
      .showProduct(id)
      .then((result) => {
        // redisClient.setEx(`products/${id}`,60*60,JSON.stringify(result.rows));
        commonsHelper.responseResult(
          response,
          result.rows,
          200,
          "We've succeed to hit database!"
        );
      })
      .catch((error) => response.send(error));
  },

  addProduct: async (req, res) => {
    const id = uuidv4();
    const file = req.files.thumbnail[0];
    const {
      name,
      stock,
      price,
      categories_id,
      transactions_id,
      description,
      condition,
      brand,
    } = req.body;
    // const {
    //   rows: [count],
    // } = await productsModel.countOfproducts();

    let thumbnail = await uploadGDProductThumbnails(file);
    const data = {
      id,
      name,
      stock,
      price,
      categories_id,
      transactions_id,
      thumbnail: `https://drive.google.com/thumbnail?id=${thumbnail.id}&sz=s1080`,
      description,
      condition,
      brand,
    };
    productsModel
      .addProduct(data)
      .then((result) =>
        commonsHelper.responseResult(res, result.rows, 201, "Product created")
      )
      .catch((err) => res.send(err));
  },

  editProduct: async (request, response, next) => {
    try {
      const id = request.params.id;
      const file = req.files.thumbnail[0];
      // const thumbnail = request.file.filename;

      let thumbnail = req.files.thumbnail;
      console.log(thumbnail);
      if (req.files) {
        if (req.files.thumbnail) {
          // menghapus thumbnail sebelumnya di gd jika sebelumnya sudah pernah upload
          console.log(req.files.thumbnail);
          if (thumbnail) {
            await deleteGoogleDrive(thumbnail);
          }
          // upload photo baru ke gd
          console.log("ini thumbnail", req.files.thumbnail[0].path);
          thumbnail = await uploadGDProductThumbnails(req.files.thumbnail[0]);
        }
      }

      const {
        name,
        stock,
        price,
        description,
        condition,
        brand,
        categories_id,
        transactions_id,
      } = request.body;
      const { rowCount } = await productsModel.findProductID(id);
      if (!rowCount) {
        return next(createError(403, "ID is Not Found"));
      }
      const data = {
        id,
        name,
        stock,
        price,
        thumbnail: `https://drive.google.com/thumbnail?id=${thumbnail.id}&sz=s1080`,
        description,
        condition,
        brand,
        categories_id,
        transactions_id,
      };
      productsModel
        .editProduct(data)
        .then((result) =>
          commonsHelper.responseResult(
            response,
            result.rows,
            200,
            "Product updated"
          )
        )
        .catch((err) => response.send(err));
    } catch (error) {
      console.log(error);
    }
  },

  deleteProduct: (request, response) => {
    const id = request.params.id;

    productsModel
      .deleteProduct(id)
      .then(commonsHelper.responseResult(response, {}, 200, "Product deleted"))
      .catch((error) => response.send(error));
  },
};

module.exports = productsController;

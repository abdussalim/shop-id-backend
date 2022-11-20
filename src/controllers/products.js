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

  addProduct: async (request, response) => {
    const id = uuidv4();
    const file = request.file;
    const {
      name,
      stock,
      price,
      categories_id,
      transactions_id,
      description,
      condition,
      brand,
    } = request.body;

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
        commonsHelper.responseResult(
          response,
          result.rows,
          201,
          "Product created"
        )
      )
      .catch((error) => response.send(error));
  },

  editProduct: async (request, response, next) => {
    try {
      const id = request.params.id;
      const { rowCount, rows } = await productsModel.showProduct(id);
      if (!rowCount) {
        return next(createError(403, "ID is Not Found"));
      }

      let { thumbnail } = rows[0];

      if (request.file) {
        // menghapus thumbnail sebelumnya di gd jika sebelumnya sudah pernah upload
        if (thumbnail) {
          console.log(thumbnail);
          const thumbnailGoogleDriveID = thumbnail
            .split("id=")[1]
            .split("&sz")[0];
          await deleteGoogleDrive(thumbnailGoogleDriveID);
          console.log(thumbnailGoogleDriveID);
        }
        // upload photo baru ke gd
        thumbnail = await uploadGDProductThumbnails(request.file);
        console.log(thumbnail);
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
        .catch((error) => response.send(error));
    } catch (error) {
      console.log(error);
    }
  },

  deleteProduct: async (request, response) => {
    const id = request.params.id;

    const { rows } = await productsModel.showProduct(id);

    let { thumbnail } = rows[0];

    if (thumbnail) {
      console.log(thumbnail);
      const thumbnailGoogleDriveID = thumbnail.split("id=")[1].split("&sz")[0];
      await deleteGoogleDrive(thumbnailGoogleDriveID);
      console.log(thumbnailGoogleDriveID);
    }

    productsModel
      .deleteProduct(id)
      .then(commonsHelper.responseResult(response, {}, 200, "Product deleted"))
      .catch((error) => response.send(error));
  },
};

module.exports = productsController;

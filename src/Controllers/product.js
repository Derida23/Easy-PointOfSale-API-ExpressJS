const productModel = require('../Models/product')
const form = require('../Helpers/form')
const { fPagination } = require('../Helpers/function')

module.exports = {
  getProduct: (req, res) => {
  const page = fPagination(req);
  productModel
    .getProduct (req, page)
    .then (response => {
      form.success (res, 200, response);
    })
    .catch (error => {
      form.error(res, 400, error);
    });
  },
  getProductId: (req, res) => {
  productModel
    .getProductId(req)
    .then (response => {
      if(response.length > 0 ) {
        form.success (res, 200, response);
      } else {
        form.error (res, 400, "ID Product Not Found")
      }
    })
    .catch (error => {
      form.error(res, 400, error);
    });
  },
  postProduct: (req, res) => {
    productModel
      .postProduct (req)
      .then (response => {
        form.success (res, 200, "Success Add Product");
      })
      .catch (error => {
        form.error(res, 400, error);
      });
  },
  putProduct: (req, res) => {
    productModel
      .putProduct (req)
      .then (response => {
        form.success (res, 200, "Product success update");
      })
      .catch (error => {
        form.error(res, 400, error);
      });
  },
  deleteProduct: (req, res) => {
    productModel
      .getProductId (req)
      .then(response => {
        if (response.length > 0) {
          productModel
          .deleteProduct (req)
          .then(response => {
            form.success (res, 200, "Product success delete");
          })
          .catch(error => {
            form.error (res, 400, error);
          })
        } else {
          form.error (res, 400, "ID Product Not Found")
        }
      })
      .catch (error => {
        form.error(res, 400, error);
      });
  },
};

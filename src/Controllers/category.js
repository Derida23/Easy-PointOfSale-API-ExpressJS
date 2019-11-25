const categoryModel = require('../Models/category')
const form = require('../Helpers/form')
const { fPagination } = require('../Helpers/function')

module.exports = {
  getCategory: (req, res) => {
  const page = fPagination(req);
  categoryModel
    .getCategory (req, page)
    .then (response => {
      form.success (res, 200, response);
    })
    .catch (error => {
      form.error(res, 400, error);
    });
  },
  getCategoryId: (req, res) => {
  categoryModel
    .getCategoryId(req)
    .then (response => {
      if(response.length > 0 ) {
        form.success (res, 200, response);
      } else {
        form.error (res, 400, "ID Category Not Found")
      }
    })
    .catch (error => {
      form.error(res, 400, error);
    });
  },
  postCategory: (req, res) => {
    categoryModel
      .postCategory (req)
      .then (response => {
        form.success (res, 200, response);
      })
      .catch (error => {
        form.error(res, 400, error);
      });
  },
  putCategory: (req, res) => {
    categoryModel
      .putCategory (req)
      .then (response => {
        form.success (res, 200, response);
      })
      .catch (error => {
        form.error(res, 400, error);
      });
  },
  deleteCategory: (req, res) => {
    const id = req.params.id
    categoryModel
      .getCategoryId (req)
      .then(response => {
        if (response.length > 0) {
          categoryModel
          .deleteCategory (req)
          .then(response => { res.json ({
            status: 200,
            id : id,
            message: 'Category success delete',
          })})
          .catch(error => {
            form.error (res, 400, "Coba 1");
          })
        } else {
          form.error (res, 400, "ID Product Not Found")
        }
      })
      .catch (error => {
        form.error(res, 400, "Coba 2");
      });
  },
};

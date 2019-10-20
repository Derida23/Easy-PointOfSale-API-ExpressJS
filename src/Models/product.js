const connection = require('../Configs/connect');
const functionHelper = require ('../Helpers/function')

module.exports = {
  // http://localhost:3030/product/?order=name&sort=DESC&page=1&content=4
  getProduct: (req, page) => {
      let sql = 'SELECT product.id, product.name, product.description, product.quantity, product.image, product.price, category.name AS category_name, product.date_add, product.date_update FROM product INNER JOIN category ON product.category_id = category.id'

      const query = functionHelper.fSearchProduct(req, sql);
      sql = functionHelper.fSorting(req, query.sql);

      return new Promise ((resolve, reject) => {
        functionHelper.getMaxPage(page, query.search, "product")
          .then(maxPage => {
            const infoPage = {
              currentPage: page.page,
              totalAllProduct: maxPage.totalProduct,
              maxPage: maxPage.maxPage
          };
          connection.query(`${sql} LIMIT ? OFFSET ?`,
            query.search == null ? [page.content, page.offset] : ['%' + query.search + '%', page.content, page.offset],
            (err, data) => {
              console.log(data);
              if (!err) resolve( {infoPage, data});
                else reject(err);
              });
            }).catch(err => {
                reject(err);
            });
          });
        },
  getProductId: (req) => {
    return new Promise ((resolve, reject) => {
      const id = req.params.id;
      const sql = 'SELECT product.id, product.name, product.description, product.quantity, product.image, product.price, category.name AS category_name, product.date_add, product.date_update FROM product INNER JOIN category ON product.category_id = category.id WHERE product.id=?'
      connection.query (sql, [id], (err, response) => {
          if (!err) {
            resolve (response);
          } else {
            reject (err);
          }
        }
      );
    });
  },
  postProduct: req => {
    return new Promise ((resolve, reject) => {
      const body = req.body;
      const checkCategoryId = 'SELECT id FROM category WHERE id=?'
      const sql = 'INSERT INTO product SET name=?, description=?, quantity=?, image=?, price=?, category_id=?'

      connection.query (checkCategoryId, [body.category_id],
        (err, response) => {
          if (response.length !=0 && body.price >= 0 && body.quantity >= 0){
            connection.query (sql,
            [body.name, body.description, body.quantity, body.image, body.price, body.category_id],
            (err, response) => {
              if (!err) {
                resolve (response);
              } else {
                reject (err);
              }
            });
          } else {
            if(body.quantity < 0 || body.price < 0 ){
              reject ("Quantity or Price dont below 0");
            } else {
              reject ("ID Category Not Found")
            }
            console.log(err);
          }
        });
    });
  },
  putProduct: req => {
    const body = req.body;
    const checkCategoryId = 'SELECT id FROM category WHERE id=?';
    const sql = 'UPDATE product SET name=?, description=?, quantity=?, image=?, price=?, category_id=? WHERE id=?';

    return new Promise ((resolve, reject) => {
      connection.query (checkCategoryId, [body.category_id],
        (err, response) => {
          if (response.length !=0 && body.price >= 0 && body.quantity >= 0 ){
            connection.query (sql,
            [body.name, body.description, body.quantity, body.image, body.price, body.category_id, body.id],
            (err, response) => {
              if (!err) {
                resolve (response);
              } else {
                reject (err);
                console.log(err);
              }
            })
          } else {
            if(body.quantity < 0 || body.price < 0 ){
              reject ("Quantity / Price dont below 0");
            } else {
              reject ("ID Category Not Found")
            }
            console.log(err);
          }
        });
      });
    },
  deleteProduct: req => {
    return new Promise ((resolve, reject) => {
      const id = req.params.id;
      connection.query ('DELETE FROM product WHERE id=?', [id],
        (err, response) => {
          if (!err) {
            resolve (response);
          } else {
            reject (err);
          }
        }
      );
    });
  }
};

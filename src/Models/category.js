const connection = require('../Configs/connect');
const { getMaxPage} = require('../Helpers/function');

module.exports = {
  getCategory: (req, page) => {
    const sql = 'SELECT * FROM category';

    return new Promise ((resolve, reject) => {
      getMaxPage(page, null, "category").then(maxPage => {
        const infoPage = {
          currentPage: page.page,
          totalAllCategories: maxPage.totalProduct,
          maxPage: maxPage.maxPage
        };

        connection.query(`${sql} LIMIT ? OFFSET ?`, [page.content, page.offset], (err, data) => {
          if (!err) resolve( {infoPage, data});
            else reject(err);
        });
      }).catch(err => {
          reject(err);
      });
    });
  },
  getCategoryId: (req) => {
    return new Promise ((resolve, reject) => {
      const id = req.params.id;
      const sql = 'SELECT * FROM category WHERE id = ?'
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
  postCategory: req => {
    return new Promise ((resolve, reject) => {
      const name = req.body.name;
      connection.query (
        'INSERT INTO category SET name=?',
        [name],
        (err, response) => {
          if (!err) {
            const id = response.insertId
            connection.query ('SELECT * FROM category WHERE id = ?', id,
              (err, result) => {
                if (!err){
                  //SELECT DATA
                  resolve (result);
                } else {
                  reject (err);
                }
              }
            )
          } else {
            reject (err);
          }
        }
      );
    });
  },
  putCategory: req => {
    return new Promise ((resolve, reject) => {
      const param = req.params
      const body = req.body;
      const checkCategoryId = 'SELECT id FROM category WHERE id=?';
      const sql = 'UPDATE category SET name=? WHERE id=?';

      connection.query ( checkCategoryId, [param.id],(err, response) => {
        if (response.length > 0){
          connection.query (sql, [body.name, param.id], (err, response) => {
            if (!err) {  console.log(response);
              connection.query ('SELECT * FROM category WHERE id=?',param.id,
                (err, result) => {
                  if (!err) {
                    // SELECT DATA
                    resolve(result);
                  } else {
                    reject (err);
                  }
                }
              )
            } else {
              reject (err);
            }
          })
        } else {
          reject ('ID Category Not Found')
        }
      });
    });
  },
  deleteCategory: req => {
    return new Promise ((resolve, reject) => {
      const id = req.params.id;
      connection.query (
        'DELETE FROM category WHERE id=?', [id], (err, response) => {
          if (!err) {
            resolve (response);
          } else {
            reject (err);
          }
      });
    });
  },
};

const connection = require('../Configs/connect');

module.exports = {
  addProduct: req => {
    return new Promise((resolve, reject) => {
      const body = req.body;
      let sql = 'INSERT INTO stock (product_id, quantity) VALUES ?';
      let value = [body.objStock.map (item => [item.product_id, item.quantity])];

      connection.query (sql, value,
        (err, response) => {
          if (!err) {
            resolve (response);
          } else {
            reject (err);
          }
      });
    });
  },
  getOrderGroup: (req) => {
    return new Promise ((resolve, reject) => {
      const order_group = req.body.order_group;
      const sql = 'SELECT * FROM transaction where order_group = ?'
      
      connection.query (sql, [order_group], (err, response) => {
          if (!err) {
            resolve (response);
          } else {
            reject (err);
          }
        }
      );
    });
  },
  reduceProduct: req => {
    return new Promise((resolve, reject) => {
      const body = req.body
      const sql = 'INSERT INTO transaction (order_group, product_id, quantity) VALUES ?';
      const value = [body.objTrans.map (item => [body.order_group,item.product_id, item.quantity])]

      connection.query (sql, value,
      (err, response) => {
        if (!err) {
          resolve (response);
        } else {
          reject (err);
        }
      });
    });
  }
};

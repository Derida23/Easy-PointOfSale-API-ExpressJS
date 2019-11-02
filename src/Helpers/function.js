const connection = require('../Configs/connect');

exports.fPagination = (req) => {
  let content = Number(req.query.content)  || 20;
  let page = Number(req.query.page) || 1;
  let offset = content * (page - 1);

  return{
    page,
    content,
    offset,
  };
};

exports.getMaxPage = (page, keyword, table) => {
    return new Promise((resolve, reject) => {
        if(keyword != null) table += " WHERE name LIKE ?"
        connection.query(`SELECT COUNT(*) as total FROM ${table}`, ['%' + keyword + '%'], (err, result) => {
            if (!err) {
                const maxPage = Math.ceil(result[0].total / page.content);

                if(maxPage >= page.page){
                    resolve({
                        totalProduct: result[0].total,
                        maxPage
                    });
                }else{
                    reject(`Im sorry only until page ${maxPage}`);
                }
            }
            else reject(err);
        });
    });
}

exports.fSorting = (req, sql) => {
  // console.log(sql, "masuk");
  let order = req.query.order;
  let sort = req.query.sort;

  if(order == 'name'){
    sql += ' ORDER BY name'
  } else if (order == 'date_update') {
    sql += ' ORDER BY date_update'
  } else if (order == 'category'){
    sql += ' ORDER BY category_name'
  } else {
    sql += ' ORDER BY id'
  }

  if(sort == 'ASC'){
    sql += ' ASC'
  } else if (sort == 'DESC') {
    sql += ' DESC'
  }

  // console.log(sql, "keluar");

  return sql;
};

exports.fSearchProduct = (req, sql) => {
    const search = req.query.search;
    if (search != null) {
        sql += ` AND product.name LIKE ? `;
    }

    return {
        sql,
        search
    };
}

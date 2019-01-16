const express = require('express');

const bookRouter = express.Router();
const sql = require('mssql');

function router(nav) {

    bookRouter.route('/')
        .get((req, res) => {
            (async function query() {
                const request = new sql.Request();

                const { recordset } = await request.query('select * from books');
                res.render(
                    'bookListView',
                    {
                        nav,
                        title: 'Library',
                        books: recordset
                    }
                );
            }());
        });

    bookRouter.route('/:id')
        .get((req, res) => {
            (async function query() {
                const { id } = req.params;
                const request = new sql.Request();
                const { recordset } = await request
                    .input('id', sql.Int, id)
                    .query('select * from books where id = @id');

                res.render(
                    'bookView',
                    {
                        nav,
                        title: 'Library Book',
                        book: recordset[0]
                    }
                );
            }());
        });
    return bookRouter;
}


module.exports = router;

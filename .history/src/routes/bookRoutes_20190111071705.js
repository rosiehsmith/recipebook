const express = require('express');

const bookRouter = express.Router();
const sql = require('mssql');
const debug = require('debug')('app:bookRoutes');

function router(nav) {
    const books = [
        {
            title: 'Through the Looking Glass',
            author: 'Lewis Carroll',
            genre: 'Children\'s',
            read: false
        },
        {
            title: 'Witches',
            author: 'Roald Dahl',
            genre: 'Biography',
            read: false
        },
        {
            title: 'The Time Machine',
            author: 'H.G. Wells',
            genre: 'Children\'s',
            read: true
        }
    ];

    bookRouter.route('/')
        .get((req, res) => {
            (async function query() {
                const request = new sql.Request();
                const result = await request.query('select * from books')
                debug(result);
                res.render(
                    'bookListView',
                    {
                        nav,
                        title: 'Library',
                        books: result.recordset
                    }
                );
            }());
        });

    bookRouter.route('/:id')
        .get((req, res) => {
            const { id } = req.params;
            res.render(
                'bookView',
                {
                    nav,
                    title: 'Library Book',
                    book: books[id]
                }
            );
        });
    return bookRouter;
}


module.exports = router;

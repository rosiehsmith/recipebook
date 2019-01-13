const express = require('express');

const bookRouter = express.Router();
const sql = require('mssql');
const debug = require('debug')('app:bookRoutes');

function router(nav) {
    const books = [
        {
            title: 'Of Mice and Men',
            author: 'John Steinbeck',
            genre: 'Tragedy',
            read: false
        },
        {
            title: 'Bossypants',
            author: 'Tina Fey',
            genre: 'Biography',
            read: false
        },
        {
            title: 'Through the Looking Glass',
            author: 'Lewis Caroll',
            genre: 'Children\'s',
            read: true
        }
    ];

    bookRouter.route('/')
        .get((req, res) => {
            const request = new sql.Request();

            request.query('select * from books')
                .then((result) => {
                    debug(result);
                    res.render(
                        'bookListView',
                        {
                            nav,
                            title: 'Library',
                            books: result.recordset
                        }
                    );
                });
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

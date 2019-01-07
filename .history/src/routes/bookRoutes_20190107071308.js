const express = require('express');

const bookRouter = express.Router();

function router(nav) {
    const books = [
        {
            title: 'Clifford',
            author: 'God',
            genre: 'Kids',
            read: false
        },
        {
            title: 'Atonement',
            author: 'Mohammed',
            genre: 'Romance',
            read: true
        }
    ];

    bookRouter.route('/')
        .get((req, res) => {
            res.render('bookListView',
                {
                    nav,
                    title: 'Library',
                    books
                });
        });

    bookRouter.route('/:id')
        .get((req, res) => {
            const { id } = req.params;
            res.render(
                'bookView',
                {
                    nav,
                    title: 'Library',
                    book: id
                }
            );
        });
    return bookRouter;
}


module.exports = router;

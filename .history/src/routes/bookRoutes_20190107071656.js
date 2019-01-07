const express = require('express');

const bookRouter = express.Router();

function router(nav) {
    const books = [
        {
            title: 'Of Mice and Men',
            author: 'John Steinbeck',
            genre: 'Tragedy',
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

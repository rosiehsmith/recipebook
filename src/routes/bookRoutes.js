const express = require('express');

const bookRouter = express.Router();

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
        res.render('books',
            {
                nav: [{ link: '/books', title: 'Books' },
                    { link: '/authors', title: 'Authors' }],
                title: 'Library',
                books
            });
    });

bookRouter.route('/:id')
    .get((req, res) => {
        const { id } = req.params;
        res.render(
            'book',
            {
                nav: [{ link: '/books', title: 'Books' },
                    { link: '/authors', title: 'Authors' }],
                title: 'Library',
                book: id
            }
        );
    });

module.exports = bookRouter;

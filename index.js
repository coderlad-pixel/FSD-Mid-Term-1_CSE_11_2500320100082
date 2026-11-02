const express = require('express');

const app = express();

const PORT = 3000;

// Middleware to read JSON data
app.use(express.json());

// Temporary books array
let books = [];

// GET API - Display all books
app.get('/API/books', (req, res) => {
    res.json(books);
});

// POST API - Add a new book
app.post('/API/books', (req, res) => {

    const newBook = req.body;

    books.push(newBook);

    res.status(201).json({
        message: 'Book added successfully!',
        book: newBook
    });

});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

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

// GET API - Search for a book by ID
app.get('/API/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);

    const book = books.find(book => book.id === bookId);

    if (!book) {
        return res.status(404).json({
            message: 'Book not found!'
        });
    }

    res.json(book);
});

// POST API - Add a new book
app.post('/API/books', (req, res) => {
    const newBook = {
        ...req.body,
        status: "Available"
    };

    books.push(newBook);

    res.status(201).json({
        message: 'Book added successfully!',
        book: newBook
    });
});

// PUT API - Issue a book
app.put('/API/books/issue/:id', (req, res) => {
    const bookId = parseInt(req.params.id);

    const book = books.find(book => book.id === bookId);

    if (!book) {
        return res.status(404).json({
            message: 'Book not found!'
        });
    }

    if (book.status === "Issued") {
        return res.status(400).json({
            message: 'Book is already issued!'
        });
    }

    book.status = "Issued";

    res.json({
        message: 'Book issued successfully!',
        book: book
    });
});

// PUT API - Return a book
app.put('/API/books/return/:id', (req, res) => {
    const bookId = parseInt(req.params.id);

    const book = books.find(book => book.id === bookId);

    if (!book) {
        return res.status(404).json({
            message: 'Book not found!'
        });
    }

    if (book.status === "Available") {
        return res.status(400).json({
            message: 'Book is already available!'
        });
    }

    book.status = "Available";

    res.json({
        message: 'Book returned successfully!',
        book: book
    });
});

// DELETE API - Delete a book by ID
app.delete('/API/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);

    const bookIndex = books.findIndex(book => book.id === bookId);

    if (bookIndex === -1) {
        return res.status(404).json({
            message: 'Book not found!'
        });
    }

    const deletedBook = books.splice(bookIndex, 1);

    res.json({
        message: 'Book deleted successfully!',
        book: deletedBook[0]
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

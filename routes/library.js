const express = require('express');
const LibModel = require('../database/LibraryModel');
const userExist = require('../controller/userAuth');
const router = express.Router();


// Create: New book entry
router.post('/add-book/:user', userExist, async (req, res) => {
    try {
        const { id, title, author, summary } = req.body;
        const bookEntryExist = await LibModel.findOne({ title: title, author: author });
        if (bookEntryExist) {
            return res.status(400).json({ message: "Book entry already exists." });
        }

        const bookIdExist = await LibModel.findOne({ bookId: id });
        if (bookIdExist) {
            return res.status(406).json({
                note: "The book-Id already exists, kindly choose a different id to continue."
            });
        }

        const newBookEntry = new LibModel({
            bookId: id,
            title: title,
            author: author,
            summary: summary
        });
        await newBookEntry.save();
        res.status(200).json({ message: "Book entry successful.", entry: newBookEntry });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error." });
    }
});


// Read: View the list of books
router.get('/view-book', async (req, res) => {
    try {
        // Fetching books details based on certain query parameters
        const { bookId, bookName, author } = req.query;

        // Fetch books based on certain keywords
        if (req.query) {
            let query = {};
            bookQuery = new RegExp(bookName, 'i');
            authorQuery = new RegExp(author, 'i');

            // Search based on Book_ID
            if (bookId) {
                query = { bookId: bookId };
            }

            // Search based on keywords of Book-Name and/or Author
            else if (bookName && author) {
                query = { title: bookQuery, author: authorQuery }
            }
            else if (bookName) {
                query = { title: bookQuery };
            }
            else if (author) {
                query = { author: authorQuery };
            }

            const books = await LibModel.find(query);
            if (books.length == 0) {
                return res.status(200).json({ message: "No books found." });
            }
            const bookList = books.map((book) => {
                return {
                    Book_id: book.bookId,
                    Name: book.title,
                    Author: book.author,
                    Summary: book.summary
                }
            })
            return res.status(200).json({ message: "Books found.", data: bookList });
        }

        // Fetch the whole list
        else {
            const bookEntry = await LibModel.find();
            if (bookEntry.length == 0) {
                return res.status(404).json({ message: "No books found." });
            }
            const list = bookEntry.map((entry) => {
                return {
                    Book_id: entry.bookId,
                    Name: entry.title,
                    Author: entry.author,
                }
            });
            res.status(200).json({ message: "Books list found.", data: list });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error." });
    }
});


// Update: New book details
router.put('/update-book/:user', userExist, async (req, res) => {
    try {
        const { bookId } = req.query;
        const { title: newTitle, author: newAuthor, summary: newSummary } = req.body;
        
        const bookExist = await LibModel.findOne({ bookId: bookId });
        if (!bookExist) {
            return res.status(400).json({ error: "Book with id: " + bookId + " was not found" });
        }
        // Check and update certain details pushed in body
        if (newTitle) {
            bookExist.title = newTitle;
        }
        if (newAuthor) {
            bookExist.author = newAuthor;
        }
        if (newSummary) {
            bookExist.summary = newSummary;
        }

        await bookExist.save();
        res.status(200).json({ message: "Information updated successfully.", newData: bookExist });

    } catch (err) {
        res.status(500).json({ message: "Internal server error." });
    }
});


// Delete: Removing a book by querying using bookId
router.delete('/delete-book/:user', userExist, async (req, res) => {
    try {
        const { bookId } = req.query;
        const bookExist = await LibModel.findOne({ bookId: bookId });
        if (!bookExist) { 
            return res.status(400).json({
                message: "Book with id: " + bookId + " does not exist in database."
            });
        }
        const bookDeleted = await bookExist.deleteOne();
        res.status(200).json({
            message: "Book entry was deleted successfully.",
            Deleted_data: bookDeleted
        });

    } catch (err) {
        res.status(500).json({ message: "Internal server error." });
    }
});

module.exports = router;

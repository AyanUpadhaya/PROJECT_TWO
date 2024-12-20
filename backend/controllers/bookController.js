const Book = require("../models/Book");
const Store = require("../models/Store");
const User = require("../models/User");
const uploadToCloudinary = require("../utils/uploadToCloudinary");
// Create a new book
const createBook = async (req, res) => {
  try {
    const reqBody = JSON.parse(req.body.data);
    const { store_id } = reqBody;
  
    const store = await Store.findById(store_id);
    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }
    const [result, fileName] = await uploadToCloudinary(req);
    const newBook = new Book({ ...reqBody, cover_photo: result });

    await newBook.save();
    console.log(newBook._id);
    store.book_ids.push(newBook._id);
    await store.save();

    const populatedBook = await Book.findById(newBook._id).populate(
      "category_id",
      "name"
    );

    res.status(201).json({
      message: "Book created successfully",
      data: populatedBook,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create book", error: error.message });
  }
};

// Get all books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find()
      .populate("category_id created_by store_id")
      .sort({ createdAt: -1 });
    res.status(200).json(books);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch books", error: error.message });
  }
};

// Get books by store ID
const getBooksByStore = async (req, res) => {
  try {
    const { store_id } = req.params;

    const books = await Book.find({ store_id })
      .populate("category_id created_by")
      .sort({ createdAt: -1 });

    if (books.length === 0) {
      return res.status(404).json({ message: "No books found in this store" });
    }

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch books for this store",
      error: error.message,
    });
  }
};

async function updateUtility(book_id, dataObj) {
  const updatedBook = await Book.findByIdAndUpdate(book_id, dataObj, {
    new: true,
  }).populate("category_id", "name");

  if (!updatedBook) {
    return res.status(404).json({ message: "Book not found" });
  }

  return updatedBook;
}

// Update book 
const updateBook = async (req, res) => {
  try {
    const { book_id } = req.params;
    const reqBody = JSON.parse(req.body.data);

    // if no file provided
    if (!req.files || !req.files.file || req.files.file.length === 0) {
      const updatedBook = await updateUtility(book_id, {
        ...reqBody,
      });
      res
        .status(200)
        .json({ message: "Book updated successfully", data: updatedBook });
    } else {
      const [result, fileName] = await uploadToCloudinary(req);
      const updatedBook = await updateUtility(book_id, {
        ...reqBody,
        cover_photo: result,
      });

      res
        .status(200)
        .json({ message: "Book updated successfully", data: updatedBook });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update book", error: error.message });
  }
};

// Delete book
const deleteBook = async (req, res) => {
  try {
    const { book_id } = req.params;

    // Find the book by its ID
    const book = await Book.findById(book_id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Check if the logged-in user is the one who created the book
    if (book.created_by.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You can only delete your own books" });
    }

    // Remove the book from the store's book_ids array
    const store = await Store.findById(book.store_id);
    if (store) {
      // Remove the book ID from the store's book_ids array
      store.book_ids = store.book_ids.filter(
        (id) => id.toString() !== book_id.toString()
      );
      await store.save();
    }

    // Delete the book
    await Book.findByIdAndDelete(book_id);

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete book", error: error.message });
  }
};



//Get single book
const getSingleBook = async (req, res) => {
  try {
    const { book_id } = req.params;

    // Find the book by its ID and populate required fields
    const book = await Book.findById(book_id)
      .populate("category_id") 
      .populate("store_id") 
     

    // If the book is not found, return a 404 error
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Return the book data
    res.status(200).json(book);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve the book", error: error.message });
  }
};

module.exports = {
  createBook,
  getAllBooks,
  getBooksByStore,
  updateBook,
  deleteBook,
  getSingleBook,
};

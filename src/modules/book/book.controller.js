import { Author } from "../../../database/models/author.model.js";
import { Book } from "../../../database/models/book.model.js";

const addBook = async (req, res) => {
  try {
    // Find the author by name
    let author = await Author.findOne({ name: req.body.author });
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }
    // Add the book to the Book collection
    let book = new Book(req.body);
    await book.save();

    // Add the book's ID to the author's books array
    author.books.push(book._id);
    await author.save();

    res.json({ message: "Success", book });
  } catch (error) {
    res.status(500).json({ message: "Error", error });
  }
};

const getAllBooks = async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const books = await Book.find()
      .skip((page - 1) * limit)
      .limit(limit);

    const totalBooks = await Book.countDocuments();

    res.json({
      message: "success",
      books,
      totalPages: Math.ceil(totalBooks / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: "Error", error });
  }
};


const getBooksById = async (req, res) => {
  try {
    let book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json({ message: "success", book });
  } catch (error) {
    res.status(500).json({ message: "Error", error });
  }
};

const updateBook = async (req, res) => {
  try {
    let book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json({ message: "success", book });
  } catch (error) {
    res.status(500).json({ message: "Error", error });
  }
};

const deleteBook = async (req, res) => {
  try {
    let book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Remove the book ID from the author's books array
    await Author.updateOne(
      { books: book._id },
      { $pull: { books: book._id } }
    );

    res.json({ message: "success", book });
  } catch (error) {
    res.status(500).json({ message: "Error", error });
  }
};
const searchBooks = async (req, res) => {
  try {
    let { title, author, page = 1, limit = 10 } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    let criteria = {};
    if (title) {
      criteria.title = { $regex: title, $options: "i" };
    }
    if (author) {
      criteria.author = { $regex: author, $options: "i" };
    }

    const books = await Book.find(criteria)
      .skip((page - 1) * limit)
      .limit(limit);

    const totalBooks = await Book.countDocuments(criteria);

    res.json({
      message: "success",
      books,
      totalPages: Math.ceil(totalBooks / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: "Error", error });
  }
};



export { addBook, getAllBooks, getBooksById, updateBook, deleteBook, searchBooks };

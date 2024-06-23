import { Author } from "../../../database/models/author.model.js";
import { Book } from './../../../database/models/book.model.js';

const addAuthor = async (req, res) => {
  let author = await Author.insertMany(req.body);
  res.json({ message: "Success", author });
};

const getAllAuthor = async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const authors = await Author.find()
      .populate("books")
      .skip((page - 1) * limit)
      .limit(limit);

    const totalAuthors = await Author.countDocuments();

    res.json({
      message: "success",
      authors,
      totalPages: Math.ceil(totalAuthors / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: "Error", error });
  }
};


const getAuthorById = async (req, res) => {
  let authors = await Author.findById(req.params.id).populate("books");
  res.json({ message: "success", authors });
};

const updateAuthor = async (req, res) => {
  let author = await Author.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json({ message: "success", author });
};

const deleteAuthor= async (req, res) => {
  let author = await Author.findByIdAndDelete(req.params.id);

  author.books.map(async (id)=>{
    await Book.findByIdAndDelete(id)
  })
  res.json({ message: "success", author });
};

const searchAuthors = async (req, res) => {
  try {
    let { name, bio, page = 1, limit = 10 } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    let criteria = {};
    if (name) {
      criteria.name = { $regex: name, $options: "i" };
    }
    if (bio) {
      criteria.bio = { $regex: bio, $options: "i" };
    }

    const authors = await Author.find(criteria)
      .skip((page - 1) * limit)
      .limit(limit);

    const totalAuthors = await Author.countDocuments(criteria);

    res.json({
      message: "success",
      authors,
      totalPages: Math.ceil(totalAuthors / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: "Error", error });
  }
};


export { addAuthor, getAllAuthor ,getAuthorById  , deleteAuthor , updateAuthor , searchAuthors };

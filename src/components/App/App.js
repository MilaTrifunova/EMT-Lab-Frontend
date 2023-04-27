import './App.css';
import React, {Component} from "react"
import {BrowserRouter as Router, Route, Navigate, Routes} from "react-router-dom";
import Books from '../Book/BookList/bookList'
import BookEdit from "../Book/BookEdit/bookEdit";
import Categories from "../Categories/categories";
import Header from "../Header/header"
import BookAdd from "../Book/BookAdd/bookAdd";
import BookService from "../../repository/bookRepository";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      authors: [],
      categories :[],
      selectedBook: {}
    }
  }

  render() {
    return (
        <Router>
          <main>
            <Header/>
            <div className="container">
              <Routes>
                <Route path={"/categories"} element={ <Categories categories={this.state.categories}  />}/>
                <Route path={"/books/add"} element={<BookAdd categories={this.state.categories}
                                                             authors={this.state.authors}
                                                             onBookAdd={this.addBook}/>}/>
                <Route path={"/books/edit/:id"} element={<BookEdit onEditBook={this.editBook} book={this.state.selectedBook}
                                                                   categories={this.state.categories} authors={this.state.authors}/>}/>
                <Route path={"/books"} element={ <Books books={this.state.books}  onDelete={this.deleteBook}  onEdit={this.getBook} onMarkAsTaken={this.markAsTaken}/>}/>
                <Route path="/" element={<Navigate to="/books" replace />}/>
              </Routes>


            </div>
          </main>
        </Router>

    );
  }
  loadBooks = () => {
      BookService.fetchBooks()
        .then((data) => {
          this.setState({
            books: data.data
          })
        });
  }
  deleteBook= (id) =>{
      BookService.deleteBook(id)
        .then(()=> {
          this.loadBooks()
        });
  }
  getBook= (id) => {
      BookService.getBook(id)
        .then((data) => {
          this.setState({
            selectedBook: data.data
          });
        })
  }
  editBook= (id,name,category,author,availableCopies) => {
      BookService.editBook(id,name,category,author,availableCopies)
        .then(()=> {
          this.loadBooks()
        });
  }
  loadAuthors = () => {
      BookService.fetchAuthors()
        .then((data) => {
          this.setState({
            authors: data.data
          })
        });
  }
  loadCategories = () => {
      BookService.fetchCategories()
        .then((data) => {
          this.setState({
            categories: data.data
          })
        });
  }
  addBook= (name,category,author,availableCopies) => {
      BookService.addBook(name,category,author,availableCopies)
        .then(()=> {
          this.loadBooks()
        });
  }
  markAsTaken = (id) => {
      BookService.markAsTaken(id)
        .then(()=> {
          this.loadBooks()
        });
  }

  componentDidMount() {
    this.loadBooks();
    this.loadCategories();
    this.loadAuthors();

  }

}

export default App;
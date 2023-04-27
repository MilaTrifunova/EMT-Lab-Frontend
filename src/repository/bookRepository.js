import axios from '../custom-axios/axios';

const BookService = {
    fetchBooks: () => {
        return axios.get("/books",{
            params: {
                size: 5,
                batch: 2
            }
        });
    },
    deleteBook: (id) => {
        return axios.delete(`/books/delete/${id}`);
    },
    editBook:(id,name, category, author, availableCopies) => {
        return axios.put(`/books/edit/${id}`,{
            "name" : name,
            "category" : category,
            "author" : author,
            "availableCopies" : availableCopies,
        });
    },
    getBook: (id) => {
        return axios.get(`/books/${id}`)
    },
    fetchCategories: () => {
        return axios.get("");
    },
    fetchAuthors: () => {
        return axios.get("/authors");
    },
    addBook:(name, category, author, availableCopies) => {
        return axios.post(`/books/add/`,{
            "name" : name,
            "category" : category,
            "author" : author,
            "availableCopies" : availableCopies,
        });
    },
    markAsTaken: (id) =>{
        return axios.put(`/books/markAsTaken/${id}`)
    }
}
export default BookService;
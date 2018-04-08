import React from 'react'
import { Route , Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import SearchBooks from './SearchBooks'
import Bookshelf from './Bookshelf'
import './App.css'

class BooksApp extends React.Component {
  state = {
    bookshelves: [
      {
        tag: 'currentlyReading',
        title: 'Currently Reading'
      },
      {
        tag: 'wantToRead',
        title: 'Want to Read'
      },
      {
        tag: 'read',
        title: 'Read'
      }
    ],
    books: [],
    query: '',
    searchResults: [],
  }
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }
  shelfChange = (book, shelf) => {
    console.log( 'book contains: ', book)
    console.log( 'shelf equals: ', shelf)
    BooksAPI.update(book, shelf)
    /*
    * TODO: this seems lazy. I should probably be able to do this in far fewer
    * steps without completely resetting state for both books and searchResults
    */
    .then( () => BooksAPI.getAll()
      .then((books) => this.setState({ books })
    ).then(() => this.setState({ searchResults: this.updateSearchShelves(this.state.books, this.state.searchResults) }))
    )
  }
  updateQuery = (query) => {
    this.setState({ query: query.trimLeft() })
    if (query.trimLeft() !== '') {
      BooksAPI.search(query)
      .then(
        books => {
          /*let shelvedBooks = books.map(book => {
            let bookMatch = this.state.books.find(b => b.id === book.id)
            bookMatch ? book.shelf = bookMatch.shelf : book.shelf = "none"
            return book
          })*/
          this.setState({ searchResults: this.updateSearchShelves(this.state.books, books) })
        },
        () => this.setState({ searchResults: [] })
      )
      .catch( reason => {
        this.setState({ searchResults: [] })
        console.error( 'onRejected function called: ', reason )
      })
    }
  }
  updateSearchShelves = (books, searchResults) => {
    let shelvedBooks = searchResults.map(book => {
      let bookMatch = books.find(b => b.id === book.id)
      bookMatch ? book.shelf = bookMatch.shelf : book.shelf = "none"
      return book
    })
    return shelvedBooks
  }
  render() {
    const { bookshelves, books, query, searchResults } = this.state

    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {bookshelves.map(bs =>
                  <Bookshelf
                    key={ bs.tag }
                    books={books.filter((book) =>
                      book.shelf === bs.tag)}
                    title={ bs.title }
                    onShelfChange={ this.shelfChange }
                  />
                )}
              </div>
            </div>
            <div className="open-search">
              <Link
                to="/search"
                className="add-book"
              >Add a book</Link>
            </div>
          </div>
        )}/>
        <Route path="/search" render={({ history }) => (
          <SearchBooks
            results={ searchResults }
            query={ query }
            onShelfChange={ this.shelfChange }
            onUpdateQuery={ this.updateQuery }
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp

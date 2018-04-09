import React from 'react'
import { Route , Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import SearchBooks from './SearchBooks'
import Bookshelf from './Bookshelf'
import './App.css'

/**
* @desc BooksApp is a book-lending application that creates and maintains three
* bookshelves: "Currently Reading", "Want to Read", and "Read". Users can move
* each book between shelves or remove it. Users can search for additional books
* and will see the current shelf any book belongs to. If a book returned from a
* search does not have a shelf, this will show as "none".
*/
class BooksApp extends React.Component {
  state = {
    bookshelves: [ // bookshelves to be rendered
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
    books: [], // array of book objects added to bookshelves
    query: '', // text query for searching books
    searchResults: [], // array of book objects returned from search
  }
  /**
  * @desc Gets all books belonging to shelves from API and sets state
  */
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    })
  }
  /**
  * @desc Sends API updated shelf for book then sets state for books and searchResults
  * @param {object} book = book whose shelf is being altered
  * @param {string} shelf = shelf book is being moved to
  */
  shelfChange = (book, shelf) => {
    /*
    * TODO: implementation seems too expensive to completely update state.books
    * every time. I should probably be able to do this in fewer steps without
    * completely resetting state for both books and searchResults.
    */
    BooksAPI.update(book, shelf)
    .then( () => BooksAPI.getAll()
      .then((books) => this.setState({ books })
      ).then(() => this.setState({ searchResults:
        this.updateSearchShelves(this.state.books, this.state.searchResults)
      }))
    )
  }
  /**
  * @desc takes updated query, trims leading whitespaces, and sends non-empty
  * queries to search API. Received books array is matched against state books
  * array for any existing shelf assignments before being set to searchResults
  * state.
  * @param {string} query: search term from user input field
  */
  updateQuery = (query) => {
    this.setState({ query: query.trimLeft() })
    if (query.trimLeft() !== '') {
      BooksAPI.search(query)
      .then(
        books => {
          this.setState({ searchResults:
            this.updateSearchShelves(this.state.books, books) })
        },
        () => this.setState({ searchResults: [] })
      )
      .catch( reason => {
        this.setState({ searchResults: [] });
        console.error( 'onRejected function called: ', reason );
      })
    }
  }
  /**
  * @desc searchResults array is mapped against against books array to find
  * any matching book IDs. If a match exists, the searchResults book's shelf
  * is updated to the shelf of the match. Otherwise, a "none" value is assigned.
  * @param {array} books = array of book objects to match against
  * @param {array} searchResults = array of book objects to be assigned shelves
  */
  updateSearchShelves = (books, searchResults) => {
    let shelvedBooks = searchResults.map(book => {
      let bookMatch = books.find(b => b.id === book.id);
      bookMatch ? book.shelf = bookMatch.shelf : book.shelf = "none";
      return book;
    })
    return shelvedBooks;
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

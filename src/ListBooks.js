import React, { Component } from 'react'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onShelfChange: PropTypes.func.isRequired
  }

  render() {
    const { books, onShelfChange } = this.props
    let sortedBooks=books.sort(sortBy('title','authors'))

    return (
      <ol className="books-grid">
        {sortedBooks.map((book) =>
        <li key={ book.id } className='book-list-item'>
          <div className="book">
            <div className="book-top">
              <div className="book-cover"
                style={book.imageLinks ?
                  {
                    width:128,
                    height:192,
                    backgroundImage: `url(${book.imageLinks.smallThumbnail})`}
                  : {}}
              ></div>
              <div className="book-shelf-changer">
                  <select
                    value={book.shelf ? book.shelf : "none"}
                    onChange={(e) => onShelfChange(book,e.target.value)}>
                    <option value="move-to" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
              </div>
            </div>
            <div className="book-title">{ book.title }</div>
            <div className="book-authors">
              { book.authors ? book.authors.join(', ') : '' }
            </div>
          </div>
        </li>
      )}
    </ol>
    )
  }
}

export default ListBooks

/* temporary
<div className="book-shelf-changer">
    <select
      value={book.shelf ? book.shelf : "none"}
      onChange={(e) => onShelfChange(book,e.target.value)}>
      <option value="move-to" disabled>Move to...</option>
      <option value="currentlyReading">Currently Reading</option>
      <option value="wantToRead">Want to Read</option>
      <option value="read">Read</option>
      <option value="none">None</option>
    </select>
</div>
*/

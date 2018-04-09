import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Bookshelf from './Bookshelf'

/**
* @desc SearchBooks presents a text input field for the user to input a search
* query. When this query updates, the onUpdateQuery function updates the main
* BookApp's state for query and searches for books. This updated query and
* searchResults array are then passed back to SearchBooks to render in a
* Bookshelf container.
* @prop {string} query = query text input from user passed from upstream state
* @prop {array} results = array of book objects returned from search query and
* passed from upstream state
* @prop {function} onShelfChange = handles change of state for shelf change
* @prop {funciton} onUpdateQuery = handles change of state for query
*/
class SearchBooks extends Component {
  static propTypes = {
    query: PropTypes.string.isRequired,
    results: PropTypes.array.isRequired,
    onShelfChange: PropTypes.func.isRequired,
    onUpdateQuery: PropTypes.func.isRequired
  }

  render() {
    const { query, results, onShelfChange, onUpdateQuery } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to="/"
            className="close-search"
          >Close</Link>
          <div className="search-books-input-wrapper">
            <input
              className='search-books-input'
              type='text'
              placeholder='Search by title or author'
              value={ query }
              onChange={ (e) => onUpdateQuery(e.target.value) }
            />
          </div>
        </div>
        { (query !== '') && (results.length !== 0) ?
          <div className="search-books-results">
            <Bookshelf
              books={ results }
              title="Search Books"
              onShelfChange={ onShelfChange }
            />
          </div>
        : <div className="search-books-results">No Matching Search Results</div>
        }
      </div>
    )
  }
}

export default SearchBooks

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ListBooks from './ListBooks'

/**
* @desc Bookshelf component creates a bookshelf with appropriate title, passes
* books and onShelfChange to ListBooks to render books and handle shelf changes
* @prop {array} books = array of book objects to be listed for bookshelf
* @prop {string} title = title of bookshelf
* @prop {function} onShelfChange = handles change of state for shelf change
*/
class Bookshelf extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    onShelfChange: PropTypes.func.isRequired
  }

  render() {
    const { books, title, onShelfChange } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{ title }</h2>
        <div className="bookshelf-books">
          <ListBooks
            books={ books }
            onShelfChange={ onShelfChange }
          />
        </div>
      </div>
    )
  }
}

export default Bookshelf

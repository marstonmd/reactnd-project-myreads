import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ListBooks from './ListBooks'

class Bookshelf extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    onShelfChange: PropTypes.func.isRequired
  }

  render() {
    const { books, title, onShelfChange } = this.props

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

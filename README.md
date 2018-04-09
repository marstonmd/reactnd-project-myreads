# MyReads Project

The MyReads project is a bookshelf app that allows you to select and categorize books you have read, are currently reading, or want to read. The app allows searching for new books to add to shelves and provides an API server and client library that you will use to persist information as you interact with the application.

## TL;DR

To get started developing right away:

* clone the project repository from GitHub
* install all project dependencies with `npm install`
* start the development server with `npm start`

## Project File Structure
```bash
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms for you to use with your app.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
│   └── index.html # DO NOT MODIFY
└── src
    ├── App.css # Styles for your app. Feel free to customize this as you desire.
    ├── App.js # This is the root of app. Contains BooksApp component.
    ├── App.test.js # Used for testing. Provided with Create React App. Testing is encouraged, but not required.
    ├── SearchBooks.js # Used for handling searching and returning results from queries. Contains SearchBooks component.
    ├── Bookshelf.js # Used for creating bookshelf container for listing books. Contains Bookshelf component.
    ├── ListBooks.js # Used for sorting and listing books within bookshelves. Contains ListBooks component.
    ├── BooksAPI.js # A JavaScript API for the provided Udacity backend. Instructions for the methods are below.
    ├── icons # Helpful images for your app. Use at your discretion.
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── index.css # Global styles. You probably won't need to change anything here.
    └── index.js # You should not need to modify this file. It is used for DOM rendering only.
```

## BooksApp

App Functionality
In this application, the main page displays a list of "shelves" (i.e. categories), each of which contains a number of books. The three shelves are:

* Currently Reading
* Want to Read
* Read

The homepage of the MyReads App shows the title "MyReads" and then three shelves, which are named "Currently Reading," "Want to Read," and "Read." There are books on each shelf. Each book has a control [green circle] in the bottom right-hand corner that lets you select the shelf for that book. When you select a different shelf, the book moves there. The default value for the control is the current shelf the book is in.

The app also has a button [green plus sign icon] in the bottom right-hand corner that navigates to the search page. The search page has a text input that may be used to find books. As the value of the text input changes, the books that match that query are displayed on the page, along with a control that lets you add the book to your library. Again, each book has a control that lets you select the shelf for that book. Each book in this search page will have either its current shelf assignment if it exists, or will show as "none".

* [`shelfChange`](#shelfchange)
* [`updateQuery`](#updatequery)
* [`updateSearchShelves`](#updatesearchshelves)

### `shelfChange`

Sends API updated shelf for book then sets state for books and searchResults

Method Signature:

```js
shelfChange(book, shelf)
```

* book: `<Object>` whose shelf is being altered
* shelf: `<String>` shelf book is being moved to

### `updateQuery`

This receives an updated query, trims leading whitespaces, and sends non-empty queries to search API. Received books array is matched against state books array for any existing shelf assignments before being set to searchResults state.

Method Signature:

```js
updateQuery(query)
```

* query: `<String>` search term from user input field

### `updateSearchShelves`

searchResults array is mapped against against books array to find any matching book IDs. If a match exists, the searchResults book's shelf is updated to the shelf of the match. Otherwise, a "none" value is assigned.

Method Signature:

```js
updateSearchShelves(books, searchResults)
```

* books: `<Array>` of book objects to match against
* searchResults: `<Array>` of book objects to be assigned shelves
* Returns an array of book objects with shelf property assignments

## SearchBooks

SearchBooks presents a text input field for the user to input a search query. When this query updates, the onUpdateQuery function updates the main BookApp's state for query and searches for books. This updated query and searchResults array are then passed back to SearchBooks to render in a Bookshelf container.

Component Signature:

```js
<SearchBooks query, results, onShelfChange, onUpdateQuery />
```

* query: `<String>` of query text input from user passed from upstream state
* results: `<Array>` of book objects returned from search query and passed from upstream state
* onShelfChange: `<Method>` handles change of state for shelf change
* onUpdateQuery: `<Method>` handles change of state for query

## Bookshelf

Bookshelf component creates a bookshelf with appropriate title, passes books and onShelfChange to ListBooks to render books and handle shelf changes

Component Signature:

```js
<Bookshelf books, title, onShelfChange />
```

* books: `<Array>` of book objects to be listed for bookshelf
* title: `<String>` title of bookshelf
* onShelfChange: `<Method>` handles change of state for shelf change

## ListBooks

ListBooks component renders each book with relevant book parameters and shelf state. Sorts books by title, then author before rendering

Component Signature:

```js
<ListBooks books, onShelfChange />
```

* books: `<Array>` of book objects to be listed for bookshelf
* onShelfChange: `<Method>` handles change of state for shelf change

## Backend Server

Udacity provided a backend server to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`

Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query)
```

* query: `<String>`
* Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Contributing

This repository is the starter code for _all_ Udacity students. Therefore, we most likely will not accept pull requests.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).

# Google Books Search

> Google Books Search is a `MERN` stack app that lets user search for, preview, and save books of interest from *Google Books*

<!-- toc -->

- [Google Books Search](#google-books-search)
  - [Overview](#overview)
  - [Live Demo](#live-demo)
  - [Project Screenshots](#project-screenshots)
  - [Technologies](#technologies)
  - [Documents](#documents)
    - [Instructions](#instructions)
    - [Bonus Live Updates to Saved Books](#bonus-live-updates-to-saved-books)
    - [Hosting on Heroku](#hosting-on-heroku)
  
<!-- tocstop -->

## Overview

**Google Books Search** lets user search for books by title via `Google Books API`, preview search results on *search page*, and save books to *saved page*. All saved books are stored in `MongoDB`, where user also has the option to delete a saved book. 
The app is hosted on `Heroku`, utilizes `Node.js` and `Express` in *server-side* to handle routing and `axios` request from its `React` *client side*.

-----

## Live Demo

Check out [**Google Books Search** app](https://good-books-search.herokuapp.com/) !

-----

## Project Screenshots

| Search (Home) Page |
|    :---:     | 
|Default is set to display current best-selling books.  User can search for books by typing in **title** or **keywords**.
|![search.GIF](client/src/images/search.GIF)|

| View   | Save/Unsave |
|    :---:     |     :---:      |
|Click on **Read more** to view on *Google Books site*|Click on toggle **Save** button to save or unsave a book
| ![preview.GIF](client/src/images/preview.GIF) | ![save.GIF](client/src/images/save.GIF) |

###

| Saved Page |
|    :---:     | 
|Click on **Saved!** button to remove a book from *saved page*.
|![delete.GIF](client/src/images/delete.GIF)|

-----

## Technologies

- React
- Node.js
- Express
- Mongoose
- Bootstrap 4

-----

## Documents

### Instructions

* This application requires at minimum 2 pages, check out the following mockup images for each page:

  * [Search](Search.png) - User can search for books via the Google Books API and render them here. User has the option to "View" a book, bringing them to the book on Google Books, or "Save" a book, saving it to the Mongo database.

  * [Saved](Saved.png) - Renders all books saved to the Mongo database. User has an option to "View" the book, bringing them to the book on Google Books, or "Delete" a book, removing it from the Mongo database.

1. Start by using the 07-Ins_Mern example as a base for your application.

2. Add code to connect to a MongoDB database named `googlebooks` using the mongoose npm package.

3. Using mongoose, then create a Book schema.

4. At a minimum, books should have each of the following fields:

* `title` - Title of the book from the Google Books API

* `authors` - The books's author(s) as returned from the Google Books API

* `description` - The book's description as returned from the Google Books API

* `image` - The Book's thumbnail image as returned from the Google Books API

* `link` - The Book's information link as returned from the Google Books API

* Creating `documents` in your `books` collection similar to the following:

    ```js
    {
      authors: ["Suzanne Collins"]
      description: "Set in a dark vision of the near future, a terrifying reality TV show is taking place. Twelve boys and twelve girls are forced to appear in a live event called The Hunger Games. There is only one rule: kill or be killed. When sixteen-year-old Katniss Everdeen steps forward to take her younger sister's place in the games, she sees it as a death sentence. But Katniss has been close to death before. For her, survival is second nature."
      image: "http://books.google.com/books/content?id=sazytgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
      link: "http://books.google.com/books?id=sazytgAACAAJ&dq=title:The+Hunger+Games&hl=&source=gbs_api"
      title: "The Hunger Games"
    }
    ```

5. Create a layout similar to the mockups displayed above. This should be a SPA (Single Page Application) that uses [`react-router-dom`](https://github.com/reactjs/react-router) to navigate, hide and show your React components without changing the route within Express.

* The layout should include at least two React Components for each page `Search` and `Saved`.

* Feel free to try out alternative CSS framework to Bootstrap.

6. Add the following Express routes for your app:

* `/api/books` (get) - Should return all saved books as JSON.

* `/api/books` (post) - Will be used to save a new book to the database.

* `/api/books/:id` (delete) - Will be used to delete a book from the database by Mongo `_id`.

* `*` (get) - Will load your single HTML page in `client/build/index.html`. Make sure you have this _after_ all other routes are defined.

* Deploy your application to Heroku once complete. **You must use Create React App** and current versions of React and React-Router-Dom for this assignment.

- - -

### Bonus Live Updates to Saved Books

* Use React routing and [socket.io](http://socket.io) to create a notification or a component that triggers whenever a user saves an book. Your message should include the title of the saved book.

  * Say you have multiple browsers open, each one visiting your site. If you save an book in one browser, then all of your browsers should notify you that a new book was saved.

  * [Socket.io NPM package](https://www.npmjs.com/package/socket.io)


### Hosting on Heroku

Now that we have a backend to our applications, we use Heroku for hosting. Please note that while **Heroku is free**, it will request credit card information if you have more than 5 applications at a time or are adding a database.

Please see [Heroku’s Account Verification Information](https://devcenter.heroku.com/articles/account-verification) for more details.
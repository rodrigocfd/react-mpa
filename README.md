# React Multi-Page Application

A proof of concept of a [React](https://reactjs.org/) application using [Webpack](https://webpack.js.org/) to generate a multi-page application (MPA), instead of the ordinary single-page application (SPA).

## Concepts

* Every `FooBar.page.js` will become a static page `fooBar.html`.

* **No** server side rendering. Each HTML page acts like an ordinary small React app.

* **No** router, just standard HTML pages with standard `<a href=""></a>` links for navigation.

* The build can be served by any HTTP server, a Node.js server is **not** needed.

* Both `js` and `jsx` extensions are supported for React component files.

* All CSS files will be parsed as CSS modules.

## Environment

* Run in development mode in `localhost:3000`:

    npm start

* Generate a production build in `build` directory:

    npm run build
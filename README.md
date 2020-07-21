# React Multi-Page Application

A proof of concept of a "no frills" [React](https://reactjs.org/) with application using [Webpack](https://webpack.js.org/) to generate a multi-page application (MPA), instead of the ordinary single-page application (SPA).

## Concepts

* Every `FooBar.page.js` will become a static page `foo-bar.html`, based off `assets/template.html`.

* **No** server side rendering: each HTML page acts like an ordinary small React app.

* **No** router: just standard HTML pages with standard `<a href=""></a>` links for navigation.

* The build can be served by any HTTP server, a Node.js server is **not** needed.

* [TypeScript](https://www.typescriptlang.org) support. Just rename `src` to something else and use `src-TYPESCRIPT` as `src` instead.

* [SASS](https://sass-lang.com) support, with all style files parsed as CSS modules.

## Environment

* Run in development mode in `localhost:3000`:
    * `npm start`

* Generate a production build in `build` directory:
    * Configure `baseUrl` in `production.config.json` to the final path in your web server
    * `npm run build`

## Why not use <insert_tool_here>?

I tried a couple different solutions for React MPA, and they all seemed huge and overengineered for such a simple idea. Also, they worked fine for simple projects, large projects led to headaches.

So I decided to write my own Webpack config with an opinionated file structure, and that's it. If you know Webpack, you can change the config to suit your needs.

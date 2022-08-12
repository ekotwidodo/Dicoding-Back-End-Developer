const bookRouter = require("./book.route");

// Handling multiple routes in the future
// by adding [].concat(bookRouter, userRouter, ...)
module.exports = [].concat(bookRouter);
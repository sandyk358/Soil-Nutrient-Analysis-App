const http = require("http");
const fs = require("fs");
const port = 4000;

const server = http.createServer(async (req, res) => {
  try {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Document</title>
        </head>
        <body>
          <h1>Hello World!!</h1>
        </body>
      </html>`);
  } catch (err) {
    console.log(err);
    throw err;
  }
});

server.listen(port, () => {
  console.log(`server is listening at port ${port}`);
});

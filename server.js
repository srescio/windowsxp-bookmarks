const express = require("express");
const app = express();
const port = 3001;
app.listen(port, () => {
  console.log(`Application started and Listening on port ${port}\ngo to http://localhost:${port}`);
});

app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
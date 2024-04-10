require("dotenv").config();
const port =  process.env.PORT || 3000;

const app = require("./app.js");

app.listen(port, (req, res) => {
  console.log(`the server is running in the port ${port}`);
});

const express = require("express")
const cors = require("cors")
const path = require("path")
const bodyParser = require('body-parser')
const user_route = require("./routes/user")
const expense_route = require("./routes/expense")
const app = express();
const publicPath = path.join(__dirname, 'public');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
const db = require('./util/db.config')
db.sequelize.sync().then(() => {
  console.log("ok report")
}).catch(() => {
  console.log("error")
})
db.customers.hasMany(db.expenses)
db.expenses.belongsTo(db.customers)
app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, 'userlogin.html'));
});
app.get("/exp", (req, res) => {
  res.sendFile(path.join(publicPath, 'Expense.html'));
});

app.get("/new", (req, res) => {
  res.sendFile(path.join(publicPath, 'userregister.html'));
});
app.use("/user", user_route)
app.use("/expense", expense_route)
app.listen(3001);

function front(req,res){
 
}

//drop all the collection of the database
var db = connect('mongodb://localhost/inventory-app');

db.products.drop()
db.users.drop()
db.categories.drop()
// db.reports.drop()


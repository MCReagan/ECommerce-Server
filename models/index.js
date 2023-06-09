// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id',
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: {
    model: ProductTag,
    unique: false
  },
});
// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: {
    model: ProductTag,
  },
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};

// GIVEN a functional Express.js API
// WHEN I add my database name, MySQL username, and MySQL password to an environment variable file
// THEN I am able to connect to a database using Sequelize
// WHEN I enter schema and seed commands
// THEN a development database is created and is seeded with test data
// WHEN I enter the command to invoke the application
// THEN my server is started and the Sequelize models are synced to the MySQL database
// WHEN I open API GET routes in Insomnia for categories, products, or tags
// THEN the data for each of these routes is displayed in a formatted JSON
// WHEN I test API POST, PUT, and DELETE routes in Insomnia
// THEN I am able to successfully create, update, and delete data in my database
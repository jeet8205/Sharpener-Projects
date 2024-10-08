const db = require('../util/database');

const Cart = require('./cart');

module.exports = class Product {
  constructor(id, title, imageURL, description, price) {
    this.id = id;
    this.title = title;
    this.imageURL = imageURL;
    this.description = description;
    this.price = price;
  }

  save() {
    return db.execute('INSERT INTO products (title, imageURL, description, price) VALUES (?, ?, ?, ?)',
      [this.title, this.imageURL, this.description, this.price]
    );
  }

  static deleteById(id) {
    return db.execute('DELETE FROM products WHERE id = ?', [id]);
  }

  static fetchAll() {
    return db.execute('SELECT * FROM products');
  }

  static findById(id) {
    return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
  }
};

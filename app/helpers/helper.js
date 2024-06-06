const Product = require('../models/ProductSchema')
const cron = require('node-cron');
exports.taskSchedular = (io) => {
  cron.schedule('*/1 * * * * *', async () => {
      const threshold = 1;
      const lowStockProducts = await Product.find({ stock: { $lte: threshold } });

      for (let product of lowStockProducts) {
          io.emit('notification', `Product ${product.productName} is running low on stock!`);  
      }
  });
};

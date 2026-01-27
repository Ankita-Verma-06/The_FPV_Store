const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;


app.use(cors());
app.use(express.json());

// Request Logger
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

const authRoutes = require('./routes/authRoutes.js');
const productRoutes = require('./routes/productRoutes.js');
const tutorialRoutes = require('./routes/tutorialRoutes.js');

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/tutorials', tutorialRoutes);

const { createOrder, getUserOrders, getAllOrders, updateOrderStatus } = require('./controllers/orderController.js');
const { submitContactForm, getAllContacts } = require('./controllers/contactController.js');
const { getAllUsers } = require('./controllers/authController.js');
const { protect, admin } = require('./middleware/authMiddleware.js');

app.post('/api/orders', protect, createOrder);
app.get('/api/orders', protect, getUserOrders);
app.get('/api/admin/orders', protect, admin, getAllOrders);
app.patch('/api/admin/orders/:id', protect, admin, updateOrderStatus);
app.get('/api/admin/users', protect, admin, getAllUsers);
app.get('/api/admin/contacts', protect, admin, getAllContacts);
app.post('/api/contact', submitContactForm);

// Basic Route
app.get('/', (req, res) => {
  res.send('FPV Haven API is running');
});

const { errorHandler } = require('./middleware/errorMiddleware.js');

app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

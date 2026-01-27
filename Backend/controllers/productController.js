
const pool = require('../dbConfig.js');

const getProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search;
        const category = req.query.category;
        const minPrice = req.query.minPrice;
        const maxPrice = req.query.maxPrice;
        const sort = req.query.sort;

        const skip = (page - 1) * limit;

        let whereConditions = [];
        let queryParams = [];

        if (search) {
            whereConditions.push('(name LIKE ? OR description LIKE ?)');
            queryParams.push(`%${search}%`, `%${search}%`);
        }

        if (category) {
            whereConditions.push('category = ?');
            queryParams.push(category);
        }

        if (minPrice && maxPrice) {
            whereConditions.push('price BETWEEN ? AND ?');
            queryParams.push(parseFloat(minPrice), parseFloat(maxPrice));
        } else if (minPrice) {
            whereConditions.push('price >= ?');
            queryParams.push(parseFloat(minPrice));
        } else if (maxPrice) {
            whereConditions.push('price <= ?');
            queryParams.push(parseFloat(maxPrice));
        }

        const whereClause = whereConditions.length > 0
            ? 'WHERE ' + whereConditions.join(' AND ')
            : '';

        let orderByClause = 'ORDER BY created_at DESC';
        if (sort) {
            const parts = sort.split(':');
            const field = parts[0];
            const order = parts[1];
            const allowedFields = ['price', 'name', 'rating', 'created_at'];
            if (allowedFields.includes(field)) {
                orderByClause = `ORDER BY ${field} ${order === 'desc' ? 'DESC' : 'ASC'}`;
            }
        }

        const productsQuery = `
            SELECT * FROM products 
            ${whereClause} 
            ${orderByClause} 
            LIMIT ? OFFSET ?
        `;

        const allParams = [...queryParams, limit, skip];

        const [products] = await pool.query(productsQuery, allParams);

        const countQuery = `SELECT COUNT(*) as total FROM products ${whereClause}`;
        const [countResult] = await pool.execute(countQuery, queryParams);
        const total = countResult[0].total;

        res.status(200).json({
            result: products,
            pagination: {
                total: total,
                page: page,
                pages: Math.ceil(total / limit)
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong." });
    }
};

const getProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const [products] = await pool.execute(
            'SELECT * FROM products WHERE id = ?',
            [parseInt(id)]
        );

        if (products.length === 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(products[0]);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
};

const createProduct = async (req, res) => {
    try {
        const name = req.body.name;
        const description = req.body.description;
        const price = req.body.price;
        const category = req.body.category;
        const imageUrl = req.body.imageUrl;
        const stock = req.body.stock;

        const [result] = await pool.execute(
            'INSERT INTO products (name, description, price, category, image_url, stock) VALUES (?, ?, ?, ?, ?, ?)',
            [name, description, parseFloat(price), category, imageUrl, parseInt(stock)]
        );

        const [newProduct] = await pool.execute(
            'SELECT * FROM products WHERE id = ?',
            [result.insertId]
        );

        res.status(201).json(newProduct[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong." });
    }
};

const updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const name = req.body.name;
        const description = req.body.description;
        const price = req.body.price;
        const category = req.body.category;
        const imageUrl = req.body.imageUrl;
        const stock = req.body.stock;

        await pool.execute(
            'UPDATE products SET name = ?, description = ?, price = ?, category = ?, image_url = ?, stock = ? WHERE id = ?',
            [name, description, parseFloat(price), category, imageUrl, parseInt(stock), parseInt(id)]
        );

        const [updatedProduct] = await pool.execute(
            'SELECT * FROM products WHERE id = ?',
            [parseInt(id)]
        );

        res.status(200).json(updatedProduct[0]);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        await pool.execute(
            'DELETE FROM products WHERE id = ?',
            [parseInt(id)]
        );

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
};

module.exports = { getProducts, getProduct, createProduct, updateProduct, deleteProduct };

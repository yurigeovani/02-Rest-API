const {pool} = require('../../database/connection')

const getProducts = async (req, res) => {
    const response = await pool.query(
        `SELECT p.id, p.name, p.description, p.price, c.id, c.name
            FROM products p, categories c
            WHERE p.category_id = c.id`);
    res.status(200).json(response.rows);
}

const getProductById = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('SELECT * FROM PRODUCTS WHERE ID = $1', [id]);

    res.json(response.rows);
}

const createProduct = async(req, res) => {
    const {name, description, price, category_id} = req.body;

    const response = await pool.query(`
            INSERT 
                INTO products 
                    (name, description, price, category_id)
                VALUES
                    ($1, $2, $3, $4)`, [name, description, price, category_id]);

    res.json({
        message: 'Product Added Succesfully',
        body:{
            product: {name, description, price, category_id}
        }
    })
}

const updateProduct = async (req, res) => {
    const id = req.params.id;
    const {name, description, price, category_id} = req.body;

    const response = await pool.query(`
        UPDATE products 
	        SET (name, description, price, updated_at, category_id) 
                = ($1, $2, $3, CURRENT_TIMESTAMP(0)::TIMESTAMP WITHOUT TIME ZONE, $4)
            WHERE ID = ${id}`, [name, description, price, category_id]);

    res.json({
        message: 'Product Updated',
        body:{
            product: {name, description, price, category_id}
        }
    })
}

const deleteProduct = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('DELETE FROM PRODUCTS WHERE ID = $1', [id])
    
    res.json(`User ${id} was deleted!`);

}

module.exports = {
    getProducts,
    getProductById,   
    createProduct,
    updateProduct,
    deleteProduct
}
const {pool} = require('../../database/connection')

const getProducts = async (req, res) => {
    const response = await pool.query(
        `SELECT p.id as PROD_ID,
                p.name as PROD_NAME,
                p.description as PROD_DESC,
                p.price as PROD_PRICE,
                c.id as CAT_ID,
                c.name as CAT_NAME
            FROM products p
            INNER JOIN categories c
            ON p.category_id = c.id`);
    res.status(200).json(response.rows?.map(product => {
        return {
            id: product.prod_id,
            name: product.prod_name,
            description: product.prod_desc,
            price: parseFloat(product.prod_price),
            category: {
                id: product.cat_id,
                name: product.cat_name
            }
        }
    }));
}

const getProductById = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query(
        `SELECT p.id as PROD_ID,
                p.name as PROD_NAME,
                p.description as PROD_DESC,
                p.price as PROD_PRICE,
                c.id as CAT_ID,
                c.name as CAT_NAME
            FROM products p
            INNER JOIN categories c
            ON p.category_id = c.id
            WHERE p.id = $1`, [id]);
    res.json(response.rows?.map(product => {
        return {
            id: product.prod_id,
            name: product.prod_name,
            description: product.prod_desc,
            price: parseFloat(product.prod_price),
            category: {
                id: product.cat_id,
                name: product.cat_name
            }
        }
    }));
}

const createProduct = async(req, res) => {
    const {name, description, price, category_id} = req.body;

    const response = await pool.query(`
            INSERT 
                INTO products 
                    (name, description, price, category_id)
                VALUES
                    ($1, $2, $3, $4)`, [name, description, price, category_id]);

    res.status(201).json({
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
            WHERE ID = $5`, [name, description, price, category_id, id]);

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
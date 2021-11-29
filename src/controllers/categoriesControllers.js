const{pool} = require('../../database/connection')

const get = async(req, res)=>{
    const response = await pool.query('SELECT id, name FROM CATEGORIES');
    res.status(200).json(response.rows);
}

const getById = async(req, res)=>{
    const id = req.params.id;
    const response = await pool.query('SELECT id, name FROM CATEGORIES WHERE ID = $1',[id]);

    res.status(200).json(response.rows);
}

const post = async(req, res)=>{
    const {name} = req.body;

    const response = await pool.query('INSERT INTO CATEGORIES (name) VALUES ($1)',[name]);

    res.json({
        message: 'Category was added succesfully!',
        body: {
            category: {name}
        }
    })
}

const put = async(req,res)=>{
    const id = req.params.id;
    const {name} = req.body;

    const response = await pool.query(
           `UPDATE categories 
	        SET (name, updated_at)
            = ($1,CURRENT_TIMESTAMP(0)::TIMESTAMP WITHOUT TIME ZONE)
            WHERE ID = $2`,[name,id]);
    
    res.json({
        message: 'Category was updated succesfully!',
        body:{
            category: {name}
        }
    })
}

const del = async(req,res)=>{
    const id = req.params.id;

    const response = await pool.query('DELETE FROM CATEGORIES WHERE ID = $1', [id]);

    res.json({
        message: 'Category was deleted succesfully!'
    })
}

module.exports = {
    get,
    getById,
    post,
    put,
    del
}
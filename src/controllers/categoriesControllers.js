const model = require('../models/categories');

const get = async (req, res) =>{
    const response = await model.get();
    res.status(200).json(response);
}

const getById = async(req, res)=>{
    const id = req.params.id;
    const response = await model.getById(id);

    res.status(200).json(response);
}

const post = async(req, res)=>{
    const {name} = req.body;

    const response = await model.post(name);

    res.status(201).json({
        message: 'Category was added succesfully!',
        body: {
            category: {name}
        }
    })
}

const put = async(req,res)=>{
    const id = req.params.id;
    const {name} = req.body;

    const response = await model.put(id, name);
    
    res.status(200).json({
        message: 'Category was updated succesfully!',
        body:{
            category: {name}
        }
    })
}

const del = async(req,res)=>{
    const id = req.params.id;
    const [category] = await model.getById(id);
    
    await model.del(id);

    res.status(200).json({
        message: `Category ${category.name} was deleted succesfully!`
    })
}

module.exports = {
    get,
    getById,
    post,
    put,
    del
}
const { Pool } = require('pg');

new Pool({
    ---------continuar aqui
})

const getProducts = (req, res) => {
    res.send('products');
}

module.exports = {
    getProducts
}
import {
  getProducts,
  getProductById,
  postProduct,
  putProduct,
  deleteProduct,
} from "../models/products.js";

const get = async (req, res) => {
  const response = await getProducts();
  res.status(200).json(
    response?.map((product) => {
      return {
        id: product.prod_id,
        name: product.prod_name,
        description: product.prod_desc,
        price: parseFloat(product.prod_price),
        category: {
          id: product.cat_id,
          name: product.cat_name,
        },
      };
    })
  );
};

const getById = async (req, res) => {
  const id = req.params.id;
  const response = await getProductById(id);
  res.status(200).json(
    response?.map((product) => {
      return {
        id: product.prod_id,
        name: product.prod_name,
        description: product.prod_desc,
        price: parseFloat(product.prod_price),
        category: {
          id: product.cat_id,
          name: product.cat_name,
        },
      };
    })
  );
};

const post = async (req, res) => {
  const { name, description, price, category_id } = req.body;

  const response = await postProduct(name, description, price, category_id);

  res.status(201).json({
    message: "Product Added Succesfully",
    body: {
      product: { name, description, price, category_id },
    },
  });
};

const put = async (req, res) => {
  const id = req.params.id;
  const { name, description, price, category_id } = req.body;

  const response = await putProduct(name, description, price, category_id, id);

  res.status(200).json({
    message: "Product Updated",
    body: {
      product: { name, description, price, category_id },
    },
  });
};

const del = async (req, res) => {
  const id = req.params.id;
  const [product] = await getProductById(id);

  await deleteProduct(id);

  res.status(200).json(`Product ${product.prod_name} was deleted!`);
};

export { get, getById, post, put, del };
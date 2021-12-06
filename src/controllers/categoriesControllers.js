import {
  getCategories,
  getCategoryById,
  postCategory,
  putCategory,
  deleteCategory,
} from "../models/categories.js";

const get = async (req, res) => {
  const response = await getCategories();
  res.status(200).json(response);
};

const getById = async (req, res) => {
  const id = req.params.id;
  const response = await getCategoryById(id);

  res.status(200).json(response);
};

const post = async (req, res) => {
  const { name } = req.body;

  const response = await postCategory(name);

  res.status(201).json({
    message: "Category was added succesfully!",
    body: {
      category: { name },
    },
  });
};

const put = async (req, res) => {
  const id = req.params.id;
  const { name } = req.body;

  const response = await putCategory(id, name);

  res.status(200).json({
    message: "Category was updated succesfully!",
    body: {
      category: { name },
    },
  });
};

const del = async (req, res) => {
  const id = req.params.id;
  const [category] = await getCategoryById(id);

  await deleteCategory(id);

  res.status(200).json({
    message: `Category ${category.name} was deleted succesfully!`,
  });
};

export { get, getById, post, put, del };
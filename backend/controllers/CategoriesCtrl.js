import CategorySchema from '../models/Category.js';

export const getCategories = async (req, res) => {
  try {
    let categories = await CategorySchema.find({}) .limit(20);
    res.status(200).json(categories.map(item => item.name));
  } catch(err) {
    console.log(err);
    res.status(500).json(
      {error: err}
    );
  }
}
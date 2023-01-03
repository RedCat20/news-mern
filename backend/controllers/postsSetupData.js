import ArticleSchema from "../models/Article.js";
import CategorySchema from "../models/Category.js";

const createArticles = async (parsedPost, query) => {

  let categories = await CategorySchema.find();

  let filterOptions = [];

  for (let cat of categories) {
    filterOptions.push(cat.name);
  }

  try {
    const page = parseInt(query.page) - 1 || 0;
    const limit = parseInt(query.limit) || 6;
    const search = query.search || "";

    let sort = query.sort || 'pubDate';
    let filter = query.filter || 'all';

    if (filter.trim() === '') {
      filter = 'all';
    }

    if (filter !== 'all') {
      filter = query.filter.split(',');
    }

    query.sort ?
      (
        sort = query.sort.split(',')
      )
      :
      (
        sort = [sort]
      )

    let sortBy = {};

    if (sort[1]) {
      sortBy[sort[0]] = sort[1];
    } else {
      sortBy[sort[0]] = 'asc';
    }

    const isArticles = await ArticleSchema.countDocuments({}).exec() > 0;

    let currentPosts = [];

    if (!isArticles) {
      await ArticleSchema.create(
        parsedPost.map((post) => ({
          title: post.title[0],
          description: post.description[0],
          link: post.link[0],
          pubDate: post.pubDate[0],
          categories: post.category,
        }))
      );
    }

    if (filter === 'all') {
      currentPosts = (
        await ArticleSchema.find({title: {$regex: search, $options: "i"}})
          .sort(sortBy)
          .skip(page * limit)
          .limit(limit)
      )
    } else {
      currentPosts = (
        await ArticleSchema.find({title: {$regex: search, $options: "i"}})
          .where("categories")
          .in([...filter])
          .sort(sortBy)
          .skip(page * limit)
          .limit(limit)
      )
    }

    let total = 0;

    if (filter !== 'all') {
      total = await ArticleSchema.countDocuments({
        categories: {$in: [...filter]},
        title: { $regex: search, $options: "i"},
      });
    } else {
      total = await ArticleSchema.countDocuments({
        title: { $regex: search, $options: "i"},
      });
    }

    return {
      success: true,
      total: total,
      page: page + 1,
      limit,
      filters: filterOptions,
      currentPosts
    };

  } catch (err) {
    console.log('Can not set articles', err.message);
    return {
      success: false,
      total: 0,
      page: 1,
      limit: 3,
      filters: filterOptions,
      currentPosts: []
    }
  }
}

export const setupCategories = async (msgData) => {
  try {

    const isTwentyCategories = await CategorySchema.countDocuments({}).exec() >= 20;

    if (isTwentyCategories) return;

    let categories = [];
    let counter = 0;

    for (let item of msgData) {
      if (counter === 20)
        break;
      categories.push(...item.category);
      counter++;
    }

    await CategorySchema.create(
      categories.map((category) => ({
       name: category
      }))
    );
  }
  catch (err) {
    console.log('SetupPosts error', err);
  }
}

export const setupPosts = async (query, res, parsedPosts) => {
  try {


    if (!(parsedPosts?.length)) {
      return res.status(200).json({posts: [], total: 0});
    }

    const docArticles = await createArticles(parsedPosts, query);
    return res.status(200).json({posts: docArticles.currentPosts, total: docArticles.total});
  }
  catch (err) {
    console.log('SetupPosts error', err);
  }
}

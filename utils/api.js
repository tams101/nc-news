import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://nc-news-l13l.onrender.com/api",
});

export function getArticles() {
  return newsApi.get(`/articles`).then((res) => {
    return res.data.articles;
  });
}

export function getArticleById(article_id) {
  return newsApi.get(`/articles/${article_id}`)
  .then((res) => {
    return res.data.article
  })
}
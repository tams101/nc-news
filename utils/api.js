import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://nc-news-l13l.onrender.com/api",
});

export function getArticles(topic_name) {
  let articlesURL = `/articles`;

  if (topic_name !== undefined) {
    articlesURL += `?topic=${topic_name}`;
  }

  return newsApi.get(articlesURL).then((res) => {
    return res.data.articles;
  });
}

export function getArticleById(article_id) {
  return newsApi.get(`/articles/${article_id}`).then((res) => {
    return res.data.article;
  });
}

export function getCommentsByArticleId(article_id) {
  return newsApi.get(`/articles/${article_id}/comments`).then((res) => {
    return res.data.comments;
  });
}

export function patchVotesByArticleId(article_id, vote) {
  return newsApi.patch(`/articles/${article_id}`, { inc_votes: vote });
}

export function addCommentByArticleId(article_id, user) {
  return newsApi.post(`/articles/${article_id}/comments`, user).then((res) => {
    return res.data.comment;
  });
}

export function deleteAComment(comment_id) {
  return newsApi.delete(`comments/${comment_id}`);
}

export function getUsers() {
  return newsApi.get("/users").then((res) => {
    return res.data.users;
  });
}

export function getTopics() {
  return newsApi.get("/topics").then((res) => {
    return res.data.topics;
  });
}

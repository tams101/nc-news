import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://nc-news-l13l.onrender.com/api",
});

export function getArticles(topic_name, sort_by, order, p, author) {
  return newsApi.get('/articles', {
    params: {
      topic: topic_name,
      sort_by: sort_by,
      order: order,
      p: p,
      author: author
    }
  }).then((res) => {
    return {articles: res.data.articles, total_count: res.data.total_count};
  });
}

export function postArticle(title, topic, author, body, article_img_url) {
  return newsApi.post('/articles', {
    title,
    topic,
    author,
    body,
    article_img_url
  }).then((res) => {
    return res.data
  })
}

export function getArticleById(article_id) {
  return newsApi.get(`/articles/${article_id}`).then((res) => {
    return res.data.article;
  });
}

export function deleteArticleById(article_id) {
  return newsApi.delete(`articles/${article_id}`)
}

export function getCommentsByArticleId(article_id) {
  return newsApi.get(`/articles/${article_id}/comments`).then((res) => {
    return res.data.comments;
  });
}

export function patchCommentVotesById(comment_id, vote) {
  return newsApi.patch(`/comments/${comment_id}`, { inc_votes: vote });
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

export function addNewTopic(slug, description) {
  return newsApi.post("/topics", {
    slug,
    description
  })
}

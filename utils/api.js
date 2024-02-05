import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://nc-news-l13l.onrender.com/api",
});

export function getArticles() {
  return newsApi.get(`/articles`).then((res) => {
    return res;
  });
}

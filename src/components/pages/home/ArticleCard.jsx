import { Link } from "react-router-dom"

export default function ArticleCard({article}) {
  return (
    <div className="article-list-item">
      <h3 className="article-item-heading">{article.title}</h3>
      <img className="article-item-img" src={article.article_img_url}/>
      <p className="article-item-detail">Author: {article.author}</p>
      <p className="article-item-detail">Topic: {article.topic}</p>
      <Link to={`/articles/${article.article_id}`}><button className="view-article-btn">View Article</button></Link>
    </div>
  )
}
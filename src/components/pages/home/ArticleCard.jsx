import { Link } from "react-router-dom"

export default function ArticleCard({article}) {
  return (
    <article className="article-list-item">
      <img className="article-item-img" src={article.article_img_url} alt={`Image for ${article.title}`}/>
 
      <div className="article-details">
      <h2 className="article-item-heading">{article.title}</h2>
      <p className="article-item-detail">Author: {article.author}</p>
      <p className="article-item-detail">Topic: {article.topic}</p>
      <Link to={`/articles/${article.article_id}`}><button className="read-article-btn">Read Article</button></Link>
      </div>

    </article>
  )
}
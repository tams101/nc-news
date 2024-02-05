import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getArticleById } from "../../../../utils/api"
import CommentsList from "./CommentsList"

export default function SingleArticle() {
  const {article_id} = useParams()

  const [article, setArticle] = useState({})

  useEffect(() => {
    getArticleById(article_id).then((singleArticle) => {
      setArticle(singleArticle)
    })
  }, [article_id])

  const date = new Date(article.created_at)
  const formatDate = date.toUTCString()


  return (
    <div className="single-article-page">
      <section className="single-article-container">
        <h2>{article.title}</h2>
        <img className="single-article-img" src={article.article_img_url}/>
        <p className="single-article-detail">Topic: {article.topic}</p>
        <p className="single-article-detail">Author: {article.author}</p>
        <p>Date posted: {formatDate}</p>
        <p>{article.body}</p>
        <p>Votes: {article.votes}</p>
      </section>

      <section className="comments-container">
        <CommentsList article_id={article_id}/>
      </section>
    </div>
      
    )
}
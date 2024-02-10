import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../../../contexts/UserContext"
import { deleteArticleById } from "../../../../utils/api"

export default function ArticleCard({article}) {
  const [submitted, setSubmitted] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)
  const [error, setError] = useState(null)
  const [inProgress, setInProgress] = useState(false)
  const {loggedInUser: {username}} = useContext(UserContext)

  function handleDeleteArticle() {
    setSubmitted(true)
    setInProgress(true)
    deleteArticleById(article.article_id).then(() => {
      setIsDeleted(true)
      setInProgress(false)
      setError(null)
    }).catch((err) => {
      setError('Your article could not be deleted.')
      setIsDeleted(false)
      setSubmitted(false)
      setInProgress(false)
    })
  }

  if (inProgress) return <p>Your article is being deleted...</p>
  if (isDeleted) return <p className="delete-item-confirmation">Your article "{article.title}" was removed.</p>

  return (
    <article className="article-list-item">
      <img className="article-item-img" src={article.article_img_url} alt={`Image for ${article.title}`}/>
 
      <div className="article-details">
      <h2 className="article-item-heading">{article.title}</h2>
      <p className="article-item-detail">Author: {article.author}</p>
      <p className="article-item-detail">Topic: {article.topic}</p>
      <Link to={`/articles/${article.article_id}`}><button className="read-article-btn">Read Article</button></Link>
      {username === article.author ? <button className="delete-article-btn" onClick={handleDeleteArticle} disabled={submitted}>Delete Article</button> : null}
      {error && <p className="error">{error}</p>}
      </div>

    </article>
  )
}
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getArticleById, patchVotesByArticleId } from "../../../../utils/api"
import CommentsList from "./CommentsList"
import CommentForm from "./CommentForm"

export default function SingleArticle() {
  const {article_id} = useParams()

  const [article, setArticle] = useState({})
  const [votes, setVotes] = useState(0)
  const [comments, setComments] = useState([])
  const [fetchError, setFetchError] = useState(null)
  const [voteError, setVoteError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getArticleById(article_id).then((singleArticle) => {
      setArticle(singleArticle)
      setVotes(singleArticle.votes)
      setIsLoading(false)
      setFetchError(null)
    }).catch((err) => {
      setFetchError('Error fetching article')
      setIsLoading(false)
    })
  }, [article_id])

  function handleClick(e) {
    const vote = +e.target.value
    patchVotesByArticleId(article_id, vote).then(() => {
      setVoteError(null)
    }).catch((err) => {
      setVotes((currentVotes) => {
        return currentVotes - vote
      })
      setVoteError("Voting not available. Please try again later.")
    })

    setVotes((currentVotes) => {
        return currentVotes + vote
    })
  }

  if (isLoading) return <p>Loading article...</p>
  if(fetchError) return <p>{fetchError}</p>
  if(voteError) return <p>{voteError}</p>

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
        <p>Votes: {votes}</p>
        <button onClick={handleClick} value={1}>Upvote</button>
        <button onClick={handleClick} value={-1}>Downvote</button>
      </section>

      <section className="comments-container">
        <CommentForm setComments={setComments} article_id={article_id}/>
        <CommentsList article_id={article_id} setComments={setComments} comments={comments}/>
      </section>
    </div>
      
    )
}
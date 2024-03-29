import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getArticleById, patchVotesByArticleId } from "../../../../utils/api"
import CommentsList from "./CommentsList"
import CommentForm from "./CommentForm"
import ErrorComponent from "../../ErrorComponent"

export default function SingleArticle() {
  const {article_id} = useParams()

  const [article, setArticle] = useState({})
  const [votes, setVotes] = useState(0)
  const [comments, setComments] = useState([])
  const [fetchError, setFetchError] = useState(null)
  const [voteError, setVoteError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [disableBtn, setDisableBtn] = useState(false)
  const [hasVoted, setHasVoted] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    getArticleById(article_id).then((singleArticle) => {
      setArticle(singleArticle)
      setVotes(singleArticle.votes)
      setIsLoading(false)
      setFetchError(null)
    }).catch((err) => {
      if(err.code === 'ERR_NETWORK') {
        setError({status: 'Network Error', msg: 'Please check your internet connection.'})
      } else {
        const errorMsg = err.response.data.msg
        const errorCode = err.response.status
        setFetchError({status: errorCode, msg: errorMsg})
      }
      setIsLoading(false)
    })
  }, [article_id])

  function handleClick(e) {
    const vote = +e.target.value
    setDisableBtn(true)
    patchVotesByArticleId(article_id, vote).then(() => {
      setVoteError(null)
    }).catch((err) => {
      setVotes((currentVotes) => {
        return currentVotes - vote
      })
      setVoteError("Voting not available. Please try again later.")
      setDisableBtn(false)
      setHasVoted((hasVoted) => !hasVoted)
    })
    setHasVoted((hasVoted) => !hasVoted)
    setVotes((currentVotes) => {
        return currentVotes + vote
    })
  }

  if (isLoading) return <p className="loading-msg">Loading article...</p>
  if(fetchError) return <ErrorComponent err={fetchError}/>
  if(error) return <ErrorComponent err={error}/>
  if(voteError) return <p className="error">{voteError}</p>

  const date = new Date(article.created_at)
  const formatDate = date.toUTCString()

  return (
    <section className="single-article-page">
      <article className="single-article-container">
        <h2>{article.title}</h2>
        <img className="single-article-img" src={article.article_img_url} alt={`Image for ${article.title}`}/>
        <div className="single-article-details">
          <p className="single-article-detail">Topic: {article.topic}</p>
          <p className="single-article-detail">Author: {article.author}</p>
          <p className="single-article-detail">{formatDate}</p>

        </div>
        <p className="single-article-body">{article.body}</p>
        <p id="article-votes">Votes: {votes}</p>
        <div className="article-vote-container">
        <button className="vote-btn" onClick={handleClick} value={1} disabled={disableBtn} aria-label="upvote-article">&#8593; +1</button>
        <button className="vote-btn" onClick={handleClick} value={-1} disabled={disableBtn} aria-label="downvote-article">&#8595; -1</button>
        {hasVoted && <p>Thanks for voting!</p>}

        </div>
      </article>

      <article className="comments-container">
        <CommentForm setComments={setComments} article_id={article_id}/>
        <CommentsList article_id={article_id} setComments={setComments} comments={comments}/>
      </article>
    </section>
      
    )
}
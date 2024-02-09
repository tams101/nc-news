import { useState, useContext } from "react"
import UserContext from "../../../contexts/UserContext"
import { deleteAComment, patchCommentVotesById } from "../../../../utils/api"

export default function CommentCard({comment}) {
  const date = new Date(comment.created_at)
  const formatDate = date.toUTCString()
  const {loggedInUser} = useContext(UserContext)

  const [submitted, setSubmitted] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)
  const [error, setError] = useState(null)
  const [inProgress, setInProgress] = useState(false)
  const [votes, setVotes] = useState(comment.votes)
  const [voteError, setVoteError] = useState(null)
  const [disableBtn, setDisableBtn] = useState(false)

  function handleDelete() {
    setSubmitted(true)
    setInProgress(true)
    deleteAComment(comment.comment_id).then((res) => {
      setIsDeleted(true)
      setInProgress(false)
      setError(null)
      
    }).catch((err) => {
        setError('Your comment could not be deleted.')
        setIsDeleted(false)
        setSubmitted(false)
        setInProgress(false)
    })
  }

  function handleClick(e) {
    const vote = +e.target.value
    setDisableBtn(true)
    patchCommentVotesById(comment.comment_id, vote).then(() => {
      setVoteError(null)
    }).catch((err) => {
      setVotes((currVotes) => {
        return currVotes - vote
      })
      setVoteError("Voting not available. Please try again later.")
      setDisableBtn(false)
    })
    setVotes((currVotes) => {
      return currVotes + vote
    })
  }

  if (inProgress) return <p>Your comment is being deleted...</p>
  if (isDeleted) return <p>Your comment was removed.</p>

  return (

      <div className="comment-list-item">
        <p className="comment-author">{comment.author}</p>
        <p className="comment-date">{formatDate}</p>
        <p className="comment-body">{comment.body}</p>
        <p className="comment-votes">Votes: {votes}</p>
        <div className="comment-vote-container">
        <button className="comment-vote-btn" id="comment-upvote-btn" onClick={handleClick} value={1} aria-label="comment-upvote" disabled={disableBtn}>&#8593; +1</button>
        <button className="comment-vote-btn" id="comment-downvote-btn" onClick={handleClick} value={-1} aria-label="comment-downvote" disabled={disableBtn}>&#8595; -1</button>
        {voteError && <p className="error">{voteError}</p>}
        </div>
        {loggedInUser.username === comment.author ? <button onClick={handleDelete}disabled={submitted} className="delete-comment-btn">Delete</button> : null}
        {error && <p class="error">{error}</p>}
    </div>
    
  )
}
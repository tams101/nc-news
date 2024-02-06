import { useState, useContext } from "react"
import UserContext from "../../../contexts/UserContext"
import { deleteAComment } from "../../../../utils/api"

export default function CommentCard({comment}) {
  const date = new Date(comment.created_at)
  const formatDate = date.toUTCString()
  const {loggedInUser} = useContext(UserContext)

  const [submitted, setSubmitted] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)
  const [error, setError] = useState(null)
  const [inProgress, setInProgress] = useState(false)

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

  if (inProgress) return <p>Your comment is being deleted...</p>
  if (isDeleted) return <p>Your comment was removed.</p>

  return (

      <div className="comment-list-item">
      <p>{comment.author}</p>
      <p>{comment.body}</p>
      <p>{formatDate}</p>
      <p>Votes: {comment.votes}</p>
      {loggedInUser.username === comment.author ? <button onClick={handleDelete}disabled={submitted}>Delete</button> : null}
      {error && <p>Your comment could not be deleted.</p>}
    </div>
    
  )
}
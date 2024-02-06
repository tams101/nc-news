import { useState, useEffect } from "react"
import { getCommentsByArticleId } from "../../../../utils/api"
import CommentCard from "./CommentCard"

export default function CommentsList({article_id, setComments, comments}) {
  const [error, setError] = useState(null)
  const [loading, setIsLoading] = useState(true)

  useEffect(() => {
    getCommentsByArticleId(article_id).then((allComments) => {
      setComments(allComments)
      setIsLoading(false)
      setError(null)
    }).catch((err) => {
      setError('Comments could not be retrieved.')
      setIsLoading(false)
    })
  },  [])

  if(loading) return <p>Loading comments...</p>
  if(error) return <p>{error}</p>

  return (
    <div className="comments-list-container">
      <h3>Comments</h3>
      {comments.map((comment) => {
        return <CommentCard comment={comment} key={comment.comment_id} setComments={setComments}/>
      })}
    </div>
    )
}
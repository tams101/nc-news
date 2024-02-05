import { useState, useEffect } from "react"
import { getCommentsByArticleId } from "../../../../utils/api"
import CommentCard from "./CommentCard"

export default function CommentsList({article_id}) {

  const [comments, setComments] = useState([])

  useEffect(() => {
    getCommentsByArticleId(article_id).then((allComments) => {
      setComments(allComments)
    })
  },  [article_id])

  return (
    <div className="comments-list-container">
      <h3>Comments</h3>
      {comments.map((comment) => {
        return <CommentCard comment={comment} key={comment.comment_id}/>
      })}
    </div>
    )
}
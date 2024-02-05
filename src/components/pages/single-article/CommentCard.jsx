export default function CommentCard({comment}) {
  const date = new Date(comment.created_at)
  const formatDate = date.toUTCString()

  return (
    <div className="comment-list-item">
      <p>{comment.author}</p>
      <p>{comment.body}</p>
      <p>{formatDate}</p>
      <p>Votes: {comment.votes}</p>
    </div>
  )
}
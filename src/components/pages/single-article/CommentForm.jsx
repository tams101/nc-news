import { useContext, useState } from "react";
import { addCommentByArticleId } from "../../../../utils/api";
import UserContext from "../../../contexts/UserContext";

export default function CommentForm({ article_id, setComments }) {
  const { loggedInUser } = useContext(UserContext);
  const [newComment, setNewComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [error, setError] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    setNewComment("");
    setIsPosting(true);
    addCommentByArticleId(article_id, {
      username: loggedInUser.username,
      body: newComment,
    })
      .then((addedComment) => {
        setSubmitted(true);
        setError(null);
        setIsPosting(false);
        setComments((currentComments) => {
          return [addedComment, ...currentComments];
        });
        setTimeout(() => {
          setSubmitted(false)
        }, 4000)
      })
      .catch((err) => {
        setError("Comment could not be posted. Try again later.");
        setSubmitted(false)
        setIsPosting(false)
      });


  }

  function handleCommentChange(e) {
    setNewComment(e.target.value);
  }

  return (
    <section className="comment-form">
      <form method="post" onSubmit={handleSubmit}>
        <label htmlFor="add-comment">Add a comment:</label>
        <textarea
          id="add-comment"
          name="add-comment"
          rows={8}
          cols={42}
          value={newComment}
          onChange={handleCommentChange}
          disabled={submitted}
        ></textarea>
        {newComment.length > 0 && newComment.length < 4 && <p className="add-comment-error">Your comment must be more than 3 characters long</p>}
        <button id="submit-comment-btn"type="submit" disabled={newComment.length < 4}>
          Submit Comment
        </button>
        {isPosting && <p>Your comment is being added...</p>}
        {submitted && <p>Your comment has been posted!</p>}
        {error && <p className="error">{error}</p>}
      </form>
    </section>
  );
}

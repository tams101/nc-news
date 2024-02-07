import { Link } from "react-router-dom";

export default function ErrorComponent({err}) {
  return (
    <div className="error-container">
      <h2>Something went wrong...</h2>
      <p>{err.status}: {err.msg}</p>
      <p>Go to the <Link to="/">homepage</Link></p>
    </div>
  )
}
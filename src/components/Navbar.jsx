import { useContext } from "react"
import { Link } from "react-router-dom"
import UserContext from "../contexts/UserContext"

export default function Navbar() {
  const {loggedInUser} = useContext(UserContext)

  return (
    <header>
    <h1>NC News</h1>
    <nav>
      <ul className="nav-items">
        <li>Hello, {loggedInUser.username}!</li>
        <li><Link to={`/profile/${loggedInUser.username}`}>My Profile</Link></li>
        <li><Link to="/">Home</Link></li> 
        <li><Link to="change-user">Change User</Link></li>
        <li><Link to="add_article">Add Article</Link></li>
      </ul>
    </nav>
    </header>
  )
}
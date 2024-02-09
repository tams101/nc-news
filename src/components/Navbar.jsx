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
        <Link to={`/profile/${loggedInUser.username}`}><li>My Profile</li></Link>
        <Link to="/"><li>Home</li></Link> 
        <Link to="change-user"><li>Change User</li></Link>
      </ul>
    </nav>
    </header>
  )
}
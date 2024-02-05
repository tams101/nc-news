import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <header>
    <h1>NC News</h1>
    <nav>
      <ul className="nav-items">
       <Link to="/"><li>Home</li></Link> 
        <li>Current User</li>
        <li>Switch User</li>
      </ul>
    </nav>
    </header>
  )
}
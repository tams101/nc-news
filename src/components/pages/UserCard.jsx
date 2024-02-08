import { useContext } from "react"
import UserContext from "../../contexts/UserContext"

export default function UserCard({user}) {
  const {loggedInUser, setLoggedInUser} = useContext(UserContext)

  return (
    <div className="user-card">
    <h3>{user.username}</h3>
    <img src={user.avatar_url} className="avatar"
    alt={`avatar for user ${user.username}`}
    />
    {user.username !== loggedInUser.username ? 
    (<button onClick={() => {
      setLoggedInUser(user)
    }}>Login</button>) : <p>You are currently logged in</p>}
    </div>
  )
  
}
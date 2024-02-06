import { useContext } from "react"
import UserContext from "../../contexts/UserContext"

export default function CurrentUser() {

  const {loggedInUser} = useContext(UserContext)

  return (
    <main className="current-user">
      <h2>My Profile</h2>
      <h3>{loggedInUser.username}</h3>
      <h4>{loggedInUser.name}</h4>
      <img src={loggedInUser.avatar_url} className="avatar"/>
    </main>
    )
}
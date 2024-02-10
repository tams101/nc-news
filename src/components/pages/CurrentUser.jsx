import { useContext } from "react"
import { UserContext } from "../../contexts/UserContext"

export default function CurrentUser() {

  const {loggedInUser} = useContext(UserContext)

  return (
    <section className="current-user">
      <h2>My Profile</h2>
      <p>{loggedInUser.username}</p>
      <p>{loggedInUser.name}</p>
      <img src={loggedInUser.avatar_url} className="current-user-avatar"/>
    </section>
    )
}
import { useState, useEffect } from "react";
import UserCard from "./UserCard";
import { getUsers } from "../../../utils/api";
import ErrorComponent from "../ErrorComponent";
export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getUsers().then((usersData) => {
      setUsers(usersData)
      setIsLoading(false)
      setError(null)
    }).catch((err) => {
      if(err.code === 'ERR_NETWORK') {
        setError({status: 'Network Error', msg: 'Please check your internet connection.'})
      } else {
        setError({status: 500, msg:'Users could not be retrieved.'})
      }
      setIsLoading(false)
    })
  }, [])

  if(isLoading) return <p>Loading users...</p>
  if(error) return <ErrorComponent err={error}/>

  return (
    <section className="change-user-container">
      <h2>Change User</h2>
      <ul>
        {users.map((user) => {
          return (
              <UserCard user={user} key={user.username} />
          )
        })}
      </ul>
    </section>
  )
}
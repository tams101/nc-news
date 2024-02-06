import { useState, useEffect } from "react";
import UserCard from "./UserCard";
import { getUsers } from "../../../utils/api";
export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then((usersData) => {
      setUsers(usersData)
    })
  }, [])

  return (
    <main>
      <h2>Change User</h2>
      <ul>
        {users.map((user) => {
          return (
              <UserCard user={user} key={user.username} />
          )
        })}
      </ul>
    </main>
  )
}
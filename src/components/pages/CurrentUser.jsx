import { useContext, useState, useEffect } from "react"
import { UserContext } from "../../contexts/UserContext"
import { useSearchParams } from "react-router-dom"
import { getArticles } from "../../../utils/api"
import ArticleCard from "./home/ArticleCard"

export default function CurrentUser() {
  const {loggedInUser} = useContext(UserContext)

  const [articlesByUser, setArticlesByUser] = useState([])


  useEffect(() => {
    getArticles("", "created_at", "desc", "1", loggedInUser.username).then(({articles}) => {
      console.log(articles)
      setArticlesByUser(articles)
    })
  }, [])

  

  return (
    <div className="current-user-container">
    <section className="current-user">
      <h2>My Profile</h2>
      <p>{loggedInUser.username}</p>
      <p>{loggedInUser.name}</p>
      <img src={loggedInUser.avatar_url} className="current-user-avatar"/>
    </section>

    <section className="current-user-articles">
      <h2>My Articles</h2>
      <section className="articles-list-container">
        {articlesByUser.map((article) => {
          return <ArticleCard article={article} key={article.article_id} />;
        })}
      </section>
    </section>

    </div>
    )
}
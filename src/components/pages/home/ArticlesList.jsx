import { getArticles } from "../../../../utils/api";
import { useState, useEffect } from "react";
import ArticleCard from "./ArticleCard";

export default function ArticlesList() {
  const [articles, setArticles] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getArticles().then(({data}) => {
      setArticles(data.articles)
      setIsLoading(false)
    }).catch((err) => {
      setError('Error fetching data');
      setIsLoading(false)
    })
  }, [])

  if (isLoading) return <p>Loading articles...</p>

  if (error) return <p>{error}</p>

  return (
    <div className="articles-list-container">
        {articles.map((article) => {
            return <ArticleCard article={article} key={article.article_id}/>
        })}
    </div>
  )
}
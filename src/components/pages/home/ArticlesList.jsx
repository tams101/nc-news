import { getArticles } from "../../../../utils/api";
import { useState, useEffect } from "react";
import ArticleCard from "./ArticleCard";
import Topics from "./Topics";
import { useParams } from "react-router-dom";

export default function ArticlesList() {
  const [articles, setArticles] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const {topic_name} = useParams()

  useEffect(() => {
    getArticles(topic_name).then((articles) => {
      setArticles(articles)
      setIsLoading(false)
      setError(null)
    }).catch((err) => {
      setError('Error fetching data');
      setIsLoading(false)
    })
  }, [topic_name])

  if (isLoading) return <p>Loading articles...</p>

  if (error) return <p>{error}</p>

  return (
    <div className="articles-list-container">
     <Topics />
        {articles.map((article) => {
            return <ArticleCard article={article} key={article.article_id}/>
        })}
    </div>
  )
}
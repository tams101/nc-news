import { getArticles } from "../../../../utils/api";
import { useState, useEffect } from "react";
import ArticleCard from "./ArticleCard";
import Topics from "./Topics";
import { useParams, useSearchParams } from "react-router-dom";
import SortBy from "./SortBy";
import ErrorComponent from "../../ErrorComponent";

export default function ArticlesList() {
  const [articles, setArticles] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const {topic_name} = useParams()
  const [searchParams, setSearchParams] = useSearchParams({
    sort_by: "created_at",
    order: "desc"
  })

  const sort_by = searchParams.get('sort_by')
  const order = searchParams.get('order')

  useEffect(() => {
    getArticles(topic_name, sort_by, order).then((articles) => {
      setArticles(articles)
      setIsLoading(false)
      setError(null)
    }).catch((err) => {
      if(err.code === 'ERR_NETWORK') {
        setError({status: 'Network Error', msg: 'Please check your internet connection.'})
      } else {
        const errorMsg = err.response.data.msg
        const errorCode = err.response.status
        setError({status: errorCode, msg: errorMsg});
      }
      setIsLoading(false)
    })
  }, [topic_name, sort_by, order])

  if (isLoading) return <p>Loading articles...</p>

  if (error) return <ErrorComponent err={error}/>

  return (
    <section>
     <Topics  />
     <SortBy setSearchParams={setSearchParams}/>
    <div className="articles-list-container">
        {articles.map((article) => {
            return <ArticleCard article={article} key={article.article_id}/>
        })}
    </div>
    </section>
  )
}
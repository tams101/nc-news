import { useEffect, useState } from "react"
import { getTopics } from "../../../../utils/api"
import { useNavigate } from "react-router-dom"
export default function Topics() {
  const [topics, setTopics] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    getTopics().then((allTopics) => {
      setTopics(allTopics)
      setIsLoading(false)
      setError(null)
    }).catch((err) => {
      setIsLoading(false)
      setError('-Topics could not be retrieved-')
    })
  }, [])


  function handleTopicChange(e) {
    if (e.target.value !== '') {
      navigate(`/topic/${e.target.value}`)

    }
  }

  return (
    <div className="topic-selector-container">
      <form className="topic-selector-form">
      <label htmlFor="topic-selector">Choose a topic:</label>
     <select id="topic-selector" onChange={handleTopicChange}>
        {!isLoading && error ? <option value="" disabled="true" className="error">{error}</option> : <option value="">-Select a topic-</option>}
        {isLoading ? (<option value="">Loading topics...</option>) : topics.map((topic) => {
          return <option key={topic.slug} value={topic.slug}>{topic.slug}</option>
        })}
        {}
      </select>
    </form>
    </div>
    
  )
}
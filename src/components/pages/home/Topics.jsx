import { useEffect, useState } from "react"
import { getTopics } from "../../../../utils/api"
import { Link } from "react-router-dom"
export default function Topics() {
  const [topics, setTopics] = useState([])
  const [selectedTopic, setSelectedTopic] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getTopics().then((allTopics) => {
      setTopics(allTopics)
      setIsLoading(false)
      setError(null)
    }).catch((err) => {
      setIsLoading(false)
      setError('Error fetching topics')
    })
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    setSelectedTopic('')
  }

  return (
    <div className="topic-selector-container">
      <form onSubmit={handleSubmit} className="topic-selector-form">
      <label htmlFor="topic-selector">Choose a topic:</label>
     <select id="topic-selector" value={selectedTopic} onChange={e => setSelectedTopic(e.target.value)}>
        {!isLoading && <option value="">Select an option</option>}
        {isLoading ? (<option value="">Loading topics...</option>) : topics.map((topic) => {
          return <option key={topic.slug} value={topic.slug}>{topic.slug}</option>
        })}
        {}
      </select>
      {selectedTopic && <Link to={`/topic/${selectedTopic}`}><button className="topic-selector-btn">View {selectedTopic} articles</button></Link>}
    </form>
    </div>
    
  )
}
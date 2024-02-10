import { useEffect, useState } from "react"
import { getTopics } from "../../../../utils/api"
import { useNavigate } from "react-router-dom"
export default function Topics({topics, setTopics, topicsLoading, topicsError}) {
  
  
  const navigate = useNavigate()

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
        {!topicsLoading && topicsError ? <option value="" disabled="true" className="error">{topicsError}</option> : <option value="">-Select a topic-</option>}
        {topicsLoading ? (<option value="">Loading topics...</option>) : topics.map((topic) => {
          return <option key={topic.slug} value={topic.slug}>{topic.slug}</option>
        })}
      </select>
    </form>
    </div>
    
  )
}
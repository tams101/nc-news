import './App.css'
import { Route, Routes } from 'react-router-dom'

import Navbar from './components/Navbar'
import ArticlesList from './components/pages/home/ArticlesList'
import SingleArticle from './components/pages/single-article/SingleArticle'
import UserContext from './contexts/UserContext'
import { useState, useEffect } from 'react'
import ChangeUser from './components/pages/ChangeUser'
import CurrentUser from './components/pages/CurrentUser'
import NotFound from './components/NotFound'
import AddArticle from './components/pages/AddArticle'
import { getTopics } from '../utils/api'

function App() {
  const [loggedInUser, setLoggedInUser] = useState({
    username: "tickle122",
    name: "Tom Tickle",
    avatar_url: "https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953"
  })

  const [topics, setTopics] = useState([])
  const [topicsLoading, setTopicsLoading] = useState(true)
  const [topicsError, setTopicsError] = useState(null)

  useEffect(() => {
    getTopics().then((allTopics) => {
      setTopics(allTopics)
      setTopicsLoading(false)
      setTopicsError(null)
    }).catch((err) => {
      setTopicsLoading(false)
      setTopicsError('-Topics could not be retrieved-')
    })
  }, [])

  return (
    <div className='app-container'>
      <UserContext.Provider value={{loggedInUser, setLoggedInUser}}>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<ArticlesList topics={topics} setTopics={setTopics} topicsError={topicsError} topicsLoading={topicsLoading} />} />
          <Route path="/articles/:article_id" element={<SingleArticle />} />
          <Route path="/add_article" element={<AddArticle topics={topics} setTopics={setTopics} />} />
          <Route path="/profile/:username" element={<CurrentUser/>} />
          <Route path="/change-user" element={<ChangeUser/>} />
          <Route path="/topic/:topic_name" element={<ArticlesList topics={topics} setTopics={setTopics} topicsError={topicsError} topicsLoading={topicsLoading} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      </UserContext.Provider>
    </div>
  )
}

export default App

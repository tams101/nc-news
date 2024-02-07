import './App.css'
import { Route, Routes } from 'react-router-dom'

import Navbar from './components/Navbar'
import ArticlesList from './components/pages/home/ArticlesList'
import SingleArticle from './components/pages/single-article/SingleArticle'
import UserContext from './contexts/UserContext'
import { useState } from 'react'
import ChangeUser from './components/pages/ChangeUser'
import CurrentUser from './components/pages/CurrentUser'
import NotFound from './components/NotFound'

function App() {
  const [loggedInUser, setLoggedInUser] = useState({
    username: "tickle122",
    name: "Tom Tickle",
    avatar_url: "https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953"
  })

  return (
    <div className='app-container'>
      <UserContext.Provider value={{loggedInUser, setLoggedInUser}}>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<ArticlesList />} />
          <Route path="/articles/:article_id" element={<SingleArticle />} />
          <Route path="/profile/:username" element={<CurrentUser/>} />
          <Route path="/change-user" element={<ChangeUser/>} />
          <Route path="/topic/:topic_name" element={<ArticlesList />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      </UserContext.Provider>
    </div>
  )
}

export default App

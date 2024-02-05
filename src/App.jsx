import './App.css'
import { Route, Routes } from 'react-router-dom'

import Navbar from './components/Navbar'
import ArticlesList from './components/pages/home/ArticlesList'
import SingleArticle from './components/pages/single-article/SingleArticle'

function App() {
  return (
    <div className='app-container'>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<ArticlesList />} />
          <Route path="/articles/:article_id" element={<SingleArticle />} />
        </Routes>
      </main>
    </div>
  )
}

export default App

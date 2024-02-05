import './App.css'
import Navbar from './components/Navbar'
import ArticlesList from './components/pages/home/ArticlesList'
import { Route, Routes } from 'react-router-dom'
function App() {
  return (
    <div className='app-container'>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<ArticlesList />} />
        </Routes>
      </main>
    </div>
  )
}

export default App

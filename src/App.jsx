import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import PhonePage from './pages/PhonePage'
import Page404 from './pages/Page404'
import ShoppingCartPage from './pages/ShoppingCartPage'


function App() {
  return (    
      <Router basename={import.meta.env.BASE_URL}>        
          <Navbar />          
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/phones/:id' element={<PhonePage />} />
            <Route path='/shoping-cart' element={<ShoppingCartPage />} />
            <Route path='*' element={<Page404 />} />
          </Routes>        
      </Router>      
  )
}

export default App

import { HashRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { Home, Login, ProductsDetail, Purchases } from './pages'
import { LoadingScreen, NavBar } from './components'
import { useSelector } from 'react-redux'
import { Container } from 'react-bootstrap'

function App() {

  const isLoading = useSelector(state => state.isLoading)

  return (
    <HashRouter>
      <NavBar />
      {isLoading && <LoadingScreen />}
      <Container>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/product/:id' element={<ProductsDetail />} />
          <Route path='/purchases' element={<Purchases />} />
        </Routes>
      </Container>
    </HashRouter>
  )
}

export default App

import { Routes, Route } from "react-router-dom"
import { Container } from "react-bootstrap"
import { Home } from "./pages/Home"
import { Store } from "./pages/Store"
import { About } from "./pages/About"
import { Navbar } from "./components/Navbar"
import { ShoppingContextProvider } from "./contexts/ShoppingContext"

function App() {
  

  return (
    
    <ShoppingContextProvider>

   
    <Navbar/>
    <Container>
    <Routes>
      <Route path='/'element={<Home/>}>Home</Route>
      <Route path="/about"element={<About/>}>About</Route>
      <Route path='/store'element={<Store/>}>Store</Route>
    </Routes>

    </Container>
    </ShoppingContextProvider>
   
     

   
  )
}

export default App

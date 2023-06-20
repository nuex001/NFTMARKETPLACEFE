import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import './App.css'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from "./components/pages/Home";
import ScrollToTop from "./components/ScrollToTop"
import Collections from "./components/pages/Collections";
import VeiwPage from "./components/pages/VeiwPage";
import Create from "./components/pages/Create";
import MyNft from "./components/pages/MyNft";
function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <div className="container">
      <Nav />
      <ScrollToTop/>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/collection/*" element={<Collections/>} />
        <Route exact path="/view/:id" element={<VeiwPage/>} />
        <Route exact path="/mynft" element={<MyNft/>} />
        <Route exact path="/create" element={<Create/>} />
      </Routes>
      <Footer />
    </div>
  </BrowserRouter>
  )
}

export default App


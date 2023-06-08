import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import './App.css'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from "./components/pages/Home";

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <div className="container">
      <Nav />
      {/* <ScrollToTop/> */}
      <Routes>
        <Route exact path="/" element={<Home />} />
        {/* <Route exact path="/contact" element={<Contact />} /> */}
        {/* <Route exact path="/about" element={<About />} /> */}
        {/* <Route exact path="/roadmap" element={<RoadMap />} /> */}
        {/* <Route exact path="/service" element={<Services />} /> */}
      </Routes>
      <Footer />
    </div>
  </BrowserRouter>
  )
}

export default App

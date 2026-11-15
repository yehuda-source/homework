import { useState } from 'react'
import Address from './Address.jsx';
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Address street = "10 Main street" city = "Lakewood" state = "NJ" zip = "08701"></Address>
    </>
  )
}

export default App

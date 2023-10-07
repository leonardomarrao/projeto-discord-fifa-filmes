import { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Outlet/>
      </LocalizationProvider>
      
      
    </div>
  )
}

export default App

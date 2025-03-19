import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import  Layout  from './Layout/Layout'
import { RouteIndex } from './Helpers/RouteNames'
import Index from './Pages/Index'
function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route path={RouteIndex} element={<Layout/>}>
            <Route index element={<Index/>}></Route>
          </Route>
        </Routes>
     </BrowserRouter>
  )
}

export default App

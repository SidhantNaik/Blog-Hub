import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import  Layout  from './Layout/Layout'
import { RouteIndex, RouteSignIn, RouteSignUp } from './Helpers/RouteNames'
import Index from './Pages/Index'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'

function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route path={RouteIndex} element={<Layout/>}>
            <Route index element={<Index/>}/>
          </Route>

          <Route path={RouteSignIn} element={<SignIn/>} />
          <Route path={RouteSignUp} element={<SignUp/>} />


        </Routes>
     </BrowserRouter>
  )
}

export default App

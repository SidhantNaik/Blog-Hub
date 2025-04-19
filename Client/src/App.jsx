import { BrowserRouter, Route, Routes } from 'react-router-dom'
import  Layout  from './Layout/Layout'
import { RouteIndex, RouteProfile, RouteSignIn, RouteSignUp } from './Helpers/RouteNames'
import Index from './Pages/Index'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import Profile from './Pages/Profile'

function App() {

  return (
    
    <BrowserRouter>
        <Routes>
          <Route path={RouteIndex} element={<Layout/>}>
            <Route index element={<Index/>}/>

            <Route path={RouteProfile} element={<Profile/>} />

          </Route>

          <Route path={RouteSignIn} element={<SignIn/>} />
          <Route path={RouteSignUp} element={<SignUp/>} />


        </Routes>
     </BrowserRouter>
  )
}

export default App

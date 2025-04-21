import { BrowserRouter, Route, Routes } from 'react-router-dom'
import  Layout  from './Layout/Layout'
import { RouteAddCategory, RouteCategoryDetails, RouteIndex, RouteProfile, RouteSignIn, RouteSignUp } from './Helpers/RouteNames'
import Index from './Pages/Index'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import Profile from './Pages/Profile'
import AddCategory from './Pages/Category/AddCategory'
import CategoryDetails from './Pages/Category/CategoryDetails'
import EditCategory from './Pages/Category/EditCategory'
import { RouteEditCategory } from './Helpers/RouteNames'

function App() {

  return (
    
    <BrowserRouter>
        <Routes>
          <Route path={RouteIndex} element={<Layout/>}>
            <Route index element={<Index/>}/>

            <Route path={RouteProfile} element={<Profile/>} />
            <Route path={RouteAddCategory}  element={<AddCategory/>} />
            <Route path={RouteCategoryDetails} element={<CategoryDetails/>} />
            <Route path={RouteEditCategory()} element={<EditCategory/>} />

          </Route>

          <Route path={RouteSignIn} element={<SignIn/>} />
          <Route path={RouteSignUp} element={<SignUp/>} />


        </Routes>
     </BrowserRouter>
  )
}

export default App

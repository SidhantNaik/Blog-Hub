import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import {
  RouteAddCategory,
  RouteBlog,
  RouteBlogAdd,
  RouteBlogByCategory,
  RouteBlogDetails,
  RouteBlogEdit,
  RouteCategoryDetails,
  RouteCommentsDetails,
  RouteIndex,
  RouteProfile,
  RouteSearch,
  RouteSignIn,
  RouteSignUp,
  RouteUser,
} from "./Helpers/RouteNames";
import Index from "./Pages/Index";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Profile from "./Pages/Profile";
import AddCategory from "./Pages/Category/AddCategory";
import CategoryDetails from "./Pages/Category/CategoryDetails";
import EditCategory from "./Pages/Category/EditCategory";
import { RouteEditCategory } from "./Helpers/RouteNames";
import Categories from "./Layout/Categories";
import AddBlog from "./Pages/Blog/AddBlog";
import BlogDetails from "./Pages/Blog/BlogDetails";
import EditBlog from "./Pages/Blog/EditBlog";
import SingleBlogDetails from "./Pages/SingleBlogDetails";
import BlogByCategory from "./Pages/Blog/BlogByCategory";
import SearchResult from "./Pages/SearchResult";
import Comments from "./Pages/Comments";
import User from "./Pages/User";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RouteIndex} element={<Layout />}>
          <Route index element={<Index />} />

          <Route path={RouteProfile} element={<Profile />} />

          {/* Blog Categories */}
          <Route path={RouteAddCategory} element={<AddCategory />} />
          <Route path={RouteCategoryDetails} element={<CategoryDetails />} />
          <Route path={RouteEditCategory()} element={<EditCategory />} />

          {/* Blogs */}
          <Route path={RouteBlogAdd} element={<AddBlog />} />
          <Route path={RouteBlog} element={<BlogDetails />} />
          <Route path={RouteBlogEdit()} element={<EditBlog />} />
          <Route path={RouteBlogDetails()} element={<SingleBlogDetails />} />
          <Route path={RouteBlogByCategory()} element={<BlogByCategory />} />
          <Route path={RouteSearch()} element={<SearchResult />} />
          <Route path={RouteCommentsDetails} element={<Comments />} />
          <Route path={RouteUser} element={<User />} />

        </Route>

        <Route path={RouteSignIn} element={<SignIn />} />
        <Route path={RouteSignUp} element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

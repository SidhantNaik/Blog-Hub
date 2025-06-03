import Categories from './Categories'
import { useFetch } from '../hooks/useFetch'
import { getEnv } from '../Helpers/getEnv'
import { Link } from 'react-router-dom';
import { RouteBlogByCategory } from '../Helpers/RouteNames';

function CategoriesGroup() {

  const { data: CategoryData } = useFetch(`${getEnv('VITE_API_BASE_URL')}/category/all-category`, {
    method: 'GET',
    credentials: 'include',
  });

  return (
    <>
      {CategoryData?.categories?.map((category) => (
        <Link key={category._id} to={RouteBlogByCategory(category.slug)} >
          <Categories title={category.name} id={category._id} />
        </Link>
      ))}
    </>
  )
}

export default CategoriesGroup
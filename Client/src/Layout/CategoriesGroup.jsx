import React from 'react'
import Categories from './Categories'
import { useFetch } from '../hooks/useFetch'
import { getEnv } from '../Helpers/getEnv'

function CategoriesGroup() {

  const { data: CategoryData } = useFetch(`${getEnv('VITE_API_BASE_URL')}/category/all-category`, {
    method: 'GET',
    credentials: 'include',
  });

  return (
    <>
    {CategoryData?.categories?.map((category) => (
      <Categories key={category._id} title={category.name} id={category._id} /> 
    ))}
    </>

  )
}

export default CategoriesGroup
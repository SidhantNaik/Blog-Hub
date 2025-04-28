import React from 'react';
import { Link } from 'react-router-dom';
import { getEnv } from '../Helpers/getEnv';
import { useFetch } from '../Hooks/useFetch';
import { RouteBlogDetails } from '../Helpers/RouteNames';

function RelatedBlog({ props }) {
  const { data, loading, error } = useFetch(`${getEnv("VITE_API_BASE_URL")}/blog/get-related-blog/${props.category}`, {
    method: "GET",
    credentials: "include",
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading related blogs</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Related Blogs</h2>
      <div className="flex flex-col gap-4">
        {data?.blogs?.map((blog) => (
          <Link 
            key={blog._id} 
            to={RouteBlogDetails(blog.category.slug, blog.slug)}
            className="hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex gap-2 items-center border-gray-400 border p-2 rounded-lg">
              <img 
                src={blog.featureImage} 
                alt={blog.title} 
                className="w-20 h-20 object-cover rounded"
              />
              <h3 className="font-medium text-lg">{blog.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default RelatedBlog;
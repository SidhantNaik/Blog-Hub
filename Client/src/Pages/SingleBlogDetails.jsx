import React from 'react'
import { useFetch } from '../Hooks/useFetch'
import { getEnv } from '../Helpers/getEnv'
import { useParams } from 'react-router-dom'
import Loading from '../Components/Loading'
import Avatar from '../Layout/UserProfile/Avatar'
import { decode } from 'entities'
import Comment from '../Components/Comment'
import CommentList from '../Components/CommentList'

function SingleBlogDetails() {

    const { blog } = useParams()

    const { data, loading, error } = useFetch(`${getEnv("VITE_API_BASE_URL")}/blog/get-blog/${blog}`, {
        method: "GET",
        credentials: "include",
    });

    if (loading) return <Loading />;

    return (
        <div className="container mx-auto px-7 shadow-lg rounded-2xl py-8 max-w-5xl border border-gray-400">
            {data && data.blog &&
               <>
                <div className="mb-8">
                    <h2 className="font-bold text-4xl md:text-5xl text-gray-800 leading-tight mb-6">
                        {data.blog.title}
                    </h2>
                    
                    <div className="flex items-center space-x-4 mb-8 border-b pb-6">
                        <div className="flex items-center space-x-3">
                            <Avatar src={data.blog.author.avatar} alt="User Avatar" className="w-12 h-12 rounded-full ring-2 ring-gray-200" />
                            <div className="flex flex-col">
                                <span className="font-medium text-gray-800">{data.blog.author.name}</span>
                                <span className="text-sm text-gray-500">Author</span>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl overflow-hidden shadow-lg mb-10">
                        <img 
                            src={data.blog.featureImage} // Changed from featuredImage to featureImage
                            alt="Featured Image" 
                            className="w-full shadow-2xl h-[330px] object-cover hover:scale-105 transition-transform duration-300"
                           
                        />
                    </div>

                    <article 
                        dangerouslySetInnerHTML={{ __html: decode(data.blog.blogContent)||'' }} 
                        className="prose prose-lg max-w-none text-gray-700 leading-relaxed prose-headings:text-gray-900 prose-a:text-blue-600 prose-strong:text-gray-900 prose-img:rounded-lg prose-img:shadow-lg"
                    >
                    </article>

                    <div>
                        <Comment props={{blogid:data.blog._id}}/>
                    </div>
                    <div>
                        <CommentList props={{blogid:data.blog._id} }/>
                    </div>
                </div>
               </>
            }
        </div>
    )
}

export default SingleBlogDetails
import React from 'react'
import { useFetch } from '../Hooks/useFetch'
import { getEnv } from '../Helpers/getEnv'
import { useParams } from 'react-router-dom'
import Loading from '../Components/Loading'
import Avatar from '../Layout/UserProfile/Avatar'
import { decode } from 'entities'
import Comment from '../Components/Comment'
import CommentList from '../Components/CommentList'
import { formatDate } from '../utils/formatDate';


function SingleBlogDetails() {

    const { blog } = useParams()

    const { data, loading, error } = useFetch(`${getEnv("VITE_API_BASE_URL")}/blog/get-blog/${blog}`, {
        method: "GET",
        credentials: "include",
    });

    if (loading) return <Loading />;

    return (
        <div className="container mx-auto px-4 md:px-8 py-10 shadow-2xl rounded-3xl max-w-5xl border border-gray-200 bg-white mb-8">
            {data && data.blog &&
                <>
                    <div className="mb-12">
                        <h2 className="font-bold text-4xl md:text-5xl text-gray-800 leading-tight mb-8 hover:text-gray-700 transition-colors duration-300">
                            {data.blog.title}
                        </h2>
                        
                        <div className="flex items-center justify-between mb-10 border-b border-gray-200 pb-8">
                            <div className="flex items-center space-x-4 hover:transform hover:scale-105 transition-transform duration-300">
                                <Avatar src={data.blog.author.avatar} alt="User Avatar" className="w-14 h-14 rounded-full ring-4 ring-blue-100 shadow-md" />
                                <div className="flex flex-col">
                                    <span className="font-semibold text-gray-800 text-lg hover:text-blue-600 transition-colors duration-300">{data.blog.author.name}</span>
                                    <span className="text-sm text-gray-500 font-medium">Author</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <div className="text-gray-600 bg-gray-50 px-4 py-2 rounded-full shadow-sm">
                                    {formatDate(data.blog?.createdAt)}
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl overflow-hidden shadow-2xl mb-12 transform hover:scale-[1.02] transition-transform duration-500">
                            <img 
                                src={data.blog.featureImage}
                                alt="Featured Image" 
                                className="w-full h-[400px] md:h-[500px] object-cover"
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
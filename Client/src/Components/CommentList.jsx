import React from 'react'
import { getEnv } from '../Helpers/getEnv'
import { useFetch } from '../Hooks/useFetch'
import Avatar from '../Layout/UserProfile/Avatar'
import Loading from './Loading'
import { formatDate } from '../utils/formatDate'


function CommentList({props}) {


    const { data, loading, error } = useFetch(`${getEnv("VITE_API_BASE_URL")}/comment/get/${props.blogid}`, {
        method: "GET",
        credentials: "include",
    });

    if (loading) return <Loading />;
    if (error) return <div className="text-red-500">Error loading comments</div>;
    if (!data?.comments?.length) return <div className="text-gray-500 text-center py-4">No comments yet</div>;

    if(loading) return <Loading />;

    return (
        <div className="space-y-6 mt-8">
            <h3 className="text-xl font-semibold text-gray-800">Comments ({data.comments.length})</h3>
            {data.comments.map((comment) => (
                <div key={comment._id} className="flex space-x-4 p-4 bg-gray-50 rounded-lg">
                    <Avatar 
                        src={comment.author.avatar} 
                        alt={comment.author.name} 
                        size="sm"
                    />
                    <div>
                        <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-800">{comment.author.name}</span>
                            <span className="text-sm text-gray-500">
                                {formatDate(comment?.createdAt)}
                            </span>
                        </div>
                        <p className="mt-1 text-gray-600">{comment.comment}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default CommentList
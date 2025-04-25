import React from 'react'
import Avatar from '../Layout/UserProfile/Avatar'
import { FaRegCalendar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function BlogCard({ props }) {
    // Format date
    const formattedDate = new Date(props.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <Link to={`/blog/${props._id}`} className="block">
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="p-4 flex items-center space-x-3">
                    <div className="w-10 h-10">
                        <Avatar src={props.author.avatar} alt="User Avatar" />
                    </div>
                    <span className="font-medium text-gray-700">{props.author.name}</span>
                    {props.author.role === "admin" &&
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full" name="badge">Admin</span>
                    }
                </div>
                <div className="aspect-video overflow-hidden">
                    <img 
                        src={props.featureImage} 
                        alt='Feature image' 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                            e.target.src = 'https://placehold.co/600x400/png?text=No+Image';
                        }}
                    />
                </div>
                <div className="p-4">
                    <p className="flex items-center text-gray-500 text-sm mb-2">
                        <FaRegCalendar className="mr-2" />
                        <span>{formattedDate}</span>
                    </p>
                    <h3 className="text-xl font-semibold text-gray-800 line-clamp-2">
                        {props.title}
                    </h3>
                </div>
            </div>
        </Link>
    )
}

export default BlogCard
import React from 'react'
import LableText from '../Components/LableText'
import InputText from '../Components/InputText'
import Button from '../Components/Button'
import { getEnv } from '../Helpers/getEnv'
import { showToast } from '../Helpers/showToast'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/user/user.slice'
import { useSelector } from 'react-redux'

function Profile() {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user);

    return (
        <div className="flex justify-center items-center py-8">
            <form className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 sm:p-8">
                <h2 className="text-center mb-6 text-2xl font-bold text-purple-700">Profile</h2>

                <div className="mx-auto mb-4">
                  <img 
                    src={user.user.avatar} 
                    alt="Profile Photo" 
                    className="w-24 h-24 rounded-full mx-auto mb-4"
                    onError={(e) => {
                        e.target.src = '/default-avatar.png'
                    }}
                  />
                </div>

                <div className="mb-4">
                    <LableText labels="Name" />
                    <InputText 
                        placeholder="Enter your name"
                        type="text"
                        value={user.user.name}
                    />
                </div>

                <div className="mb-4">
                    <LableText labels="Email" />
                    <InputText
                        placeholder="Enter your email"
                        type="email"
                        value={user.user.email}
                        disabled
                    />
                </div>

                <div className="mb-4">
                    <LableText labels="Bio" />
                    <textarea 
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Enter your Bio"
                        defaultValue={user.user.bio}
                        readOnly
                    />
                </div>

                <div className="mb-4">
                    <LableText labels="Password" />
                    <InputText
                        placeholder="Enter your Password"
                        type="password"
                        value={user.user.password}
                    />
                </div>

                <div className="flex justify-center mt-6 mb-4">
                    <Button title="Update Profile" type="submit" />
                </div>
            </form>
        </div>
    )
}

export default Profile

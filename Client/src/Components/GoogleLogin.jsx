import React from 'react'
import { FcGoogle } from 'react-icons/fc'
// import {auth,provider} from '../Helpers/firebase'


function GoogleLogin() {

    const handleLogin = async () => {
        // const googleResponse = await signInWithPopup(auth,provider)

    }

    return (

        <>
            <button
                type="button"
                className="flex items-center justify-center w-full gap-2 border-2 border-gray-00 rounded-lg p-3 mb-4 hover:bg-gray-50 transition-colors"
                onClick={handleLogin}>
                <FcGoogle className="text-xl" />
                <span>Continue With Google</span>
            </button>

            <div className="flex items-center my-4">
                <hr className="flex-grow border-gray-300" />
                <span className="px-3 text-gray-500 text-sm">OR</span>
                <hr className="flex-grow border-gray-300" />
            </div>
        </>
    )
}

export default GoogleLogin
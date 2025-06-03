import { FcGoogle } from 'react-icons/fc'
import { auth, provider } from '../Helpers/firebase'
import { signInWithPopup } from 'firebase/auth'
import { showToast } from '../Helpers/showToast'
import { useNavigate } from 'react-router-dom'
import { getEnv } from '../Helpers/getEnv'
import { RouteIndex } from '../Helpers/RouteNames'
import {useDispatch} from 'react-redux'
import { setUser } from '../redux/user/user.slice'


function GoogleLogin() {

    const navigate = useNavigate()
    const dispath = useDispatch()

    const handleLogin = async () => {

        try {
            const googleResponse = await signInWithPopup(auth, provider)

            const user = googleResponse.user

            const bodyData = {
                name: user.displayName,
                email: user.email,
                avatar: user.photoURL
            }


            const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/auth/google-login`, {
                method: 'post',
                headers: { 'Content-type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(bodyData)
            })

            const data = await response.json()
            if (!response.ok) {
                return showToast('error', data.message)
            }

            dispath(setUser({ ...data.user, isLoggedIn: true }))  // Add isLoggedIn flag
            navigate(RouteIndex)
            showToast('success', data.message)

        }
        catch (error) {
            showToast('error', error.message)
        }
    }

    return (

        <>
            <button
                type="button"
                className="flex items-center cursor-pointer justify-center w-full gap-2 border-2 border-gray-00 rounded-lg p-3 mb-4 hover:bg-gray-200 transition-colors"
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
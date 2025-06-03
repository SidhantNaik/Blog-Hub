import { FaComments } from 'react-icons/fa'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { showToast } from '../Helpers/showToast'
import { getEnv } from '../Helpers/getEnv'
import { useSelector } from 'react-redux'
import LableText from '../Components/LableText'
import Button from '../Components/Button'
import { Link } from 'react-router-dom'
import { RouteSignIn } from '../Helpers/RouteNames'

function Comment({ props }) {

    
    const user = useSelector((state) => state.user)

    const formSchema = z.object({
        comment: z.string().min(3, "Comment must be at least 3 characters"),
    })

    const {
        register,
        handleSubmit,
        // watch,
        // setValue,
        reset,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            comment: '',
        }
    })


    async function onSubmit(values) {
        try {
            const newValues = {
                ...values,
                blogid: props.blogid, 
                author: user.user._id
            }

            const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/comment/add`, {
                method: 'post',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(newValues)
            })

            const data = await response.json()
            if (!response.ok) {
                return showToast('error', data.message)
            }

            reset()
            showToast('success', data.message)
            window.location.reload()

        }
        catch (error) {
            showToast('error', error.message)
        }
    }


    return (
        <div>

            <br /><br /><hr /><br /><hr /><br /><br />
            {
                user && user.isLoggedIn ?
                    <form className="w-full border border-gray-300 rounded-lg  p-6 sm:p-8" onSubmit={handleSubmit(onSubmit)}>
                        <p className="text-center mb-6 text-2xl font-bold text-purple-700">
                            <FaComments />Comments
                        </p>



                        <div >
                            <div>
                                <LableText labels="Comment" />
                                <textarea
                                    className="border-2 w-full border-gray-300 rounded-lg p-5"
                                    placeholder="Type your comment...."
                                    type="text"
                                    {...register('comment')}
                                    error={errors.name?.message}
                                ></textarea>
                            </div>



                            <div className="flex justify-center mt-6 mb-4">
                                <Button title="Submit" type="submit" />
                            </div>


                        </div>
                    </form>
                    :
                    <Link to={RouteSignIn}>
                        <Button title="Sing In " />
                    </Link>
            }
        </div>
    )
}

export default Comment
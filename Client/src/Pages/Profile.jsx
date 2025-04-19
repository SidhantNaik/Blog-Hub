import LableText from '../Components/LableText';
import InputText from '../Components/InputText';
import Button from '../Components/Button';
import { getEnv } from '../Helpers/getEnv';
import { useSelector } from 'react-redux';
import { useFetch } from '../Hooks/useFetch'; import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Loading from '../Components/Loading';
import { showToast } from '../Helpers/showToast';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/user/user.slice';
import { useEffect, useState } from 'react';
import { IoCamera } from "react-icons/io5";
import Dropzone from 'react-dropzone'



function Profile() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [filePreview,setPreview]=useState()
    const [file, setFile] = useState();

    const { data: userData, loading, error } = useFetch(
        `${getEnv('VITE_API_BASE_URL')}/user/get-user/${user.user._id}`,
        { method: 'get', credentials: 'include' }
    );

    const formSchema = z.object({
        name: z.string().min(3, "Name must be at least 3 character long."),
        email: z.string().email(),
        bio: z.string().min(5, "Bio must be at least 5 character long."),
        password: z.string()
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            bio: '',
            password: ''
        }
    });

    useEffect(() => {
        if (userData?.success) {
            form.reset({
                name: userData.data?.name || '',
                email: userData.data?.email || '',
                bio: userData.data?.bio || '',
                password: ''
            });
        }
    }, [userData, form]);

    async function onSubmit(values) {
        try {
            const formData= new FormData()
            formData.append('file',file)
            formData.append('data',JSON.stringify(values))


            const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/user/update-user/${userData.user._id}`, {
                method: 'put',
                credentials: 'include',
                body: formData
            });

            const data = await response.json();

            if (!response.ok) {
                return showToast('error', data.message);
            }

            dispatch(setUser(data.user));
            showToast('success', 'Profile updated successfully');
        } catch (error) {
            showToast('error', error.message);
        }
    }


    const handleFileSelection=(files)=>
    {
        const file= files[0]
        const preview= URL.createObjectURL(file)
        setFile(file)
        setPreview(preview)
    }


    if (loading || !user?.user?._id) return <Loading />;
    if (error) return <div className="text-center py-8 text-red-500">Error loading profile data</div>;

    return (
        <div className="flex justify-center items-center py-8">
            <form className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 sm:p-8" onSubmit={onSubmit()}>
                <h2 className="text-center mb-6 text-2xl font-bold text-purple-700">Profile</h2>

                <Dropzone onDrop={acceptedFiles => handleFileSelection(acceptedFiles)}>
                    {({ getRootProps, getInputProps }) => (
                        <section>
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <div className="mx-auto mb-4 relative group">
                                    
                                    <img
                                        src={userData?.user?.avatar }
                                        alt="Profile Photo"
                                        className="w-24 h-24 rounded-full mx-auto mb-4 group-hover:opacity-30"
                                    />
                                    <IoCamera className="absolute z-10  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/4 w-1/4 cursor-pointer text-purple-600  hidden  group-hover:block  " />

                                </div>
                            </div>
                        </section>
                    )}
                </Dropzone>


                <div className="mb-4">
                    <LableText labels="Name" />
                    <InputText
                        placeholder="Enter your name"
                        type="text"
                        value={userData?.user?.name}
                    />
                </div>

                <div className="mb-4">
                    <LableText labels="Email" />
                    <InputText
                        placeholder="Enter your email"
                        type="email"
                        value={userData?.user?.email}
                    />
                </div>

                <div className="mb-4">
                    <LableText labels="Bio" />
                    <textarea
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Enter your Bio"
                        value={userData?.user?.bio}
                    />
                    {/* {form.formState.errors.bio && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.bio.message}</p>
                    )} */}
                </div>

                <div className="mb-4">
                    <LableText labels="Password" />
                    <InputText
                        placeholder="Enter your Password"
                        type="password"
                        // value={userData?.user?.password}
                    />
                </div>

                <div className="flex justify-center mt-6 mb-4">
                    <Button title="Update Profile" type="submit" loading={form.formState.isSubmitting} />
                </div>
            </form>
        </div>
    );
}

export default Profile;

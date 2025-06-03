import { MdLogin } from "react-icons/md"
import { Link } from 'react-router-dom';
import { RouteSignIn } from '../Helpers/RouteNames';

function SignInButton() {
  return (
    <button className="bg-purple-500 text-white px-4 py-2 rounded-2xl flex items-center gap-2 hover:bg-purple-600 hover:shadow-lg transition-all duration-300">
      <Link to={RouteSignIn} className='flex items-center'>
        <span>Sign In</span>
        <MdLogin className="ml-2" />
      </Link>
    </button>
  );
}

export default SignInButton;

const Button = ({title, onClick, type}) => {
  return (
    <button 
      onClick={onClick} 
      type={type} // Set the button type
      className="bg-purple-500 text-white py-2 px-6 rounded-full hover:bg-purple-600 hover:shadow-lg transition-all duration-300  focus:ring-2 focus:ring-purple-400"
    >
      {title}
    </button>
  )
}

export default Button
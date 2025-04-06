const InputText = ({ error, ...props }) => {
  return (
    <>
      <input 
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" 
        {...props} 
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </>
  );
};

export default InputText
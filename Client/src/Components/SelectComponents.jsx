
// Select Component
export const Select = ({ children, ...props }) => {
  return (
    <select
      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
      {...props}
    >
      {children}
    </select>
  );
};

// SelectOption Component
export const SelectOption = ({ value, children }) => {
  return <option value={value}>{children}</option>;
};

// SelectLabel Component
export const SelectLabel = ({ label }) => {
  return <option defaultValue className="text-gray-700 font-medium block mb-1">{label}</option>;
};
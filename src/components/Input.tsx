import React from 'react';

interface InputProps {
  id: string;
  type: string;
  placeholder: string;
  label: string;
  required?: boolean;
  infoText?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const Input: React.FC<InputProps> = ({ id, type, placeholder, label, required, infoText, value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={id}>
        {label}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={id}
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
      />
      {infoText && <p className="text-gray-600 text-xs italic mt-2">{infoText}</p>}
    </div>
  );
};

export default Input;

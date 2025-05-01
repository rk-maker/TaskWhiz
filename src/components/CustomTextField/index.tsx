"use client";
interface TextFieldProps {
  title?: string;
  onChange?: (value: string) => void;
  onFocus?: () => void;
}

const CustomTextField = ({ title, onFocus, onChange }: TextFieldProps) => {
  return (
    <div className="mb-4">
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Enter task title..."
          value={title}
          onChange={(e) => {
            onChange && onChange(e.target.value);
          }}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          onFocus={onFocus}
        />
      </div>
    </div>
  );
};
export default CustomTextField;

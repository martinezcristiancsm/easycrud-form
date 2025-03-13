import React from "react";

interface EditableCellProps {
  isEditing: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({ isEditing, value, onChange }) => {
  return isEditing ? (
    <input
      type="text"
      className="border px-2 py-1 w-full"
      value={value}
      onChange={onChange}
    />
  ) : (
    <span>{value}</span>
  );
};

export default EditableCell;

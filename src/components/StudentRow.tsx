import React from "react";
import EditableCell from "../components/EditableCell";

interface Student {
  studentId: number;
  firstName: string;
  lastName: string;
  email: string;
}

interface StudentRowProps {
  student: Student;
  isEditing: boolean;
  editedData: Partial<Student>;
  onEdit: () => void;
  onDelete: () => void;
  onSave: () => void;
  onChange: (field: keyof Student, value: string) => void;
}

const StudentRow: React.FC<StudentRowProps> = ({
  student,
  isEditing,
  editedData,
  onEdit,
  onDelete,
  onSave,
  onChange
}) => {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="py-3 px-4">{student.studentId}</td>
      <td className="py-3 px-4">
        <EditableCell
          isEditing={isEditing}
          value={editedData.firstName || student.firstName}
          onChange={(e) => onChange("firstName", e.target.value)}
        />
      </td>
      <td className="py-3 px-4">
        <EditableCell
          isEditing={isEditing}
          value={editedData.lastName || student.lastName}
          onChange={(e) => onChange("lastName", e.target.value)}
        />
      </td>
      <td className="py-3 px-4">
        <EditableCell
          isEditing={isEditing}
          value={editedData.email || student.email}
          onChange={(e) => onChange("email", e.target.value)}
        />
      </td>
      <td className="py-3 px-4 flex space-x-2">
        {isEditing ? (
          <button
            onClick={onSave}
            className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            Save
          </button>
        ) : (
          <button
            onClick={onEdit}
            className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
          >
            Edit
          </button>
        )}
        <button
          onClick={onDelete}
          className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default StudentRow;

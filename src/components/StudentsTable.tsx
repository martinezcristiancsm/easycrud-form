import { useEffect, useState } from "react";
import { fetchStudents } from "../services/fetchStudents";
import { deleteStudent } from "../services/deleteStudents";
import { editStudents } from "../services/editStudents";
import StudentRow from "./StudentRow";

interface Student {
  studentId: number;
  firstName: string;
  lastName: string;
  email: string;
}

const StudentsTable = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [editingStudentId, setEditingStudentId] = useState<number | null>(null);
  const [editedData, setEditedData] = useState<{ [key: number]: Partial<Student> }>({});

  const getStudents = async () => {
    const data = await fetchStudents();
    setStudents(data);
  };

  useEffect(() => {
    getStudents();
  }, []);

  const handleInputChange = (id: number, field: keyof Student, value: string) => {
    setEditedData(prev => ({
      ...prev,
      [id]: { ...prev[id], [field]: value }
    }));
  };

  const handleSave = async (id: number) => {
    const studentData = editedData[id];
    if (!studentData) return;
    const currentStudent = students.find((student) => student.studentId === id);
    if (!currentStudent) return;

    const updatedStudent = {
      studentId: id,
      firstName: studentData.firstName || currentStudent.firstName,
      lastName: studentData.lastName || currentStudent.lastName,
      email: studentData.email || currentStudent.email,
    };

    try {
      await editStudents(id, updatedStudent);
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.studentId === id ? { ...student, ...updatedStudent } : student
        )
      );
      setEditingStudentId(null);
    } catch (error) {
      console.error("Error al actualizar estudiante:", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Seguro que quieres eliminar este estudiante?")) return;

    try {
      await deleteStudent(id);
      getStudents();
    } catch (error) {
      console.error("Error al eliminar estudiante", error);
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Students List</h2>
        <button
          onClick={getStudents}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Refresh Data
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="py-3 px-4 text-left border-b">ID</th>
              <th className="py-3 px-4 text-left border-b">First Name</th>
              <th className="py-3 px-4 text-left border-b">Last Name</th>
              <th className="py-3 px-4 text-left border-b">Email</th>
              <th className="py-3 px-4 text-left border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <StudentRow
                key={student.studentId}
                student={student}
                isEditing={editingStudentId === student.studentId}
                editedData={editedData[student.studentId] || {}}
                onEdit={() => setEditingStudentId(student.studentId)}
                onSave={() => handleSave(student.studentId)}
                onDelete={() => handleDelete(student.studentId)}
                onChange={(field, value) => handleInputChange(student.studentId, field, value)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsTable;

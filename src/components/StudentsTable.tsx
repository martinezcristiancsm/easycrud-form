import { useEffect, useState } from "react";
import { fetchStudents } from "../services/fetchStudents";
import { deleteStudent } from "../services/deleteStudents";
import { editStudents } from "../services/editStudents";

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
        if (!currentStudent) {
            console.error("Estudiante no encontrado");
            return;
        }
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
            console.error("Error al actualizar estudiante:")
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
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
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
                            <tr key={student.studentId} className="border-b hover:bg-gray-50">
                                <td className="py-3 px-4">{student.studentId}</td>
                                <td className="py-3 px-4">
                                    {editingStudentId === student.studentId ? (
                                        <input
                                            type="text"
                                            className="border px-2 py-1"
                                            value={editedData[student.studentId]?.firstName || student.firstName}
                                            onChange={(e) => handleInputChange(student.studentId, "firstName", e.target.value)}
                                        />
                                    ) : (
                                        student.firstName
                                    )}
                                </td>
                                <td className="py-3 px-4">
                                    {editingStudentId === student.studentId ? (
                                        <input
                                            type="text"
                                            className="border px-2 py-1"
                                            value={editedData[student.studentId]?.lastName || student.lastName}
                                            onChange={(e) => handleInputChange(student.studentId, "lastName", e.target.value)}
                                        />
                                    ) : (
                                        student.lastName
                                    )}
                                </td>
                                <td className="py-3 px-4">
                                    {editingStudentId === student.studentId ? (
                                        <input
                                            type="text"
                                            className="border px-2 py-1"
                                            value={editedData[student.studentId]?.email || student.email}
                                            onChange={(e) => handleInputChange(student.studentId, "email", e.target.value)}
                                        />
                                    ) : (
                                        student.email
                                    )}
                                </td>
                                <td className="py-3 px-4 flex space-x-2">
                                    {editingStudentId === student.studentId ? (
                                        <button
                                            onClick={() => handleSave(student.studentId)}
                                            className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                                            Save
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => setEditingStudentId(student.studentId)}
                                            className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition">
                                            Edit
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDelete(student.studentId)}
                                        className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StudentsTable;

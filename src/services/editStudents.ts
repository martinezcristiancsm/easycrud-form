export const editStudents = async (id: number, studentData: Partial<Student>) => {
    try {
        const dataToSend: any = { studentId: id };

        if (studentData.firstName) dataToSend.firstName = studentData.firstName;
        if (studentData.lastName) dataToSend.lastName = studentData.lastName;
        if (studentData.email) dataToSend.email = studentData.email;

        const response = await fetch(`http://localhost:8080/api/v1/students`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataToSend),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error al actualizar el estudiante");
        }
    } catch (error) {
        console.error("Error al actualizar estudiante:", error);
        throw error;
    }
};
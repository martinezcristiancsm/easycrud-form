export const deleteStudent = async (id: number) => {
    try {
        const response = await fetch(`http://localhost:8080/api/v1/students/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Error al eliminar el estudiante");
        }
    } catch (error) {
        console.error("Error al eliminar estudiante", error);
        throw error;
    }
};
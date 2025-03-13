export const fetchStudents = async () => {
    try {
        const response = await fetch("http://localhost:8080/api/v1/students");
        if (!response.ok) {
            throw new Error("Failed to fetch students");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching students:", error);
        return [];
    }
};
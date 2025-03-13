import { StudentFormData } from "../types/FormData";

const apiUrl = 'http://localhost:8080/api/v1';

export const postStudentData = async (data: StudentFormData) => {
  const response = await fetch(`${apiUrl}/students`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response;
};

import { useState } from "react";
import { StudentFormData } from "../types/FormData";
import { postStudentData } from "../services/api";

const useStudentForm = () => {
  const [formData, setFormData] = useState<StudentFormData>({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await postStudentData(formData);
      if (response.ok) {
        setIsSubmitted(true);
        alert("Procesado correctamente");
        setFormData({ firstName: "", lastName: "", email: "" });
      } else {
        alert("Hubo un error al procesar el formulario");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error al procesar el formulario");
    }
  };

  return { formData, isSubmitted, handleChange, handleSubmit };
};

export default useStudentForm;

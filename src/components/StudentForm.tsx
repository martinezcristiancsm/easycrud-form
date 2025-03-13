import React from "react";
import InputField from "../components/InputField"
import SubmitButton from "../components/SubmitButton";
import useStudentForm from "../hooks/useStudentForm";

const StudentForm: React.FC = () => {
  const { formData, isSubmitted, handleChange, handleSubmit } = useStudentForm();

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-700">DATOS DEL ESTUDIANTE:</h2>

        <InputField label="Nombre" type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} />
        <InputField label="Apellido" type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} />
        <InputField label="Email" type="email" id="email" name="email" value={formData.email} onChange={handleChange} />

        <SubmitButton text="Enviar" />

        {isSubmitted}
      </form>
    </div>
  );
};

export default StudentForm;


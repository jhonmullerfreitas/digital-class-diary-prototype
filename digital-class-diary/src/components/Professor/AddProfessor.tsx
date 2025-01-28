import React, { useState } from 'react';
import { Professor } from '../../types/entitys';

const CrudProfessor = () => {
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [professorEdit, setProfessorEdit] = useState<Professor | null>(null);

  const [newProfessor, setNewProfessor] = useState<Professor>({
    id: 0,
    name: '',
    schoolSubjects: '',
    email: '',
  });

  const addProfessor = () => {
    if (
      !newProfessor.name ||
      !newProfessor.schoolSubjects ||
      !newProfessor.email
    ) {
      alert('Preencha todos os campos');
      return;
    }

    setProfessors([...professors, { ...newProfessor, id: Math.random() }]);
    setNewProfessor({ id: 0, name: '', schoolSubjects: '', email: '' });
  };

  const removeProfessor = (id: number) => {
    setProfessors(professors.filter((professor) => professor.id !== id));
  };

  //   const updateProfessor = (
  //     id: number,
  //     field: keyof Professor,
  //     value: string,
  //   ) => {
  //     setProfessors(
  //       professors.map((professor) =>
  //         professor.id === id ? { ...professor, [field]: value } : professor,
  //       ),
  //     );
  //   };

  const initEdit = (professor: Professor) => {
    setProfessorEdit(professor);
  };

  const saveEdit = () => {
    if (professorEdit) {
      setProfessors(
        professors.map((professor) =>
          professor.id === professorEdit.id ? professorEdit : professor,
        ),
      );
      setProfessorEdit(null); // Limpa o estado de edição
    }
  };

  const cancelEdit = () => {
    setProfessorEdit(null);
  };

  console.log(professors);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gerenciar Professores</h1>

      {/* Formulário para adicionar professor */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Name"
          value={newProfessor.name}
          onChange={(e) =>
            setNewProfessor({ ...newProfessor, name: e.target.value })
          }
          className="border p-2 mr-2 rounded"
        />
        <input
          type="text"
          placeholder="School Subjects"
          value={newProfessor.schoolSubjects}
          onChange={(e) =>
            setNewProfessor({ ...newProfessor, schoolSubjects: e.target.value })
          }
          className="border p-2 mr-2 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={newProfessor.email}
          onChange={(e) =>
            setNewProfessor({ ...newProfessor, email: e.target.value })
          }
          className="border p-2 mr-2 rounded"
        />
        <button
          onClick={addProfessor}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Adicionar
        </button>
      </div>

      {/* Formulário de Edição */}
      {professorEdit && (
        <div className="mb-4 p-4 border rounded">
          <h2 className="text-xl font-semibold mb-2">Editando Professor</h2>
          <input
            type="text"
            placeholder="Name"
            value={professorEdit.name}
            onChange={(e) =>
              setProfessorEdit({
                ...professorEdit,
                name: e.target.value,
              })
            }
            className="border p-2 mr-2 rounded"
          />
          <input
            type="text"
            placeholder="schoolSubjects"
            value={professorEdit.schoolSubjects}
            onChange={(e) =>
              setProfessorEdit({
                ...professorEdit,
                schoolSubjects: e.target.value,
              })
            }
            className="border p-2 mr-2 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={professorEdit.email}
            onChange={(e) =>
              setProfessorEdit({
                ...professorEdit,
                email: e.target.value,
              })
            }
            className="border p-2 mr-2 rounded"
          />
          <button
            onClick={saveEdit}
            className="bg-green-500 text-white p-2 rounded mr-2"
          >
            Salvar
          </button>
          <button
            onClick={cancelEdit}
            className="bg-red-500 text-white p-2 rounded"
          >
            Cancelar
          </button>
        </div>
      )}

      {/* Lista de Professores */}
      <ul>
        {professors.map((professor) => (
          <li key={professor.id} className="mb-2 flex items-center">
            <div className="flex-1">
              {professor.name} - {professor.schoolSubjects} - {professor.email}
            </div>
            <button
              onClick={() => initEdit(professor)}
              className="bg-yellow-500 text-white p-1 rounded mr-2"
            >
              Editar
            </button>
            <button
              onClick={() => removeProfessor(professor.id)}
              className="bg-red-500 text-white p-1 rounded"
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CrudProfessor;

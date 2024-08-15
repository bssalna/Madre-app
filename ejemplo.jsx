import React, { useState } from 'react';

const ExpenseManager = ({ expenses, onAddExpense }) => {
  const [newExpense, setNewExpense] = useState({ descripcion: '', monto: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewExpense({ ...newExpense, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddExpense(newExpense);
    setNewExpense({ descripcion: '', monto: '' });
  };

  return (
    <div>
      <h2>Administrador de Gastos</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="descripcion"
          placeholder="Descripción"
          value={newExpense.descripcion}
          onChange={handleChange}
        />
        <input
          type="number"
          name="monto"
          placeholder="Monto"
          value={newExpense.monto}
          onChange={handleChange}
        />
        <button type="submit">Agregar Gasto</button>
      </form>
      <ul>
        {expenses.map((expense, index) => (
          <li key={index}>
            {expense.descripcion}: ${expense.monto}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseManager;

import React, { useState } from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = () => {
    onSave({ title, description });
    setTitle('');
    setDescription('');
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Adicionar Card</h2>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={handleSave}>Salvar</button>
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

export default Modal;

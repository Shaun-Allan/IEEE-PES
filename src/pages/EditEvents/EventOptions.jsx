// src/components/EventModify.js
import React, { useState } from 'react';
import EventButtons from '../../components/Events/EventButtons';
import AddEvents from './AddEvents';
import EditEvents from './EditEvents';
import DeleteEvents from './DeleteEvents';

const EventModify = () => {
  const [showForm, setShowForm] = useState(true); 
  const [formMode, setFormMode] = useState('add');

  const handleAddClick = () => {
    setFormMode('add');
    setShowForm(true);
  };

  const handleEditClick = () => {
    setFormMode('edit');
    setShowForm(true);
  };

  const handleDeleteClick = () => {
    setFormMode('delete');
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  let FormComponent;
  switch (formMode) {
    case 'add':
      FormComponent = AddEvents;
      break;
    case 'edit':
      FormComponent = EditEvents;
      break;
    case 'delete':
      FormComponent = DeleteEvents;
      break;
    default:
      FormComponent = null;
  }

  return (
    <div className="edit-events-container">
      <EventButtons 
        onAddClick={handleAddClick} 
        onEditClick={handleEditClick} 
        onDeleteClick={handleDeleteClick} 
      />
      {showForm && FormComponent && <FormComponent onClose={handleCloseForm} />}
    </div>
  );
};

export default EventModify;

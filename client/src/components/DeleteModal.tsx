import React, { ReactElement } from 'react';

const DeleteModal = ({ handleDelete, handleCancel }: { handleDelete: () => void; handleCancel: () => void }):ReactElement => {


  return (
    <div className="flex justify-center items-center min-h-screen ">

        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="modal-container bg-white w-[70%] p-6 rounded shadow-2xl">
            <p>¿Seguro que quieres eliminar esta publicación?</p>
            <div className="mt-4 flex justify-end">
              <button className="mr-2  text-white" onClick={handleCancel}>Cancelar</button>
              <button className="bg-red-500 text-white" onClick={handleDelete}>Eliminar</button>
            </div>
          </div>
        </div>
    </div>
  );
};

export default DeleteModal;

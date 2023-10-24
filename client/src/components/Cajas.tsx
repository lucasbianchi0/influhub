import React, { useState } from 'react';

const CajasSelector: React.FC = () => {
  const [selectedCaja, setSelectedCaja] = useState<string | null>(null);

  const handleClick = (caja: string) => {
    setSelectedCaja(caja);
  };

  return (
    <div className="flex justify-center">
      <div className="m-4 p-8 border border-gray-300 rounded-lg">
        <div
          className={`cursor-pointer p-4 mb-4 text-center ${
            selectedCaja === 'caja1' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => handleClick('caja1')}
        >
          Caja 1
        </div>
        {selectedCaja === 'caja1' && <div>Texto para Caja 1</div>}
      </div>

      <div className="m-4 p-8 border border-gray-300 rounded-lg">
        <div
          className={`cursor-pointer p-4 mb-4 text-center ${
            selectedCaja === 'caja2' ? 'bg-green-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => handleClick('caja2')}
        >
          Caja 2
        </div>
        {selectedCaja === 'caja2' && <div>Texto para Caja 2</div>}
      </div>

      <div className="m-4 p-8 border border-gray-300 rounded-lg">
        <div
          className={`cursor-pointer p-4 mb-4 text-center ${
            selectedCaja === 'caja3' ? 'bg-red-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => handleClick('caja3')}
        >
          Caja 3
        </div>
        {selectedCaja === 'caja3' && <div>Texto para Caja 3</div>}
      </div>
    </div>
  );
};

export default CajasSelector;

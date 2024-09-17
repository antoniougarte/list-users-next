import React from 'react';

interface PaginacionProps {
  page: number;
  onPageChange: (page: number) => void;
}

const Paginacion: React.FC<PaginacionProps> = ({ page, onPageChange }) => {
  const handlePrevPage = () => onPageChange(page - 1);
  const handleNextPage = () => onPageChange(page + 1);

  return (
    <footer className="bg-gray-950 text-white flex py-4 px-10 fixed bottom-0 w-full">
      <button
        disabled={page === 1}
        onClick={handlePrevPage}
        className="px-4 py-2 bg-gray-800 text-white rounded-md mr-2"
      >
        Anterior
      </button>
      <div className="flex-1 text-center">{page}</div>
      <button
        onClick={handleNextPage}
        className="px-4 py-2 bg-gray-800 text-white rounded-md ml-2"
      >
        Siguiente
      </button>
    </footer>
  );
}

export default Paginacion;

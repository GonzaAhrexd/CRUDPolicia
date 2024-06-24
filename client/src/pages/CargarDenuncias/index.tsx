
// Hooks
import { useAuth } from '../../context/auth';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';
// Componentes
import NavBar from '../../components/NavBar';
import Modal from '../../components/Modal';
import CargarDenunciasRolCarga from './CargarDenunciasRolCarga';
import CargarDenunciasRolAgente from './CargarDenunciasRolAgente';

function CargarDenuncias() {
  // Estados
  const [modoAvanzado, setModoAvanzado] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [texto, setTexto] = useState(['']);
  const [titulo, setTitulo] = useState('');

  // Abrir el modal y mostrar el texto
  const handleOpenModal = (text: string[]) => {
    setIsModalOpen(true);
    setTexto(text);
  };

  // Cerrar el modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  // Cambiar entre modo avanzado y simple
  const handleModoAvanzado = () => {
    setModoAvanzado(!modoAvanzado);
  }

 

  // Obtener datos del usuario
  const { user, isAuthenticated, isLoading } = useAuth();
  // Si está cargando, mostrar "Cargando..."
  if (isLoading) return <h1>Cargando...</h1>
  // Si no está autenticado, redirigir a la página de login
  if (!isLoading && !isAuthenticated) return <Navigate to="/login" replace />


  
  return (
    <>
      <NavBar user={user} />
      <div>
        {isModalOpen && <Modal titulo={titulo} texto={texto} onClose={handleCloseModal} />}
      </div>
      {(user.rol === 'carga' || user.rol === 'admin') &&
        <div className='w-full flex flex-col justify-center items-center'>
          <h2 className='text-3xl my-5'>Modo</h2>
          <div className='flex items-center justify-center cursor-pointer bg-sky-950 hover:bg-sky-900 text-white font-bold py-2 mx-5 rounded w-3/10' onClick={() => handleModoAvanzado()} >{modoAvanzado ? "Modo Avanzado" : "Modo Simple"}</div>
        </div>
      }

      {((user.rol === 'carga' || user.rol === 'admin') && modoAvanzado) && <CargarDenunciasRolCarga setTitulo={setTitulo} handleOpenModal={handleOpenModal} user={user} />}
      {(user.rol === "agente" || !modoAvanzado) && <CargarDenunciasRolAgente user={user} />}

    </>
  );
}


export default CargarDenuncias
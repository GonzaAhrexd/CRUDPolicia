import  { useEffect, useState } from 'react';
import { cantidadDenuncias } from '../../api/crud';
import { NavLink } from 'react-router-dom';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

function CardDenunciasTotales() {
  const [periodo, setPeriodo] = useState('hoy'); // Estado para manejar el período seleccionado
  useEffect(() => {
    // Obtener los datos de hoy
    const values = { desde: '', hasta: '' };
    if (periodo === 'hoy') {
        values.desde = new Date().toISOString().split('T')[0];
        values.hasta = new Date().toISOString().split('T')[0];
      cantidadDenuncias(values).then((response: any) => {
        console.log(response);
        setDenunciasTotales(response);
      });
    }
      else if(periodo === 'semana'){
        // Obtener hoy - 7 días
        const hoy = new Date();
        const haceUnaSemana = new Date(hoy);
        haceUnaSemana.setDate(hoy.getDate() - 7);
        values.desde = haceUnaSemana.toISOString().split('T')[0];
        values.hasta = hoy.toISOString().split('T')[0];
        
        cantidadDenuncias(values).then((response: any) => {
            console.log(response);
            setDenunciasTotales(response);
            });
      }
      else if(periodo === 'mes'){
         // Obtener hoy - 30 días
         const hoy = new Date();
         const haceUnMes = new Date(hoy);
         haceUnMes.setDate(hoy.getDate() - 30);
         values.desde = haceUnMes.toISOString().split('T')[0];
         values.hasta = hoy.toISOString().split('T')[0];
         
         cantidadDenuncias(values).then((response: any) => {
             console.log(response);
             setDenunciasTotales(response);
             });
       }
       else if(periodo === 'año'){
        // Obtener hoy - 365 días
        const hoy = new Date();
        const haceUnAño = new Date(hoy);
        haceUnAño.setDate(hoy.getDate() - 365);
        values.desde = haceUnAño.toISOString().split('T')[0];
        values.hasta = hoy.toISOString().split('T')[0];
        
        cantidadDenuncias(values).then((response: any) => {
            console.log(response);
            setDenunciasTotales(response);
            });
        }

}, [periodo]);

    const [denunciasTotales, setDenunciasTotales] = useState(0);
  return (
    <div className="flex flex-col items-center justify-center bg-neutral-700 hover:bg-neutral-900 text-white rounded-lg p-4 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] ">
      <div className="flex space-x-2 mb-4">
        <button onClick={() => setPeriodo('hoy')} className={`btn ${periodo === 'hoy' ? 'border-b-2 border-white' : ''}`}>Hoy</button>
        <button onClick={() => setPeriodo('semana')} className={`btn ${periodo === 'semana' ? 'border-b-2 border-white' : ''}`}>Semana</button>
        <button onClick={() => setPeriodo('mes')} className={`btn ${periodo === 'mes' ? 'border-b-2 border-white' : ''}`}>Mes</button>
        <button onClick={() => setPeriodo('año')} className={`btn ${periodo === 'año' ? 'border-b-2 border-white' : ''}`}>Año</button>
      </div>
      <div className="text-9xl font-bold">
        {denunciasTotales}
      </div>
      <div className="text-2xl mt-4">
        Denuncias realizadas
      </div>
      <NavLink to="/búsqueda" className='mt-2 flex justify-start p-1 bg-neutral-600 w-full rounded-lg'>
      <MagnifyingGlassIcon className='h-6 w-6'/> 
      <span className='ml-4'> Buscar </span> 
      </NavLink>
    </div>
  );
}

export default CardDenunciasTotales;
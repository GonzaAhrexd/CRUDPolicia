import React from 'react'
import { useState } from 'react';

interface Opcion {
    value?: string;
    nombre?: string;
    subdivisiones?: Opcion[];
}

interface Props {
    campo: string;
    opciones: Opcion[];
    register: any
    setValue: any
    type: string
    nombre: string
    error: any
}


function SelectRegister({ campo, opciones, nombre, register, setValue, error }: Props) {

    const [selectedUnidad, setSelectedUnidad] = useState('');
    const [selectedSubunidad, setSelectedSubunidad] = useState('');
    const [selectedSubsubunidad, setSelectedSubsubunidad] = useState('');
    const [hadSubmitted, setHadSubmitted] = useState(false)
    const handleUnidadChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedUnidad(value);
        setSelectedSubunidad('');
        setSelectedSubsubunidad('');
        // Actualiza el valor en react-hook-form
       
        campo == "Unidad" && setValue('unidad', value) 
        campo == "Jerarquía" && setValue('jerarquia', value)
        campo == "Zona" && setValue('zona', value)
    };
      
    const handleSubunidadChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedSubunidad(value);
        setSelectedSubsubunidad('');
        // Actualiza el valor en react-hook-form
        setValue('unidad',  `${selectedUnidad}, $</div>{value}`);
    };
      
    const handleSubsubunidadChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedSubsubunidad(value);
        // Actualiza el valor en react-hook-form
        setValue('unidad', `${selectedUnidad}, ${selectedSubunidad}, ${value}`);
    };
    return (
        <div className={`flex flex-row ${campo=="Unidad"? "w-full" : "xl:w-1/2"}`}>
            <div className='flex flex-col w-full'>
                <span className='ml-4 font-medium xl:text-vw'> {campo}  <span className='text-red-500'> { (selectedUnidad)? "A" : "Requerido" } </span> </span> 
                <div className={`flex flex-col xl:flex-row 2xl:flex-col  ${campo=="Unidad"? "xl:w-full 2xl:w-full 2xl:h-10 xl:h-12 xl:mb-5" : "xl:w-full"}`}>
                <select
                    className= {campo=="Unidad"? "border open-sans mt-0.5 border-gray-300 rounded-md w-full h-10 xl:h-8/10 mx-2 xl:w-full 2xl:h-10 2xl:w-full " : "border open-sans border-gray-300 rounded-md h-10 xl:h-8 2xl:h-10 my-2 xl:my-1 xl:m-2 m-4 w-full" }
                    name={nombre}
                    value={selectedUnidad}
                    onChange={handleUnidadChange}
                >
                    <option value="">Seleccione la {campo.toLowerCase()}</option>
                    {opciones.map((unidad: Opcion) => (
                        <option key={unidad.value} value={unidad.value}>
                            {unidad.nombre}
                        </option>
                    ))}
                </select>

                {selectedUnidad && opciones.find((unidad: Opcion) => unidad.value === selectedUnidad)?.subdivisiones && (
                <div className='flex flex-row xl:h-full 2xl:h-full xl:w-full'>
                        
                        <select
                            className="border open-sans mt-0.5 border-gray-300 rounded-md w-full h-10 xl:h-8/10 mx-2 xl:w-full 2xl:h-10 2xl:w-full"
                            name="subunidad"
                            value={selectedSubunidad}
                            onChange={handleSubunidadChange}>
                            <option value="">Seleccione una subunidad</option>
                            {opciones.find((unidad) => unidad.value === selectedUnidad)?.subdivisiones?.map((subunidad) => (
                                <option key={subunidad.value} value={subunidad.value}>
                                    {subunidad.nombre}
                                </option>
                            ))}
                        </select>

                        {selectedSubunidad && opciones.find((unidad: Opcion) => unidad.value === selectedUnidad)?.subdivisiones?.find((subunidad: Opcion) => subunidad.value === selectedSubunidad)?.subdivisiones && (
                                <select
                                    className=" border open-sans mt-0.5 border-gray-300 rounded-md w-full h-10 xl:h-8/10 mx-2 xl:w-full 2xl:h-10 2xl:w-full"
                                    name="subsubunidad"
                                    value={selectedSubsubunidad}
                                    onChange={handleSubsubunidadChange}>
                                    <option value="">Seleccione una subsubunidad</option>
                                    {opciones.find((unidad) => unidad.value === selectedUnidad)?.subdivisiones?.find((subunidad: Opcion) => subunidad.value === selectedSubunidad)?.subdivisiones?.map((subsubunidad) => (
                                        <option key={subsubunidad.value} value={subsubunidad.value}>
                                            {subsubunidad.nombre}
                                        </option>
                                    ))}
                                </select>
                        )}
                    </div>
                    
                )}
            </div>
            </div>
        </div>
    )
}

export default SelectRegister
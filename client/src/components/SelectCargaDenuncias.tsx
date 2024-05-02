import React, { useEffect } from 'react'
import { useState } from 'react';
import InputDireccion from './InputDireccion';
import InputRegister from './InputRegister';

interface Opcion {
    value?: string;
    nombre?: string;
    subdivisiones?: Opcion[];
    prefijo?: any;
    cuadriculas?: Opcion[];
}

interface Props {
    campo: string;
    opciones: Opcion[];
    register: any
    setValue: any
    type: string
    nombre: string
    error: any
    setComisariaPertenece?: any
    state?: any
    setMunicipio?: any
    direccion?: any
    setDireccion?: any
    coordenadas?: any
    setCoordenadas?: any
    errors?: any
    consultarCoordenadas?: any
}


function SelectCargaDenuncias({ consultarCoordenadas, direccion, setDireccion, coordenadas, setCoordenadas, errors, setMunicipio, campo, opciones, nombre, register, setValue, error, setComisariaPertenece, state }: Props) {

    const [selectedUnidad, setSelectedUnidad] = useState('');
    const [selectedSubunidad, setSelectedSubunidad] = useState('');
    const [selectedSubsubunidad, setSelectedSubsubunidad] = useState('');
    const [selectedCuadricula, setSelectedCuadricula] = useState('');
    const [hadSubmitted, setHadSubmitted] = useState(false)




    const handleBuscarPrefijo = (comisaria: String) => {
        //Busca el prefijo de la comisaria entre las opciones, tiene que coincidir con el valor de la comisaria
        let prefijo = ''

        opciones.map((unidad: Opcion) => {
            if (unidad != comisaria) {
                unidad.subdivisiones?.map((subunidad: Opcion) => {
                    if (subunidad.value == comisaria && subunidad.prefijo != undefined) {

                        prefijo = subunidad.prefijo
                    } if (subunidad.subdivisiones != undefined) {
                        subunidad.subdivisiones.map((subsubunidad: Opcion) => {
                            if (subsubunidad.value == comisaria && subsubunidad.prefijo != undefined) {
                                prefijo = subsubunidad.prefijo
                            }
                        })
                    }
                })
            }
        })

        return prefijo
    }

    useEffect(() => {

        if (state == false) {
            selectedSubunidad && setComisariaPertenece(handleBuscarPrefijo(selectedSubunidad) + "-")

            selectedSubsubunidad && setComisariaPertenece(handleBuscarPrefijo(selectedSubsubunidad) + "-")

        }

        if (state && selectedUnidad == "Metropolitana") {
            setComisariaPertenece("371-")
        } else if (state && selectedUnidad == "La Leonesa") {
            setComisariaPertenece("108-")
        } else if (state && selectedUnidad == "Lapachito") {
            setComisariaPertenece("125-")
        } else if (state && selectedUnidad == "General San Martín") {
            setComisariaPertenece("260-")
        }
        else if (state && selectedUnidad == "Villa Ángela") {
            setComisariaPertenece("261-")
        }
        else if (state && selectedUnidad == "Charata") {
            setComisariaPertenece("262-")
        }
        else if (state && selectedUnidad == "Juan José Castelli") {
            setComisariaPertenece("258-")
        }
        else if (state && selectedUnidad == "Roque Saenz Peña") {
            setComisariaPertenece("235-")
        }


    }, [state])



    const handleUnidadChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedUnidad(value);
        setSelectedSubunidad('');
        setSelectedSubsubunidad('');
        setSelectedCuadricula('');
        // Actualiza el valor en react-hook-form       
        campo == "Unidad de carga" && setValue('unidad_de_carga', value)
        nombre == "juzgado_interviniente" && setValue('juzgado_interviniente', value)
        nombre == "violencia" && setValue('violencia', value)
        nombre == "modalidades" && setValue('modalidades', value)
        nombre == "tipo_de_arma" && setValue('arma_empleada', value)

    };

    const handleSubunidadChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedSubunidad(value);
        setSelectedSubsubunidad('');
        setSelectedCuadricula('');

        setComisariaPertenece(handleBuscarPrefijo(value) + "-")
        // Actualiza el valor en react-hook-form
        setValue('municipio', `${value}`);
        setMunicipio(value)
    }



    const handleSubsubunidadChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedSubsubunidad(value);
        setSelectedCuadricula('');
        setComisariaPertenece(handleBuscarPrefijo(value) + "-")
        // Actualiza el valor en react-hook-form
        selectedSubunidad != "Puerto Vilelas" ? setValue('jurisdiccion_policial', `${value}`) : setValue('Cuadrícula', `${value}`);

    };
    const handleCuadriculaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedCuadricula(value);
        // Actualiza el valor en react-hook-form
        setValue('cuadricula', `${value}`);
    };


    const handleClick = (coordenadas: any) => {
        const coordenadasSeparadas = coordenadas.split(' ')
        const url = `https://www.google.com/maps/d/viewer?mid=1n-ERiPIZT9Q0WlRQoWI_NmvI9jJffohO&g_ep=CAESCjExLjEyNC4xMDIYACDdYio_LDk0MjE2NDEzLDk0MjEyNDk2LDk0MjA3NTA2LDk0MjE3NTIzLDk0MjE4NjUzLDQ3MDg3MTEyLDQ3MDg0MzkzQgJBUg%3D%3D&shorturl=1&ll=${coordenadasSeparadas[0]}%2C${coordenadasSeparadas[1]}&z=20`
        window.open(url, '_blank');
    };

    

    return (
        <div className={`flex flex-row w-full`}>
            <div className='flex flex-col w-full'>
                <span className='ml-4 font-medium xl:text-vw'> {campo}  <span className='text-red-500'> </span> </span>
                <div className={`flex flex-col xl:w-full"}`}>
                    <select
                        className="border open-sans border-gray-300 rounded-md h-10 xl:h-8 2xl:h-10 my-2 xl:my-1 xl:m-2 m-4 w-95/10"
                        name={nombre}
                        value={selectedUnidad}
                        onChange={handleUnidadChange}
                    >
                        <option value="">Seleccione {campo.toLowerCase()}</option>
                        {opciones.map((unidad: Opcion) => (
                            <option key={unidad.value} value={unidad.value}>
                                {unidad.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                {selectedUnidad && opciones.find((unidad: Opcion) => unidad.value === selectedUnidad)?.subdivisiones && (
                    <div className='flex flex-col xl:h-full 2xl:h-full xl:w-full'>
                        <span className='ml-4 font-medium xl:text-vw'> Municipio  <span className='text-red-500'> </span> </span>

                        <select
                            className="border open-sans mt-0.5 border-gray-300 rounded-md w-full h-10 xl:h-8/10 mx-2 xl:w-full 2xl:h-10 2xl:w-full"
                            name="subunidad"
                            value={selectedSubunidad}
                            onChange={handleSubunidadChange}>
                            <option value="">Seleccione municipio</option>
                            {
                                opciones.find((unidad) => unidad.value === selectedUnidad)?.subdivisiones?.map((subunidad) => (
                                    <option key={subunidad.value} value={subunidad.value}>
                                        {subunidad.nombre}
                                    </option>
                                ))}
                        </select>
                    </div>
                )}

                {selectedSubunidad &&

                    <div className='flex flex-col md:flex-row'>
                        <InputDireccion state={direccion} setState={setDireccion} campo="Dirección" nombre="direccion" register={register} setValue={setValue} type="text" error={errors.direccion} />
                        <InputRegister campo="Barrio" nombre="barrio" register={register} setValue={setValue} type="text" error={errors.barrio} />

                        <InputDireccion state={coordenadas} setState={setCoordenadas} campo="GIS" nombre="GIS" register={register} setValue={setValue} type="text" error={errors.gis} />
                        <div className='cursor-pointer flex items-center mt-5'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 mr-2" onClick={() => consultarCoordenadas()}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7" onClick={() => handleClick(coordenadas)}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                            </svg>

                        </div>

                    </div>

                }
                {selectedSubunidad && opciones.find((unidad: Opcion) => unidad.value === selectedUnidad)?.subdivisiones?.find((subunidad: Opcion) =>

                    subunidad.value === selectedSubunidad)?.subdivisiones && (
                        <div className='flex flex-col xl:h-full 2xl:h-full xl:w-full'>
                            <span className='ml-4 font-medium xl:text-vw'> Jurisdicción policial <span className='text-red-500'> </span> </span>
                            <select
                                className=" border open-sans mt-0.5 border-gray-300 rounded-md w-full h-10 xl:h-8/10 mx-2 xl:w-full 2xl:h-10 2xl:w-full"
                                name="subsubunidad"
                                value={selectedSubsubunidad}
                                onChange={handleSubsubunidadChange}>
                                <option value="">Seleccione jurisdicción policial</option>
                                {opciones.find((unidad) => unidad.value === selectedUnidad)?.subdivisiones?.find((subunidad: Opcion) => subunidad.value === selectedSubunidad)?.subdivisiones?.map((subsubunidad) => (
                                    <option key={subsubunidad.value} value={subsubunidad.value}>
                                        {subsubunidad.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                {selectedSubunidad && opciones.find((unidad: Opcion) => unidad.value === selectedUnidad)?.subdivisiones?.find((subunidad: Opcion) =>

                    subunidad.value === selectedSubunidad)?.cuadriculas && (
                        <div className='flex flex-col xl:h-full 2xl:h-full xl:w-full'>

                            <span className='ml-4 font-medium xl:text-vw'> Cuadricula <span className='text-red-500'> </span> </span>

                            <select
                                className=" border open-sans mt-0.5 border-gray-300 rounded-md w-full h-10 xl:h-8/10 mx-2 xl:w-full 2xl:h-10 2xl:w-full"
                                name="subsubunidad"
                                value={selectedSubsubunidad}
                                onChange={handleSubsubunidadChange}>
                                <option value="">Seleccione cuadrícula</option>
                                {opciones.find((unidad) => unidad.value === selectedUnidad)?.subdivisiones?.find((subunidad: Opcion) => subunidad.value === selectedSubunidad)?.cuadriculas?.map((cuadricula) => (
                                    <option key={cuadricula.value} value={cuadricula.value}>
                                        {cuadricula.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                {selectedSubsubunidad && opciones.find((unidad: Opcion) => unidad.value === selectedUnidad)?.subdivisiones?.find((subunidad: Opcion) => subunidad.value === selectedSubunidad)?.subdivisiones?.find((subsubunidad: Opcion) => subsubunidad.value === selectedSubsubunidad)?.cuadriculas && (
                    <div className='flex flex-col xl:h-full 2xl:h-full xl:w-full'>
                        <span className='ml-4 font-medium xl:text-vw'> Cuadricula </span>

                        <select
                            className="border open-sans mt-0.5 border-gray-300 rounded-md w-full h-10 xl:h-8/10 mx-2 xl:w-full 2xl:h-10 2xl:w-full"
                            name="cuadricula"
                            value={selectedCuadricula}
                            onChange={handleCuadriculaChange}
                        >
                            <option value="">Seleccione una cuadrícula</option>
                            {opciones.find((unidad) => unidad.value === selectedUnidad)?.subdivisiones?.find((subunidad: Opcion) => subunidad.value === selectedSubunidad)?.subdivisiones?.find((subsubunidad: Opcion) => subsubunidad.value === selectedSubsubunidad)?.cuadriculas?.map((cuadricula) => (
                                <>
                                    <option key={cuadricula.value} value={cuadricula.value}>
                                        {cuadricula.nombre}
                                    </option>
                                </>
                            ))}
                        </select>
                    </div>
                )}


            </div>
        </div>
    )
}

export default SelectCargaDenuncias


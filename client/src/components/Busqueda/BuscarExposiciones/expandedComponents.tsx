/*
_____________________________________________________________________________________________ 
Uso del componente:
    expandedComponents es una dependencia de la tabla mostrada en /MisDenuncias 
    Recibe los datos de la víctima, victimario y hecho para mostrarlos en una tabla
    y en un mapa. Además, se puede editar la denuncia y eliminarla.
_____________________________________________________________________________________________
*/
// Hooks
import { useState, useEffect } from 'react';
// APIs del BackEnd
import { eliminarExposicion } from '../../../api/crud';
// Librerías react
import Swal from 'sweetalert2' // Librería para mostrar popups
// Iconos
import {  TrashIcon } from '@heroicons/react/24/solid'
// Componentes
import SimpleTableCheckorX from '../../../components/ShowData/SimpleTableCheckorX';
import ShowTextArea from '../../../components/ShowData/ShowTextArea';
interface expandedComponentsProps {
    data: any
}
function expandedComponents({ data }: expandedComponentsProps) {

    // Estado de editar global
    const [editGlobal, setEditGlobal] = useState(false)
    // Datos del hecho

    const victimaDatosMostrar = [
        { nombre: "Nombre de la víctima", valor: data.nombre_victima },
        { nombre: "Apellido de la víctima", valor: data.apellido_victima },
        { nombre: "Edad víctima", valor: data.edad_victima },
        { nombre: "DNI víctima", valor: data.DNI_victima },
        { nombre: "Estado civil víctima", valor: data.estado_civil_victima },
        { nombre: "Ocupación víctima", valor: data.ocupacion_victima },
        { nombre: "Nacionalidad de la víctima", valor: data.nacionalidad_victima },
        { nombre: "Dirección víctima", valor: data.direccion_victima },
        { nombre: "Teléfono víctima", valor: data.telefono_victima },
        { nombre: "Con instrucción", valor: data.sabe_leer_y_escribir_victima },
    ]

    const secretarioDatosMostrar = [
        { nombre: "Nombre del secretario", valor: data.secretario.nombre_completo_secretario },
        { nombre: "Jerarquía secretario", valor: data.secretario.jerarquia_secretario },
        { nombre: "Plaza secretario", valor: data.secretario.plaza_secretario },
    ]

    const instructorDatosMostrar = [
        { nombre: "Nombre del instructor", valor: data.instructor.nombre_completo_instructor },
        { nombre: "Jerarquía instructor", valor: data.instructor.jerarquia_instructor },
    ]
    // Controlar cuando se da a eliminar
    const handleDelete = async (data: any) => {
        // Popup de confirmación
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0C4A6E',
            cancelButtonColor: '#FF554C',
            confirmButtonText: 'Sí, borrar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // Llamada a la API
                    eliminarExposicion(data._id)
                    // Mensaje de éxito
                    Swal.fire({
                        title: 'Borrado',
                        text: 'La denuncia ha sido borrada con éxito',
                        icon: 'success',
                        confirmButtonColor: '#0C4A6E',
                    }).then(() => {
                        window.location.reload()
                    })

                } catch (error) {
                    // Si hay un error
                    Swal.fire({
                        title: 'Error',
                        text: 'Hubo un error al borrar la denuncia',
                        icon: 'error',
                        confirmButtonColor: '#0C4A6E',
                    }
                    )
                }
            }
        })
    }

    return <div className="flex flex-col p-2 sm:p-10 max-w-prose sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl">
        {!editGlobal &&
            <>
                <h1 className='text-3xl my-5 font-sans	'>Datos de la víctima</h1>
                <div className='flex flex-col'>
                    <SimpleTableCheckorX campo="" datos={victimaDatosMostrar} />
                </div>

                <h2 className='text-3xl my-5 font-sans	'>Exposición</h2>
                <div className="flex flex-row">
                    <ShowTextArea campo="Observaciones" dato={data.observaciones} />
                </div>

                {data.preguntas.desea_agregar_quitar_o_enmendar &&
                    <>
                        <h2 className='text-3xl my-5 font-sans	'>Exposición</h2>
                        <div className="flex flex-row">
                            <ShowTextArea campo="Observaciones" dato={data.agrega} />
                        </div>
                    </>
                }
            </>
        }
        <h2 className='text-3xl my-5 font-sans'>Secretario</h2>
        <div className='flex flex-row'>
            <SimpleTableCheckorX campo="" datos={secretarioDatosMostrar} />
        </div>

        <h2 className='text-3xl my-5 font-sans'>Instructor</h2>
        <div className='flex flex-row'>
            <SimpleTableCheckorX campo="" datos={instructorDatosMostrar} />
        </div>
        <div className='my-5 flex flex-col md:flex-row items-center justify-center w-full '>

            <div className='bg-sky-950 hover:bg-sky-700 text-white cursor-pointer font-bold py-2 px-4 rounded w-6/10 md:w-2/10 flex items-center justify-center mx-2 mt-2 md:mt-0' onClick={() => handleDelete(data)}>
                <TrashIcon className="w-7" />
            </div>
        </div>


    </div>

}

export default expandedComponents
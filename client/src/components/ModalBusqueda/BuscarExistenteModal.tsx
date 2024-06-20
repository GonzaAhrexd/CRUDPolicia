import { useForm } from 'react-hook-form';
import { useState } from 'react';
// Backend APIs
import { buscarVictima, buscarVictimario, buscarTercero } from '../../api/crud';
// Componentes
import InputRegister from '../InputComponents/InputRegister';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';


interface BuscarExistenteModalProps {
    variante: string
    setOpenModal: any
    setVictimaCargar: any

}
function BuscarExistenteModal({ variante, setOpenModal, setVictimaCargar }: BuscarExistenteModalProps) {
    const [victimasMostrar, setVictimasMostrar] = useState([]);
    const [mostrarAlerta, setMostrarAlerta] = useState("");

    const { register, handleSubmit, formState: { errors } } = useForm();

    const fetchVictimas = async (values: any) => {
        let result
        if (variante == "Víctima") {
            const valoresFormateadosVictima = {
                nombre_victima: values.nombre,
                apellido_victima: values.apellido,
                dni_victima: values.dni,
                numero_de_expediente: values.numero_de_expediente
            }
            result = await buscarVictima(valoresFormateadosVictima);
        }else if(variante == "Victimario"){
            const valoresFormateadosVictimarios = {
                nombre_victimario: values.nombre,
                apellido_victimario: values.apellido,
                dni_victimario: values.dni,
                numero_de_expediente: values.numero_de_expediente
            }
            result = await buscarVictimario(valoresFormateadosVictimarios);
        }
        else if(variante == "Tercero"){
            const valoresFormateadosTercero = {
                nombre_tercero: values.nombre,
                apellido_tercero: values.apellido,
                dni_tercero: values.dni,
            }
            result = await buscarTercero(valoresFormateadosTercero);
        }

        setVictimasMostrar(result);
        console.log(result);
    };

    const handleBusqueda = (values: any) => {
        console.log(values);
        fetchVictimas(values);
    };

    const onSubmit = (values: any) => {
        setVictimasMostrar([]);
        if (!values.nombre && !values.apellido && !values.dni && !values.numero_de_expediente) {
            setMostrarAlerta("Rellene al menos un campo");
            return;
        }
        setMostrarAlerta("");
        handleBusqueda(values);
    };

    const handleVictimaExistente = (victima: any) => {
        setVictimaCargar(victima);
        setOpenModal(false);
    }

    return (
        <div>
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="bg-white w-6/10 h-9/10 rounded p-5 relative overflow-auto">
                    <h2 className="text-2xl mb-4">Buscar {variante} Existente</h2>

                    <XCircleIcon onClick={() => setOpenModal(false)} className="cursor-pointer h-10 rounded absolute top-0 right-0 m-2 text-black" />

                    <form
                        className="w-full flex flex-col items-center"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        {mostrarAlerta && (
                            <span className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-5" role="alert">
                                {mostrarAlerta}
                            </span>
                        )}
                        <InputRegister busqueda={true} campo="Nombre" nombre="nombre" register={register} require={false} type="text" error={errors.nombre} />
                        <InputRegister busqueda={true} campo="Apellido" nombre="apellido" register={register} require={false} type="text" error={errors.apellido} />
                        <InputRegister busqueda={true} campo="DNI" nombre="dni" register={register} require={false} type="text" error={errors.dni_victima} />
                        <InputRegister campo="Número de expediente" nombre="numero_de_expediente" register={register} type="text" error={errors.numero_de_expediente} require={false} />
                        <button className="bg-sky-950 hover:bg-sky-900 text-white font-bold py-2 px-4 rounded w-3/10">Buscar</button>
                    </form>

                    <table className="table-auto w-full">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Nombre</th>
                                <th className="px-4 py-2">Apellido</th>
                                <th className="px-4 py-2">DNI</th>
                                <th className="px-4 py-2">Seleccionar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {victimasMostrar.map((victima: any, index: number) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-gray-200' : ''}>
                                    <td className="border px-4 py-2">{victima.nombre}</td>
                                    <td className="border px-4 py-2">{victima.apellido}</td>
                                    <td className="border px-4 py-2">{victima.DNI}</td>
                                    <td className="border px-4 py-2 flex items-end justify-center">
                                        <CheckCircleIcon className="h-12 text-black font-bold cursor-pointer" onClick={() => handleVictimaExistente(victima)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    );
}

export default BuscarExistenteModal;
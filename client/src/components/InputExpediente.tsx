import React from 'react'
import { Interface } from 'readline'
interface InputExpedienteProps {
    campo: string;
    nombre: string;
    register: any;
    type: string;
    error: any;
    placeholder?: string;
    setValue?: any;
    valor?: any;
    comisariaPertenece?: any;
}

function InputExpediente({campo, nombre, register, type, error, placeholder, setValue, valor, comisariaPertenece}: InputExpedienteProps) {
    
    const handleDate = () => {
        //Obtener solo los últimos 2 números del año
        let date = new Date()
        let year = date.getFullYear().toString()
        return "-E/" + year
    }


//130/371-******-E/2024
    return (
        <div className={`flex flex-col`}>
            <span className={`font-medium ml-4 xl:text-vw`}> {nombre === "id" ? "" : campo} {error && <span className='text-red-500'>Requerido</span>} </span>
            <div className="grid grid-cols-4">
            <input className={`border open-sans border-gray-300 rounded-md h-10 xl:h-8 ${campo === "Cantidad" && "xl:w-16"} 2xl:h-10 my-2 xl:my-1 xl:m-2 m-4 pl-2`} type={type} defaultValue="130/"
                {...register("PrefijoExpediente", { required: true })} placeholder={placeholder} />            
            <input className={`border open-sans border-gray-300 rounded-md h-10 xl:h-8 ${campo === "Cantidad" && "xl:w-16"} 2xl:h-10 my-2 xl:my-1 xl:m-2 m-4 pl-2`} type={type}
                {...register(nombre, { required: true })} placeholder={placeholder} defaultValue={comisariaPertenece}/>
                            <input className={`border open-sans border-gray-300 rounded-md h-10 xl:h-8 ${campo === "Cantidad" && "xl:w-16"} 2xl:h-10 my-2 xl:my-1 xl:m-2 m-4 pl-2`} type={type}
                {...register("Expediente", { required: true })}  placeholder={placeholder} />
            <input className={`border open-sans border-gray-300 rounded-md h-10 xl:h-8 ${campo === "Cantidad" && "xl:w-16"} 2xl:h-10 my-2 xl:my-1 xl:m-2 m-4 pl-2`} type={type} defaultValue={handleDate()  }
                {...register("SufijoExpediente", { required: true })}  placeholder={placeholder} />

                </div>
        </div>
  )
}

export default InputExpediente
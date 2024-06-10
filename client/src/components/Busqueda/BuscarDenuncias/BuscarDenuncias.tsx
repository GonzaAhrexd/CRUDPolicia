// Componentes
import InputDate from '../../InputComponents/InputDate';
import InputRegister from '../../InputComponents/InputRegister';
import InputCheckbox from '../../InputComponents/InputCheckbox';
import SelectDivisionMunicipios from '../../Select/SelectDivisionMunicipios';
// Backend APIs
import { buscarDenuncias } from '../../../api/crud';
// Hooks
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import DataTable from 'react-data-table-component';

import { columnsDenuncia } from './columnsDataTableDenuncias'
import expandedComponents from './expandedComponents'
import { customStyles } from './dataTableStyles'

// Iconos
import { ArrowDownCircleIcon, ArrowUpCircleIcon } from '@heroicons/react/24/outline'

// Campos
import { unidadCampos } from '../../../GlobalConst/unidadCampos';

import Excel from './Excel';

function BuscarDenuncias() {
    const [denunciasAMostrar, setDenunciasAMostrar] = useState([]);
    const { register, handleSubmit, setValue, formState: {
        errors
    } } = useForm()
    const handleBusqueda = async (values: any) => {
        const fetchDenuncias = async () => {
            const result = await buscarDenuncias(values);
            setDenunciasAMostrar(result)
          
        }
        fetchDenuncias();
    }

    
    // Iconos para expandir
    const expandableIcon = {
        collapsed: <ArrowDownCircleIcon className='h-6 w-6' />,
        expanded: <ArrowUpCircleIcon className='h-6 w-6' />
    }

    

    return (
        <>
            <form className="w-full flex flex-col items-center"
                onSubmit={
                    handleSubmit(async (values) => {

                        // Separa la unidad en division, municipio y comisaria siempre que tenga una , para separar, sino no
                        if(values.unidad){
                            values.unidad = values.unidad.split(',')                        
                            values.municipio = values.unidad[1]
                            values.comisaria = values.unidad[2]
                        }
                        handleBusqueda(values)
                    }

                    )}>
                <InputDate campo="Desde" nombre="desde" register={register} type="date" error={errors.desde} require={true}></InputDate>
                <InputDate campo="Hasta" nombre="hasta" register={register} type="date" error={errors.hasta} require={true}></InputDate>
                <InputRegister campo="Número de expediente" nombre="numero_de_expediente" register={register} type="text" error={errors.numero_de_expediente} require={false}></InputRegister>
                <div className='flex flex-col xl:flex-row w-full items-center justify-center'>
                    <SelectDivisionMunicipios isRequired={false} campo="División, Municipio y Comisaría" nombre="division" opciones={unidadCampos} register={register} setValue={setValue} type="text" error={errors.division} />
                </div>
                <InputCheckbox campo="Falta rellenar el expediente" nombre="is_expediente_completo" register={register} error={errors.is_expediente_completo} id="is_expediente_completo" type="checkbox" setValue={setValue}></InputCheckbox>
                <button className="bg-sky-950 hover:bg-sky-900 text-white font-bold py-2 px-4 rounded w-3/10"> Buscar</button>        
            </form>
            
            <div className="flex flex-col w-full">
                 
                    <h2 className='text-2xl my-5'>Denuncias</h2>
                   
            <div className="w-full flex flex-col items-center my-2"> 
             {denunciasAMostrar.length > 0 && 
                <Excel denunciasAMostrar={denunciasAMostrar}></Excel>
             }
            </div>
                    <DataTable
                        columns={columnsDenuncia}
                        data={denunciasAMostrar}
                        pagination
                        expandableRows
                        expandableRowsComponent={expandedComponents}
                        customStyles={customStyles}
                        responsive={true}
                        striped={true}
                        highlightOnHover={true}
                        noDataComponent="No hay denuncias para mostrar"
                        defaultSortFieldId={"Fecha"}
                        expandableIcon={expandableIcon}
                    />
                </div>
            

        </>
    )
}

export default BuscarDenuncias
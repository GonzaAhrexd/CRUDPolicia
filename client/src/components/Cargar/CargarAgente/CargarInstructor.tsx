// Hooks
import { UseFormRegister, UseFormSetValue, FieldErrors } from 'react-hook-form';
// Componentes
import InputRegister from '../../InputComponents/InputRegister'
import SelectRegister from '../../Select/SelectRegister'

// Campos 

import { jerarquiaCampos } from '../../../GlobalConst/jerarquiaCampos';
// Props
interface CargarVictimaProps {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  errors: FieldErrors;
}

function CargarInstructorYSecretario({ register, setValue, errors }: CargarVictimaProps) {

  return (
    <>
      <h1 className='text-2xl my-5'>Instructor</h1>
      <div className='flex justify-center'>
        <div className='w-full lg:w-6/10'>
          <div className='flex flex-col lg:flex-row my-2'>
            <InputRegister  campo="Nombre y apellido" nombre="nombre_completo_instructor" register={register} setValue={setValue} type="text" error={errors.nombre_completo_instructor} />
            <SelectRegister campo='Jerarquía' nombre="jerarquia_instructor" opciones={jerarquiaCampos} register={register} setValue={setValue} type="text" error={errors.jerarquia_instructor} />
          </div>
        </div>
      </div>
      <h1 className='text-2xl my-5'>Secretario</h1>
      <div className='flex justify-center'>
        <div className='w-full lg:w-6/10'>
          <div className='flex flex-col lg:flex-row my-2'>
            <InputRegister  campo="Nombre y apellido" nombre="nombre_completo_secretario" register={register} setValue={setValue} type="text" error={errors.nombre_completo_instructor} />
            <SelectRegister campo='Jerarquía' nombre="jerarquia_secretario" opciones={jerarquiaCampos} register={register} setValue={setValue} type="text" error={errors.jerarquia_instructor} />
            <InputRegister  campo="Plaza" nombre="plaza_secretario" register={register} setValue={setValue} type="text" error={errors.plaza} />
          </div>
        </div>
      </div>
    </>
  )
}

export default CargarInstructorYSecretario
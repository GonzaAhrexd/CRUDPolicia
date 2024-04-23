import { useState } from 'react'
import InputRegister from './InputRegister'
import SelectRegister from './SelectRegister'
import { useForm } from 'react-hook-form'
import InputCheckbox from './InputCheckbox'
function CargarVictima() {


  const [isHijos, setIsHijos] = useState(false)
  const [isHijosConAgresor, setIsHijosConAgresor] = useState(false)


  const { register, setValue, formState: {
    errors
  } } = useForm()

  const estadoCivil = [
    { nombre: 'Soltero/a', value: 'Soltero/a' },
    { nombre: 'Casado/a', value: 'Casado/a' },
    { nombre: 'Convivente', value: 'Convivente' },
    { nombre: 'Separado/a', value: 'Separado/a' },
    { nombre: 'Divorciado/a', value: 'Divorciado/a' },
    { nombre: 'Viudo/a', value: 'Viudo/a' },
  ]
  const ocupaciones = [
    // Empleado, Jornalero, Personal de Salud, Personal de educación, Profesional, Jubilado, Estudiante, Albañil, Policia, PFA, SPP, SPF, PSA, GNA, Ejército Argentina, PNA, Desocupado, Ama de casa, Empleado público, Comerciante, 
    { nombre: 'Empleado', value: 'Empleado' },
    { nombre: 'Empleado público', value: 'Empleado público' },
    { nombre: 'Jornalero', value: 'Jornalero' },
    { nombre: 'Comerciante', value: 'Comerciante' },
    { nombre: 'Personal de Salud', value: 'Personal de Salud' },
    { nombre: 'Personal de educación', value: 'Personal de educación' },
    { nombre: 'Profesional', value: 'Profesional' },
    { nombre: 'Jubilado', value: 'Jubilado' },
    { nombre: 'Estudiante', value: 'Estudiante' },
    { nombre: 'Albañil', value: 'Albañil' },
    { nombre: 'Policía Provincial', value: 'Policía Provincial' },
    { nombre: 'Policía Federal Argentina', value: 'Policía Federal Argentina' },
    { nombre: 'Servicio Penitenciario Provincial', value: 'Servicio Penitenciario Provincial' },
    { nombre: 'Servicio Penitenciario Federal', value: 'Servicio Penitenciario Federal' },
    { nombre: 'Policía de Seguridad Aeroportuaria', value: 'Policía de Seguridad Aeroportuaria' },
    { nombre: 'Gendarmería Nacional Argentina', value: 'Gendarmería Nacional Argentina' },
    { nombre: 'Ejército Argentino', value: 'Ejército Argentino' },
    { nombre: 'Prefectura Naval Argentina', value: 'Prefectura Naval Argentina' },
    { nombre: 'Desocupado', value: 'Desocupado' },
    { nombre: 'Ama de casa', value: 'Ama de casa' },
  ]

  const vinculoConAgresor = [
    { nombre: 'Ninguno', value: 'Ninguno' },
    //Parejas
    { nombre: 'Novio/a', value: 'Novio/a' },
    { nombre: 'Ex Novio/a', value: 'Ex Novio/a' },
    { nombre: 'Esposo/a', value: 'Esposo/a' },
    { nombre: 'Ex esposo/a', value: 'Ex esposo/a' },
    { nombre: 'Concubino/a', value: 'Concubino/a' },
    { nombre: 'Ex Concubino/a', value: 'Ex Concubino/a' },
    //Familia
    { nombre: 'Hijo/a', value: 'Hijo/a' },
    { nombre: 'Padre', value: 'Padre' },
    { nombre: 'Madre', value: 'Madre' },
    { nombre: 'Hermano/a', value: 'Hermano/a' },
    { nombre: 'Tío/a', value: 'Tío/a' },
    { nombre: 'Sobrino/a ', value: 'Sobrino/a' },
    { nombre: 'Nieto/a', value: 'Nieto/a' },
    { nombre: 'Abuelo/a', value: 'Abuelo/a' },
    { nombre: 'Primo/a', value: 'Primo/a' },
    //No familia
    { nombre: 'Cuñado/a', value: 'Cuñado/a' },
    { nombre: 'Ex cuñado/a', value: 'Ex cuñado/a' },
    { nombre: 'Suegro/a', value: 'Suegro/a' },
    { nombre: 'Ex suegro/a', value: 'Ex suegro/a' },
    { nombre: 'Yerno', value: 'Yerno' },
    { nombre: 'Nuera', value: 'Nuera' },
    { nombre: 'Madrastra', value: 'Madrastra' },
    { nombre: 'Padrastro', value: 'Padrastro' },
    { nombre: 'Hijastro', value: 'Hijastro' },
    { nombre: 'Colega', value: 'Colega' },
    { nombre: 'Otros', value: 'Otros' },
  ]

  const condicionVulnerabilidad = [
    { nombre: 'Ninguna', value: 'Ninguna' },
    { nombre: 'Embarazo', value: 'Embarazo' },
    { nombre: 'Periodo Post-parto', value: 'Periodo Post-parto' },
    { nombre: 'Periodo de Lactancia', value: 'Lactancia' },
    { nombre: 'Discapacidad', value: 'Discapacidad' },
    { nombre: 'Enfermedad Crónica', value: 'Enfermedad Crónica' },
    { nombre: 'Adulto mayor', value: 'Adulto mayor' },
    { nombre: 'Menor de edad', value: 'Menor de edad' },
    { nombre: 'Tratamiento psicológico', value: 'Tratamiento psicológico' }
  ]

  return (
    <div className='w-6/10'>
      <div className='flex flex-col md:flex-row'>
        <InputRegister campo="Nombre" nombre="nombre" register={register} setValue={setValue} type="text" error={errors.nombre} />
        <InputRegister campo="Apellido" nombre="apellido" register={register} setValue={setValue} type="text" error={errors.apellido} />
      </div>

      <div className='flex flex-col md:flex-row'>
        <InputRegister campo="Edad" nombre="edad" register={register} setValue={setValue} type="number" error={errors.edad} />
        <InputRegister campo="DNI" nombre="dni" register={register} setValue={setValue} type="text" error={errors.apellido} />
      </div>

      <div className='flex flex-col md:flex-row'>
        <SelectRegister campo="Estado Civil" nombre="estado_civil" opciones={estadoCivil} register={register} setValue={setValue} type="text" error={errors.estado_civil} />
        <SelectRegister campo="Ocupación" nombre="ocupacion" opciones={ocupaciones} register={register} setValue={setValue} type="text" error={errors.ocupaciones} />
      </div>
      <div className='flex flex-col md:flex-row'>
        <SelectRegister campo="Vinculo con el Agresor" nombre="vinculo_con_agresor" opciones={vinculoConAgresor} register={register} setValue={setValue} type="text" error={errors.vinculo_con_agresor} />
        <SelectRegister campo="Condición de Vulnerabilidad" nombre="condicion_de_vulnerabilidad" opciones={condicionVulnerabilidad} register={register} setValue={setValue} type="text" error={errors.ocupaciones} />
      </div>
      <div className={`grid grid-cols-1 md:grid-cols-4`}>
        <InputCheckbox campo="Convivencia " nombre="Convivencia" register={register} setValue={setValue} type="checkbox" error={errors.compartenVivienda} />
        <InputCheckbox campo="Hijos" nombre="Hijos" register={register} setValue={setValue} type="checkbox" error={errors.hijos} setHook={setIsHijos} state={isHijos} />
        {isHijos &&
          <>
            <InputCheckbox campo="Dependencia económica" nombre="Dependencia económica" register={register} setValue={setValue} type="checkbox" error={errors.hijosmayores} />
            <InputCheckbox campo="Mayores de 18" nombre="Mayores de 18" register={register} setValue={setValue} type="checkbox" error={errors.hijosmayores} />
            <InputCheckbox campo="Menores de 18" nombre="Menores de 18" register={register} setValue={setValue} type="checkbox" error={errors.hijosmenores} />
            <InputCheckbox campo="Menores discapacitados" nombre="Menores discapacitados" register={register} setValue={setValue} type="checkbox" error={errors.menoresDiscapacitados} />
            <InputCheckbox campo="Hijos con el agresor" nombre="Hijos con el agresor" register={register} setValue={setValue} type="checkbox" error={errors.hijosconagresor} setHook={setIsHijosConAgresor} state={isHijosConAgresor} />
            {isHijosConAgresor &&
               <InputRegister campo="Cantidad" nombre="Cantidad hijos con el agresor" register={register} setValue={setValue} type="number" error={errors.apellido} />
            }
          </>
        }
      </div>



    </div>

  )
}

export default CargarVictima
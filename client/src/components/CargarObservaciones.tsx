import InputTextArea from './InputTextArea'

interface observacionesProps {
  register: any
  setValue: any
  errors: any
}

function CargarObservaciones({register, setValue, errors}: observacionesProps) {
 
  return (
    <>
        <InputTextArea campo="Observaciones" nombre="Observaciones" register={register} type="text" ></InputTextArea>
    </>
  )
}

export default CargarObservaciones
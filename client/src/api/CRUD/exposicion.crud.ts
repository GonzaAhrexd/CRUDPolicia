import axios from '../axios'

// EXPOSICIÓN
// Crear exposición
export const crearExposicion = (denuncia: any) => {
    try {
        axios.post(`/crear-exposicion/`, denuncia)
    } catch (error) {
        console.log(error)
    }
}

// Buscar exposición
export const buscarExposicion = async (values: any) => {
    try {
        const response = await axios.get(`/buscar-exposicion/${values.desde ? values.desde : "no_ingresado"}/${values.hasta ? values.hasta : "no_ingresado"}/${values.id_exposicion ? values.id_exposicion : "no_ingresado"}/${values.nombre_victima ? values.nombre_victima : "no_ingresado"}/${values.apellido_victima ? values.apellido_victima : "no_ingresado"}/${values.dni_victima ? values.dni_victima : "no_ingresado"}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// Eliminar exposición
export const eliminarExposicion = async (id: string) => {
    try {
        const response = await axios.delete(`/eliminar-exposicion/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }

}
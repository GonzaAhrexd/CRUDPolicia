import axios from '../axios'

export const agregarCampo = async (campo: any) => {
    try {
        const response = await axios.post('/agregar-campo', campo)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const obtenerCampo = async (tipo: string) => {
    try {
        const response = await axios.get(`/obtener-campo/${tipo}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const editarCampo = async (campo: any) => {
    try {
        const response = await axios.put(`/editar-campo/${campo._id}`, campo)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const eliminarCampo = async (id: string) => {
    try {
        const response = await axios.delete(`/eliminar-campo/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

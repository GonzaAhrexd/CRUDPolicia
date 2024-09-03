import axios from '../axios'


// Reportar errores
export const reportarErrores = async (values: any) => {
    try {
        const response = await axios.post(`/reporte-errores/`, values)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

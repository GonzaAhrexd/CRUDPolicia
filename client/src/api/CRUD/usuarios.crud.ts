import axios from '../axios'
//  USUARIOS
// Buscar usuario
export const buscarUsuario = async (values: any) => {
    try {
        const response = await axios.get(`/buscar-usuario/${values.nombre_de_usuario ? values.nombre_de_usuario : "no_ingresado"}/${values.nombre ? values.nombre : "no_ingresado"}/${values.apellido ? values.apellido : "no_ingresado"}/${values.rol ? values.rol : "no_ingresado"}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}
// Cambiar rol
export const cambiarRol = async (values: any) => {
    try {
        const response = await axios.put(`/cambiar-rol/`, values)
        return response.data
    } catch (error) {
        console.log(error)  
    }
}
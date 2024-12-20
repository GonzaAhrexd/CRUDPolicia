// Importamos mongoose para poder crear el modelo de la base de datos
import mongoose from 'mongoose'

// Creamos el esquema de victimario en la base de datos
const victimarioSchema = new mongoose.Schema({
    // Definición del nombre del victimario
    nombre: {
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true, // Trim para que no se guarden espacios en blanco
        uppercase: true //Uppercase para que se guarde en mayúsculas
    },
    // Definición del apellido del victimario
    apellido: {
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true, // Trim para que no se guarden espacios en blanco
        uppercase: true //Uppercase para que se guarde en mayúsculas
    },
    // Definición de la dirección del victimario
    direccion: {
        type: String, // Tipo de dato String
        required: false, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    // Definición de la edad del victimario
    edad: {
        type: Number, // Tipo de dato Number
        required: false, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    // Definición del DNI del victimario
    DNI: {
        type: String, // Tipo de dato String
        required: false, // Campo requerido
        trim: true, // Trim para que no se guarden espacios en blanco
        set: function(value: string) { // Función para remplazar los puntos y espacios del DNI
            return value.replace(/\./g, '').replace(/\s/g, '');
        }
        
    },
    // Definición del estado civil del victimario
    estado_civil: {
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    // Definición de la ocupación del victimario
    ocupacion: {
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    // Definición de la relación con la victima
    abuso_de_alcohol: { 
        type: Boolean, // Tipo de dato Boolean
        required: true, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    // Definición de antecedentes toxicologicos
    antecedentes_toxicologicos: {
        type: Boolean, // Tipo de dato Boolean
        required: true, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    // Definición de antecedentes penales
    antecedentes_penales: {
        type: Boolean, // Tipo de dato Boolean
        required: true, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    // Definición de antecedentes contravencionales
    antecedentes_contravencionales: {
        type: Boolean, // Tipo de dato Boolean
        required: true, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    antecedentes_psicologicos: {
        type: Boolean, // Tipo de dato Boolean
        required: true, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    // Definición de si tiene entrenamiento en combate
    entrenamiento_en_combate: {
        type: Boolean, // Tipo de dato Boolean
        required: true, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    denuncias_en_contra: {
        type: [String], // Tipo de dato Array
        required: true, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    esta_aprehendido: {
        type: Boolean,
        required: false,
        trim: true
    },
    fue_liberado: {
        type: Boolean,
        required: false,
        trim: true
    }
    },

    {
    timestamps: true // Timestamps para que guarde la fecha de creación y actualización
    }

)

// Creamos el modelo de victimario en la base de datos
const victimario = mongoose.model('victimario', victimarioSchema)
export default victimario;
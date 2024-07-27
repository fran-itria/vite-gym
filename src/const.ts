export const baseUrl = "http://localhost:3001"
export const baseUrlDeploy = "https://back-gym.onrender.com";

export const selects = {
    summary: "resumen",
    miSalud: "miSalud",
    shifts: "shifts"
};

export const typesElement = {
    text: "text",
    number: "number",
    email: "email",
    phone: "phone",
    password: "password",
    tel: "tel"
}

export const namesElements = {
    name: "name",
    email: "email",
    gymName: "gymName",
    age: "age",
    surname: "surname",
    dni: "dni",
    contactEmergency: "contactEmergency",
    user: "user",
    password: "password",
    phone: "phone"
}

export const labels = {
    name: "Nombre",
    email: "Email",
    gymName: "Nombre del gimnasio",
    age: "Edad",
    surname: "Apellido",
    dni: "Dni",
    contactEmergency: "Contacto de emergencia",
    user: "Usuario",
    password: "Contraseña",
    phone: "Telefono"
}

export const basicLoaders = {
    register: 'Registrando usuario',
    init: 'Iniciado sesión',
    out: 'Cerrando sesión',
    loading: 'Cargando',
    create: 'Creando',
    remove: 'Eliminando',
    save: 'Guardando',
    up: 'Subiendo'
}
export const specificLoaders = {
    routine: 'rutina',
    warm: 'calentamiento',
    day: 'día',
    pay: 'pago',
    shift: 'turno',
    exercise: 'ejercicio',
    meal: 'comida',
    users: 'usuarios',
    register: 'registros',
    load: 'carga',
    cahnges: 'cambios',
    image: 'foto',
    limit: 'límites'
}

export const momentsFood = ['Desayuno', 'Media mañana', 'Almuerzo', 'Merienda', 'Cena']
export const namesCreateFood = {
    date: 'date',
    hour: 'hour',
    moment: 'moment',
    food: 'food'
}

export const namesCreateTraining = {
    date: 'date',
    hour: 'hour',
    exercise: 'exercise',
    duration: 'duration',
    distance: 'distance'
}

export const storage = window.localStorage
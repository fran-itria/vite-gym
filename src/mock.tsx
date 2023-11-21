type User = {
    id: string,
    gym: string,
    dni: number,
    edad: number,
    nombre: string,
    apellido: string,
    email: string,
    usuario: string,
    telefono: number,
    emergency: number,
    admin: boolean,
    rutina: rutina[][],
    pay: boolean,
    payments: { day: string, amount: number }[],
    health: {
        comidas: {
            fecha: string,
            hora: string,
            moment: string,
            comida: string
        }[],
        ejercicios: {
            fecha: string,
            hora: string,
            ejercicio: string,
            time?: string,
            distance?: string
        }[]
    }
}

type rutina = {
    day: string,
    ejercicios: ejercicios[]
}


type ejercicios = {
    name: string,
    series: number,
    repeticiones: string,
    cargas: string[]
}

const rutina1 = [
    {
        day: 'dia 1',
        ejercicios: [
            {
                name: 'Flexiones',
                series: 3,
                repeticiones: 'Al fallo',
                cargas: ['17-16-15', '20-18-17']
            },
            {
                name: 'Press banco',
                series: 4,
                repeticiones: '12-10',
                cargas: ['30-32', '32-35', '35-37']
            }
        ]
    },
    {
        day: 'dia 2',
        ejercicios: [
            {
                name: 'Sentadillas',
                series: 3,
                repeticiones: '8',
                cargas: ['50', '55', '60']
            }
        ]
    }
]

const rutina2 = [
    {
        day: 'dia 1',
        ejercicios: [
            {
                name: 'Press plano',
                series: 3,
                repeticiones: '15',
                cargas: ['30', '35']
            },
            {
                name: 'Press inclinado con mancuernas',
                series: 4,
                repeticiones: '12-10',
                cargas: ['30-32', '32-35', '35-37']
            }
        ]
    },
    {
        day: 'dia 2',
        ejercicios: [
            {
                name: 'Cuadriceps',
                series: 4,
                repeticiones: '10',
                cargas: ['50', '55', '60']
            }
        ]
    }
]


export const user: User = {
    id: Math.floor(Math.random() * 999999).toString(),
    gym: 'Bunker',
    dni: 43349845,
    edad: 22,
    nombre: 'Franco',
    apellido: 'Itria',
    email: 'franco08river@gmail.com',
    usuario: 'fran.itria',
    telefono: 3434403870,
    emergency: 9999,
    admin: false,
    rutina: [rutina1, rutina2],
    pay: true,
    payments: [{ day: '21/11/2023', amount: 4500 }, { day: '15/12/2023', amount: 5000 }],
    health: {
        comidas: [
            {
                fecha: 'fecha actual',
                hora: '20:30', // elige el usuario
                moment: 'merienda', // desayuno | media mañana | almuerzo | merienda | cena
                comida: 'Taza de leche con galletitas' // lo que registre el usuario
            },
            {
                fecha: 'fecha actual',
                hora: '08:00', // elige el usuario
                moment: 'desayuno', // desayuno | media mañana | almuerzo | merienda | cena
                comida: 'Cafe con leche, tostadas con queso' // lo que registre el usuario
            },
        ],
        ejercicios: [
            {
                fecha: 'fecha actual',
                hora: '20:00', // elige el usuario
                ejercicio: 'Futbol 5', // desayuno | media mañana | almuerzo | merienda | cena
                time: '1h' // lo que registre el usuario
            },
            {
                fecha: 'hoy',
                ejercicio: 'correr',
                hora: '22:00',
                distance: '4km'
            },
        ]
    }
}

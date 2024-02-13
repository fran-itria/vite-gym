import { createTheme } from "@mui/material/styles";


declare module '@mui/material/styles' {
    interface Palette {
        tashIcon: Palette['primary'];
        pencil: Palette['primary']
    }

    interface PaletteOptions {
        tashIcon?: PaletteOptions['primary'];
        pencil?: PaletteOptions['primary']
    }
}

// declare module '@mui/icons-material/Delete' {
//     interface DeletePropsColorOverrides {
//         tashIcon: true;
//     }
// }

let theme = createTheme()
theme = createTheme(theme, {
    palette: {
        tashIcon: theme.palette.augmentColor({
            color: {
                main: '#d32f2f',
                light: '#ef5350',
                dark: '#b71c1c'
            },
            name: 'tashIcon'
        }),
        pencil: theme.palette.augmentColor({
            color: {
                main: '#03a9f4',
                light: '#81d4fa',
                dark: '#01579b',
            },
            name: 'pencil'
        })
    }
})

export default theme 
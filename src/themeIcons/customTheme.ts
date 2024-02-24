import { createTheme } from "@mui/material/styles";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import { blue } from "@mui/material/colors";


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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: blue[700],
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 15,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default theme
export { StyledTableCell, StyledTableRow }
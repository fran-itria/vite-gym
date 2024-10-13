import { createTheme } from "@mui/material/styles";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';

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
        backgroundColor: '#083344',
        color: theme.palette.common.white,
        border: '3px solid #083344',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 15,
        color: theme.palette.common.white,
    },
}));

const StyledTableRow = styled(TableRow)(() => ({
    '&:nth-of-type(odd)': {
        backgroundColor: '#164e63',
    },
    backgroundColor: '#155e75',
    border: '3px solid #083344',
}));

export default theme
export { StyledTableCell, StyledTableRow }
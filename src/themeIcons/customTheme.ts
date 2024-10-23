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

const getSystemTheme = () => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'light';
};
const systemTheme = getSystemTheme();

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


console.log(systemTheme)
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: systemTheme == 'dark' ? '#083344' : '#1f2937',
        color: theme.palette.common.white,
        border: systemTheme == 'dark' ? '3px solid #083344' : '3px solid #1f2937',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 15,
        color: systemTheme == 'dark' ? theme.palette.common.white : theme.palette.common.black,
    },
}));

const StyledTableRow = styled(TableRow)(() => ({
    '&:nth-of-type(odd)': {
        backgroundColor: systemTheme == 'dark' ? '#164e63' : '#9ca3af',
    },
    backgroundColor: systemTheme == 'dark' ? '#155e75' : '#d4d4d8',
    border: systemTheme == 'dark' ? '3px solid #083344' : '3px solid #1f2937',
}));

export default theme
export { StyledTableCell, StyledTableRow }
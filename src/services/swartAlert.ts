import Swal from "sweetalert2";

export default function sweetAlert(title: string) {
    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = isDarkMode ? 'dark' : 'light'
    const Toast = Swal.mixin({
        toast: true,
        position: "bottom",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        color: theme == 'dark' ? "white" : 'black',
        background: theme === 'dark' ? '#164e63' : '#cbd5e1',
    });

    Toast.fire({
        icon: "error",
        title,
    });
}
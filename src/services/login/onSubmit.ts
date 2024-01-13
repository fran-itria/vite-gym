import { login } from "./login";
import { submitProps } from "../typeServices";

export const onSubmit = async ({ event, inputs, navigate }: submitProps) => {
  event.preventDefault();
  try {
    const response = await login(inputs);
    if (response.status == 200) {
      // se guardará la informacion del usuario en un estado global
      navigate("/home");
    }
  } catch (error) {
    window.alert("No se pudo iniciar sesión");
  }
};

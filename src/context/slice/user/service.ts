import { AppDispatch } from "@/context/store";
import { addLocalUser, removeLocalUser, updateLocalUser } from "./userSlice";
import { toast } from "react-toastify";

const CreateUserService =
    (data: User) =>
        async (dispatch: AppDispatch) => {
            const localUsers = localStorage.getItem("users");
            let response = false;

            if (localUsers) {
                const users = JSON.parse(localUsers);
                const user = users.find((user: User) => user.dni === data.dni);
                if (user) {
                    console.log("El usuario ya existe");
                    toast.error("El usuario ya existe");
                    response = false;
                } else {
                    dispatch(addLocalUser(data));
                    toast.success("Usuario creado correctamente")
                    response = true;
                }
            }
            return response;

        };


const UpdateUserService =
    (data: User, compare: User) =>
    async (dispatch: AppDispatch) => {
            const localUsers = localStorage.getItem("users");
            let response = false;
            if (data.dni === compare.dni) {
                dispatch(updateLocalUser(data));
                toast.success("Usuario actualizado correctamente")
                response = true;
            } else {
                if (localUsers) {
                    const users = JSON.parse(localUsers);
                    const user = users.find((user: User) => user.dni === data.dni);
                    if (user) {
                        console.log("El usuario ya existe");
                        toast.error("El usuario ya existe");
                        response = false;
                    } else {
                        dispatch(updateLocalUser(data));
                        toast.success("Usuario actualizado correctamente")
                        response = true;
                    }
                }
            }
            return response;

        };
const DeleteUserService = (data: User) => (dispatch: AppDispatch) => {
    dispatch(removeLocalUser(data));
    toast.success("Usuario eliminado correctamente");
}




export { CreateUserService, UpdateUserService, DeleteUserService }
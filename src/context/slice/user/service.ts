import { AppDispatch } from "@/context/store";
import { addLocalUser, removeLocalUser, updateLocalUser } from "./userSlice";
import { toast } from "react-toastify";

const CreateUserService =
    (data: User) =>
        async (dispatch: AppDispatch) => {

            const localUsers = localStorage.getItem("users");

            if (localUsers) {
                const users = JSON.parse(localUsers);
                const user = users.find((user: User) => user.dni === data.dni);
                if (user) {
                    console.log("El usuario ya existe");
                    toast.error("El usuario ya existe");
                } else {
                    dispatch(addLocalUser(data));
                    toast.success("Usuario creado correctamente")

                }
            }

        };


const UpdateUserService =
    (data: User, compare: User) =>
        async (dispatch: AppDispatch) => {

            const localUsers = localStorage.getItem("users");
            if (data.dni === compare.dni) {
                dispatch(updateLocalUser(data));
                toast.success("Usuario actualizado correctamente")
            } else {
                if (localUsers) {
                    const users = JSON.parse(localUsers);
                    const user = users.find((user: User) => user.dni === data.dni);
                    if (user) {
                        console.log("El usuario ya existe");
                        toast.error("El usuario ya existe");
                    } else {
                        dispatch(updateLocalUser(data));
                        toast.success("Usuario actualizado correctamente")
                    }
                }
            }

        };
const DeleteUserService = (data: User) => async (dispatch: AppDispatch) => {
    dispatch(removeLocalUser(data));
    toast.success("Usuario eliminado correctamente");
}




export { CreateUserService, UpdateUserService, DeleteUserService }
import { CreateUserService, DeleteUserService, UpdateUserService } from "@/context/slice/user/service";
import { useAppDispatch } from "@/context/store";
import { LockClosedIcon, UserIcon } from "@heroicons/react/20/solid";
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from "@nextui-org/react";
import { SubmitHandler } from "react-hook-form";
import Form from "../common/Form";
import { loadLocalUsers } from "@/context/slice/user/userSlice";
import { onlyLetter, onlyNumber } from "@/utils/validations";

type Props = {
    open: boolean;
    onOpenChange: () => void
    title: string;
    type: "edit" | "delete" | "create"
    item?: User;
};

const ModalUser = ({ open, onOpenChange, title, type, item }: Props) => {
    const dispatch = useAppDispatch();
    const onSubmit: SubmitHandler<User> = (data) => {
        if (type === "create") {
            dispatch(CreateUserService(data)).then((response) => {
                if (response) {
                    onOpenChange()
                }

            })
        }
        else if (type === "edit") {
            item && dispatch(UpdateUserService(data, item)).then((response) => {
                if (response) {
                    onOpenChange()
                }

            })
        }
        else {
            item && dispatch(DeleteUserService(item))
            onOpenChange()
        }
        dispatch(loadLocalUsers())
    };

    return (
        <>
            <Modal isOpen={open} onOpenChange={onOpenChange} >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
                            <ModalBody>
                                <Form<User>
                                    onSubmit={onSubmit}
                                    className="flex flex-col space-y-5 p-10 "
                                >
                                    {({ register, watch, formState: { errors } }) => (
                                        <>
                                            {
                                                type === "delete" ? (
                                                    <p className="text-center text-lg font-bold">
                                                        ¿Esta seguro de eliminar el usuario {item?.first_name} {item?.last_name}?
                                                    </p>
                                                ) : <>
                                                    <Input
                                                        isRequired
                                                        type="text"
                                                        label="Nombres"
                                                        onKeyDown={onlyLetter}
                                                        defaultValue={item?.first_name}
                                                        radius="none"
                                                        {...register("first_name", {
                                                            required: true,
                                                            maxLength: 30,
                                                        })}
                                                    />
                                                    <Input
                                                        isRequired
                                                        radius="none"
                                                        defaultValue={item?.last_name}
                                                        label="Apellidos"
                                                        onKeyDown={onlyLetter}

                                                        {...register("last_name", {
                                                            required: true,
                                                            maxLength: 30,
                                                        })}
                                                        type="text"
                                                    />
                                                    <Input
                                                        isRequired
                                                        radius="none"
                                                        defaultValue={item?.email}
                                                        label="Correo"
                                                        {...register("email", {
                                                            required: true,
                                                            maxLength: 30,
                                                        })}
                                                        type="email"
                                                    />
                                                    <Input
                                                        isRequired
                                                        defaultValue={item?.dni}
                                                        onKeyDown={onlyNumber}
                                                        radius="none"
                                                        label="DNI"
                                                        {...register("dni", {
                                                            required: true,
                                                            maxLength: 30,
                                                        })}
                                                        type="text"
                                                    />

                                                </>
                                            }
                                            <Button
                                                color={
                                                    watch("first_name") && watch("last_name") && watch("email") && watch("dni") ? "primary" : "default"
                                                }
                                                radius="none"
                                                type="submit"
                                                className=" font-bold"
                                                style={{ letterSpacing: "0.1em" }}
                                                size="lg"
                                                endContent={<LockClosedIcon className="h-5 w-5" />}
                                            >
                                                {type === "create" ? "Crear" : type === "edit" ? "Editar" : "Eliminar"}
                                            </Button>
                                        </>
                                    )}
                                </Form>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="danger"
                                    variant="light"
                                    onPress={onClose}
                                >
                                    Cancelar
                                </Button>

                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalUser;

"use client"
import { useCallback, useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, user, Tooltip, Button, useDisclosure } from "@nextui-org/react";
import { useAppDispatch, useAppSelector } from "@/context/store";
import { loadLocalUsers } from "@/context/slice/user/userSlice";
import ModalUser from "./ModalUser";

const columns = [
    {
        key: "first_name",
        label: "NOMBRES",
    },
    {
        key: "last_name",
        label: "APELLIDOS",
    },
    {
        key: "email",
        label: "EMAIL",
    },
    {
        key: "dni",
        label: "DNI",
    },
    {
        key: "actions",
        label: "ACCIONES"
    }
];

export default function TableUser() {
    const { users } = useAppSelector(state => state.user)
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [typeModal, setTypeModal] = useState<"edit" | "delete">("edit");
    const [userData, setUserData] = useState<User>();
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(loadLocalUsers())
    }, [dispatch]
    )

    const hadleModal = useCallback((type: "edit" | "delete", user: User) => {
        setTypeModal(type)
        setUserData(user)
        onOpen()
    }, [onOpen])

    const renderCell = useCallback((user: any, columnKey: any) => {
        const cellValue = user[columnKey];

        switch (columnKey) {

            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Button variant="ghost"
                            onPress={() => hadleModal("edit", user)}
                        >
                            Editar
                        </Button>
                        <Button variant="ghost"
                            onPress={() => hadleModal("delete", user)}
                        >
                            Eliminar
                        </Button>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <>
            <Table aria-label="Example table with dynamic content">
                <TableHeader columns={columns}>
                    {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody items={users}>
                    {(item) => (
                        <TableRow key={item.dni}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            {
                userData && (
                    <ModalUser
                        open={isOpen}
                        onOpenChange={onOpenChange}
                        title={typeModal === "edit" ? "Editar Usuario" : "Eliminar Usuario"}
                        type={typeModal}
                        item={userData}
                    />
                )
            }



        </>
    );
}
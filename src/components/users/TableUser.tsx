"use client"
import { loadLocalUsers } from "@/context/slice/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/context/store";
import { columns } from "@/utils/tableFormat";
import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from "@nextui-org/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import ModalUser from "./ModalUser";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

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
                        <Button variant="light"
                        color="primary"
                            onPress={() => hadleModal("edit", user)}
                            size="sm"
                            endContent={<PencilSquareIcon className="h-5 w-5" />}
                        >
                            Editar
                        </Button>
                        <Button variant="light"
                            onPress={() => hadleModal("delete", user)}
                            color="danger"
                            size="sm"

                            endContent={<TrashIcon className="h-5 w-5" />}
                        >
                            Eliminar
                        </Button>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);



    const bottomContent = useMemo(() => {
        return (
            <div className="flex flex-1 justify-between sm:justify-end space-x-3 my-3">
                {users.length > 0 && (
                    <div className="flex items-center space-x-2">
                        <p className="text-sm text-gray-500">
                            Mostrando {users.length}  resultados
                        </p>
                    </div>

                )}
            </div>
        );
    }, [users]);

    return (
        <>
            <Table aria-label="Table"
                isStriped
                bottomContent={bottomContent}
            >
                <TableHeader columns={columns}>
                    {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody items={users}
                    emptyContent={
                        <div className="flex flex-col items-center justify-center space-y-4">
                            <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    vectorEffect="non-scaling-stroke"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                                />
                            </svg>
                            <p className="text-center">No hay usuarios registrados</p>
                        </div>
                    }
                >
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
"use client"
import { Button, useDisclosure } from "@nextui-org/react"
import ModalUser from "./ModalUser"
import { PlusIcon } from "@heroicons/react/24/outline";

const AddUser = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    return (
        <div
            className="flex justify-end"
        >
            <Button
                variant="bordered"
                color="success"
                onPress={onOpen}
                startContent={<PlusIcon className="h-5 w-5" />}
            >
                Agregar Usuario
            </Button>

            <ModalUser
                open={isOpen}
                onOpenChange={onOpenChange}
                title="Agregar Usuario"
                type="create"
            />
        </div>

    )
}

export default AddUser


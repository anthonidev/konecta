import AddUser from "@/components/users/AddUser";
import TableUser from "@/components/users/TableUser";

export default function Home() {
  return (
    <div className="flex flex-col space-y-5 mt-10 max-w-7xl mx-auto">
      <AddUser />
      <TableUser />
    </div>
  )
}

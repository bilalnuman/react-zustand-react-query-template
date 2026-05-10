"use client"
import { Button } from "@/components/ui/button";
import FieldGroup from "@/components/ui/fieldGroup";
import Modal from "@/components/ui/modal";
import Table, { Column } from "@/components/ui/table";
import Checkbox from "@/components/ui/checkbox";
import { use, useId, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { Icons } from "@/components/ui/icons";
import Link from "next/link";
import Select from "@/components/ui/select";
import { REQUIRED } from "@/constant.data/form-validation-roules";

const ManagerPage = (props: {
  params: Promise<any>;
  searchParams: Promise<any>;
}) => {
  const nameId = useId();
  const dropdownId = useId();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const params = use(props.params);
  const searchParams = use(props.searchParams);
  console.log(params,searchParams)
  const [search, setSearch] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    control,
  } = useForm({
    defaultValues: {
      name: "",
      frontend: "",
      backend: "",
      status: true
    }
  })



  const users = Array.from({ length: 68 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: i % 3 === 0 ? "Admin" : i % 2 === 0 ? "Editor" : "User",
    status: i % 4 === 0 ? "Inactive" : "Active"
  }));

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      [user.name, user.email, user.role, user.status]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search, users]);

  const columns: Column<typeof users[0]>[] = [
    { key: "name", label: "Name", sortable: true },
    { key: "email", label: "Email", sortable: true },
    { key: "role", label: "Role", sortable: true, },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (value) => (
        <span className={twMerge(
          "px-2 py-1 rounded-full text-xs font-medium",
          value === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
        )}>
          {value}
        </span>
      )
    },
  ];

  return (
    <>
      {/* <Loading className={twMerge(isLoading ? "bg-white" : "hidden", isFetching ? "bg-dark-600/35 flex" : "hidden")} /> */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Link href="/manager/users">User</Link>
        <div>

          <Modal
            title={<><Icons.warning className="mx-auto text-yellow-400 mb-5" size={50} /> Delete User</>}
            description="Are you sure you want to delete this user? This action cannot be undone."
            trigger={<Button onClick={() => setIsModalOpen(true)} className="w-fit">Delete Modal</Button>}
            open={isModalOpen}
            onOpenChange={(open) => setIsModalOpen(typeof open === "boolean" ? open : false)}
            className="max-w-xl justify-center flex flex-col items-center text-center border-red-500 border"

          >
            <div className="flex justify-end gap-3 w-full flex-1">
              <Button size="lg" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button size="lg" className="bg-red-500" onClick={() => setIsModalOpen(false)}>Confirm</Button>
            </div>
          </Modal>

          {/* <Modal
            title="Create New Entry"
            description="Fill in the details below to add a new record to your dashboard."
            trigger={<Button onClick={() => setIsModalOpen(true)} className="w-fit">Open Modal</Button>}
            open={isModalOpen}
            onOpenChange={(open) => {
              console.log("Modal Open State:", open);
            }}

          >
            <div className="py-4">
              <p className="text-gray-600 mb-4">This is a standard accessible modal built with Radix UI.</p>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button onClick={() => setIsModalOpen(false)}>Confirm</Button>
              </div>
            </div>
          </Modal> */}
        </div>
      </div>
      <form onSubmit={handleSubmit((data) => {
        // Form submitted
      })} className="mb-6">
        <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white rounded shadow">
          <FieldGroup id={nameId} label="Name" errorMessage={errors.name?.message as string}>
            <input id={nameId} className="Input" placeholder="Enter Name" {...register("name", { required: REQUIRED })} />
          </FieldGroup>
          <FieldGroup id={dropdownId} label="Dropdown"
            errorMessage={errors.frontend?.message as string}
          >
            <Controller
              name="frontend"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  items={[
                    { label: "React", value: "react" },
                    { label: "Vue", value: "vue", },
                    { label: "Node", value: "node", },
                  ]}
                />
              )}
            />
          </FieldGroup>
          <FieldGroup id={dropdownId} label="Dropdown"
            errorMessage={errors.backend?.message as string}
          >
            <Controller
              name="backend"
              control={control}
              rules={{ required: REQUIRED }}
              render={({ field }) => (
                <Select
                  {...field}
                  items={[
                    { label: "Python", value: "python" },
                    { label: "JavaScript", value: "javascript", },
                    { label: "Node", value: "node", },
                  ]}
                />
              )}
            />
          </FieldGroup>
          <div className="flex items-end pb-2">
            <Controller
              name="status"
              control={control}
              rules={{ required: REQUIRED }}
              render={({ field }) => (
                <Checkbox
                  id="active-status"
                  label="Active Status"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
          </div>
        </div>

        <Button type="submit" className="mt-4" disabled={!isDirty}>Submit</Button>
      </form >

      <div className="bg-white h-[calc(100vh-510px)] overflow-hidden">
        <div className="flex justify-between items-center mb-4 sticky top-0 bg-white z-10">
          <h2 className="text-xl font-semibold mb-4">User Management</h2>
          <input
            type="text"
            placeholder="Search users..."
            className={twMerge("Input max-w-xs")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Table
          columns={columns}
          data={filteredUsers}
          selectable={true}
          onSelectionChange={(selected) => { }}
          onRowClick={(user) => { }}
          isHeadingSticky={true}
          classNames={{
            container: "h-full",
            table: "h-[calc(100vh-630px)]"
          }}
        />
      </div>

    </>
  )
}

export default ManagerPage

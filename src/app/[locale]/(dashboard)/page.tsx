"use client"
import { Button } from "@/components/ui/button";
import FieldGroup from "@/components/ui/fieldGroup";
import Modal from "@/components/ui/modal";
import Table, { Column } from "@/components/ui/table";
import Checkbox from "@/components/ui/checkbox";
import { useId, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { Icons } from "@/components/ui/icons";
import Select from "@/components/ui/select";
import { useTranslations } from "next-intl";
import { useFilters } from "@/hooks/useFilters";
import Drawer from "@/components/ui/Drawer";
import PhoneInput from "@/components/ui/PhoneInput";

const ManagerPage = () => {
  const [open, setOpen] = useState(false)
  const tForm = useTranslations("Form");
  const tDash = useTranslations("Dashboard");
  const tCommon = useTranslations("Common");
  const nameId = useId();
  const dropdownId = useId();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { filters, setFilter } = useFilters()

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
      status: true,
      phone: ""
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
        .includes(filters?.search || "".toLowerCase())
    );
  }, [filters?.search, users]);

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

  console.log(errors)

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{tDash("title")}</h1>
        <div>
          <button
            onClick={() => setOpen(true)}
            className="
          px-5 py-3 rounded-xl
          bg-cyan-500 text-white
        "
          >
            Open Drawer
          </button>
          <Modal
            title={<><Icons.warning className="mx-auto text-yellow-400 mb-5" size={50} /> Delete User</>}
            description="Are you sure you want to delete this user? This action cannot be undone."
            trigger={<Button onClick={() => setIsModalOpen(true)} className="w-fit">Delete Modal</Button>}
            open={isModalOpen}
            onOpenChange={(open) => setIsModalOpen(typeof open === "boolean" ? open : false)}
            className="max-w-xl justify-center flex flex-col items-center text-center border-red-500 border"
          >
            <div className="flex justify-end gap-3 w-full flex-1">
              <Button size="lg" variant="outline" onClick={() => setIsModalOpen(false)}>{tCommon("cancel")}</Button>
              <Button size="lg" className="bg-red-500" onClick={() => setIsModalOpen(false)}>{tCommon("confirm")}</Button>
            </div>
          </Modal>
        </div>
      </div>
      <form onSubmit={handleSubmit((data) => {
        // Form submitted
      })} className="mb-6">
        <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white rounded shadow">
          <FieldGroup id={nameId} label={tForm("name")} errorMessage={errors.name?.message as string}>
            <input id={nameId} className="Input" placeholder={tForm("namePlaceholder")} {...register("name", { required: tCommon("required") })} />
          </FieldGroup>
          <FieldGroup id={dropdownId} label={tForm("dropdown")}
            errorMessage={errors.frontend?.message as string}
          >
            <Controller
              name="frontend"
              control={control}
              rules={{ required: tCommon("required") }}
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
          <FieldGroup id={dropdownId} label={tForm("dropdown")}
            errorMessage={errors.backend?.message as string}
          >
            <Controller
              name="backend"
              control={control}
              rules={{ required: tCommon("required") }}
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
              rules={{ required: tCommon("required") }}
              render={({ field }) => (
                <Checkbox
                  id="active-status"
                  label={tForm("activeStatus")}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
          </div>
          <div className="flex items-end pb-2">
            <Controller
              name="phone"
              control={control}
              rules={{ required: tCommon("required") }}
              render={({ field }) => (
                <PhoneInput
                  {...field}
                  errorMessage={errors.phone?.message as string}
                />
              )}
            />
          </div>
        </div>

        <Button type="submit" className="mt-4" disabled={!isDirty}>{tCommon("submit")}</Button>
      </form >

      <div className="bg-white h-[calc(100vh-510px)] overflow-hidden">
        <div className="flex justify-between items-center mb-4 sticky top-0 bg-white z-10">
          <h2 className="text-xl font-semibold mb-4">{tDash("userManagement")}</h2>
          <input
            type="text"
            placeholder={tDash("searchPlaceholder")}
            className={twMerge("Input max-w-xs")}
            value={filters?.search}
            onChange={(e) => setFilter({ "search": e.target.value })}
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


      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title="User Settings"
        position="right"
      >
        sdffdsfds
      </Drawer>

    </>
  )
}

export default ManagerPage

// Components
import { AlertDialogWrapper } from "@/components/alert-dialog-wrapper/alert-dialog-wrapper.component";
import { ServiceForm } from "./components/service-form/service-form.component";
import { DataTable } from "@/components/data-table/data-table.component";
import { DialogWrapper } from "@/components/dialog-wrapper/dialog-wrapper.component";
// Config
import {
  getColumnsConfig,
  getMultipleSelectActions,
  initialColumnVisibility,
} from "./config/gym.config";
// Hooks
import GymHook from "./hooks/gym.hook";

const GymPage = () => {
  const {
    data,
    form,
    handleCreate,
    handleDelete,
    handleDeleteMultiple,
    handleEdit,
    handleSubmit,
    handleSubmitDelete,
    handleSubmitDeleteMultiple,
    loading,
    openAlert,
    openDialog,
    selectedRow,
    selectedRows,
    setOpenAlert,
    setOpenDialog,
  } = GymHook();

  const columns = getColumnsConfig({ handleDelete, handleEdit });
  const multipleSelectActions = getMultipleSelectActions({
    handleDeleteMultiple,
  });

  return (
    <div className="flex w-full">
      <DataTable
        {...{
          columns,
          data,
          handleCreate,
          initialColumnVisibility,
          multipleSelectActions,
        }}
      />
      <DialogWrapper
        {...{
          open: openDialog,
          setOpen: setOpenDialog,
          title: `${selectedRow ? "Editar" : "Crear"} servicio`,
          description: `Rellena los campos para ${
            selectedRow ? "editar" : "crear"
          } un nuevo servicio en el gimnasio.`,
        }}
      >
        <ServiceForm
          {...{
            form,
            handleSubmit,
            label: selectedRow ? "Editar" : "Crear",
            loading,
          }}
        />
      </DialogWrapper>
      <AlertDialogWrapper
        {...{
          action: {
            onClick: selectedRows.length
              ? handleSubmitDeleteMultiple
              : handleSubmitDelete,
            label: "Eliminar",
          },
          cancel: {
            label: "Cancelar",
          },
          description: `¿Estás seguro de que quieres eliminar ${
            selectedRows.length > 1
              ? "los servicios seleccionados"
              : "el servicio seleccionado"
          }?`,
          open: openAlert,
          setOpen: setOpenAlert,
          title: `Eliminar ${selectedRows.length > 1 ? "servicios" : "servicio"}`,
        }}
      />
    </div>
  );
};

export default GymPage;

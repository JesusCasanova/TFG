// Components
import { AlertDialogWrapper } from "@/components/alert-dialog-wrapper/alert-dialog-wrapper.component";
import { ReservationForm } from "./components/reservation-form/reservation-form.component";
import { DataTable } from "@/components/data-table/data-table.component";
import { DialogWrapper } from "@/components/dialog-wrapper/dialog-wrapper.component";
// Config
import {
  getColumnsConfig,
  getMultipleSelectActions,
  initialColumnVisibility,
} from "./config/reservations.config";
// Hooks
import ReservationsHook from "./hooks/reservations.hook";

const ReservationsPage = () => {
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
    reservation,
    selectedRow,
    selectedRows,
    service,
    services,
    setOpenAlert,
    setOpenDialog,
    setReservation,
    user,
    users,
  } = ReservationsHook();

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
          title: `${selectedRow ? "Editar" : "Crear"} reserva`,
          description: `Rellena los campos para ${
            selectedRow ? "editar" : "crear"
          } una reserva`,
        }}
      >
        <ReservationForm
          {...{
            form,
            handleSubmit,
            label: selectedRow ? "Editar" : "Crear",
            loading,
            reservation,
            service,
            services,
            setReservation,
            user,
            users,
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
              ? "las reservas seleccionadas"
              : "la reserva seleccionada"
          }?`,
          open: openAlert,
          setOpen: setOpenAlert,
          title: `Eliminar ${selectedRows.length > 1 ? "reservas" : "reserva"}`,
        }}
      />
    </div>
  );
};

export default ReservationsPage;

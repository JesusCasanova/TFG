// Vendors
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
// Constants
import costants from "../constants/reservations.constants";
// Handlers
import ReservationsHandlers from "../handlers/reservations.handlers";
// Schemas
import { reservationSchema } from "../schemas/reservation.schema";
// Stores
import { useAuthStore } from "@/core/stores/auth.store";

const ReservationsHook = () => {
  const { user } = useAuthStore();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

  const [services, setServices] = useState([]);
  const [users, setUsers] = useState([]);
  const [reservation, setReservation] = useState({
    userId: user.role === "user" ? user._id : "",
    serviceId: "",
    timeFrom: "",
    timeTo: "",
    dayOfWeek: "",
    day: "",
    month: "",
    year: "",
  });

  const form = useForm({
    resolver: zodResolver(reservationSchema),
    defaultValues: costants.DEFAULT_FORM_VALUES,
  });

  const service = services.find(
    (service) => service._id === reservation.serviceId
  );

  const {
    handleCreate,
    handleDelete,
    handleDeleteMultiple,
    handleEdit,
    handleFetch,
    handleFetchServices,
    handleFetchUsers,
    handleResetForm,
    handleSetReservation,
    handleSubmit,
    handleSubmitDelete,
    handleSubmitDeleteMultiple,
  } = ReservationsHandlers({
    form,
    openAlert,
    openDialog,
    selectedRow,
    selectedRows,
    service,
    setData,
    setLoading,
    setOpenAlert,
    setOpenDialog,
    setReservation,
    setSelectedRow,
    setSelectedRows,
    setServices,
    setUsers,
    user,
  });

  useEffect(() => {
    handleFetch();
    handleFetchUsers();
    handleFetchServices();

    if (user.role === "user") {
      setUsers([user]);
      console.log(user);
      form.setValue("userId", user._id);
    }
  }, []);

  useEffect(() => {
    handleResetForm();
  }, [openDialog, openAlert]);

  useEffect(() => {
    handleSetReservation();
  }, [reservation.serviceId]);

  return {
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
  };
};

export default ReservationsHook;

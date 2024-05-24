// Vendors
import axios from "@/core/config/axios";
import { toast } from "sonner";
// Constants
import constants from "./constants/reservations.handlers.constants";
// Libs
import { setFormErrors } from "@/core/lib/utils";

const createHandler = ({ setOpenDialog }) => {
  setOpenDialog(true);
};

const deleteHandler = async ({ row, setSelectedRow, setOpenAlert }) => {
  setSelectedRow(row);
  setOpenAlert(true);
};

const deleteMultipleHandler = async ({
  rows,
  setSelectedRows,
  setOpenAlert,
}) => {
  setSelectedRows(rows);
  setOpenAlert(true);
};

const editHandler = async ({
  form,
  row,
  setOpenDialog,
  setReservation,
  setSelectedRow,
}) => {
  const date = new Date(row.date);
  form.setValue("userId", row.userId);
  form.setValue("serviceId", row.serviceId);
  form.setValue("timeFrom", row.timeFrom);
  form.setValue("timeTo", row.timeTo);
  form.setValue("dayOfWeek", row.dayOfWeek);
  form.setValue("day", date.getDate());
  form.setValue("month", date.getMonth());
  form.setValue("year", date.getFullYear());

  setReservation({
    userId: row.userId,
    serviceId: row.serviceId,
    timeFrom: row.timeFrom,
    timeTo: row.timeTo,
    dayOfWeek: row.dayOfWeek,
    day: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear(),
  });

  setSelectedRow(row);
  setOpenDialog(true);
};

const fetchHandler = async ({ setData, setLoading, user }) => {
  const url =
    user.role === "user"
      ? `${constants.PATH_RESERVATIONS}/user/${user._id}`
      : constants.PATH_RESERVATIONS;
  setLoading(true);
  try {
    const { data } = await axios.get(url, {
      withCredentials: true,
    });
    console.log(data);
    setData(data);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

const resetFormHandler = ({
  form,
  openAlert,
  openDialog,
  setSelectedRow,
  setReservation,
  user,
}) => {
  if (openAlert || openDialog) {
    return;
  }
  setSelectedRow(null);
  form.reset({
    userId: user.role === "user" ? user._id : undefined,
    serviceId: undefined,
    timeFrom: "",
    timeTo: "",
    dayOfWeek: undefined,
    day: undefined,
    month: undefined,
    year: undefined,
  });
  setReservation({
    userId: user.role === "user" ? user._id : "",
    serviceId: "",
    timeFrom: "",
    timeTo: "",
    dayOfWeek: "",
    day: "",
    month: "",
    year: "",
  });
};

const submitHandler = async ({
  form,
  selectedRow,
  setData,
  setLoading,
  setOpenDialog,
  setReservation,
  user,
  values,
}) => {
  if (selectedRow) {
    submitHandlerEdit({
      selectedRow,
      form,
      setData,
      setLoading,
      setOpenDialog,
      setReservation,
      user,
      values,
    });
  } else {
    submitHandlerCreate({
      form,
      setData,
      setLoading,
      setOpenDialog,
      setReservation,
      user,
      values,
    });
  }
};

const submitHandlerCreate = async ({
  form,
  setData,
  setLoading,
  setOpenDialog,
  setReservation,
  user,
  values,
}) => {
  setLoading(true);

  try {
    const { data } = await axios.post(constants.PATH_RESERVATIONS, values, {
      withCredentials: true,
    });
    setOpenDialog(false);
    setData((prev) => [...prev, data.reservation]);
    setReservation({
      userId: user.role === "user" ? user._id : "",
      serviceId: "",
      timeFrom: "",
      timeTo: "",
      dayOfWeek: "",
      day: "",
      month: "",
      year: "",
    });
    toast.success(data.message.text);
    form.reset();
  } catch (error) {
    if (error.response.data.errors) {
      setFormErrors(form, error);
    }
    if (error.response?.data.message) {
      toast.error(error.response.data.message.text);
    }
  } finally {
    setLoading(false);
  }
};

const submitHandlerEdit = async ({
  selectedRow,
  form,
  setData,
  setLoading,
  setOpenDialog,
  setReservation,
  values,
  user,
}) => {
  setLoading(true);

  try {
    const { data } = await axios.put(
      `${constants.PATH_RESERVATIONS}/${selectedRow._id}`,
      values,
      {
        withCredentials: true,
      }
    );
    setOpenDialog(false);
    setData((prev) =>
      prev.map((item) =>
        item._id === selectedRow._id ? data.reservation : item
      )
    );
    setReservation({
      userId: user.role === "user" ? user._id : "",
      serviceId: "",
      timeFrom: "",
      timeTo: "",
      dayOfWeek: "",
      day: "",
      month: "",
      year: "",
    });
    toast.success(data.message.text);
    form.reset();
  } catch (error) {
    if (error.response.data.errors) {
      setFormErrors(form, error);
    }
  } finally {
    setLoading(false);
  }
};

const submitHandlerDelete = async ({ selectedRow, setData, setLoading }) => {
  setLoading(true);
  try {
    const { data } = await axios.delete(
      `${constants.PATH_RESERVATIONS}/${selectedRow._id}`,
      {
        withCredentials: true,
      }
    );
    setData((prev) => prev.filter((item) => item._id !== selectedRow._id));
    toast.success(data.message);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

const submitHandlerDeleteMultiple = async ({
  selectedRows,
  setData,
  setLoading,
  setSelectedRows,
}) => {
  setLoading(true);
  try {
    const { data } = await axios.delete(constants.PATH_RESERVATIONS, {
      data: { ids: selectedRows.map((row) => row._id) },
      withCredentials: true,
    });
    setData((prev) => prev.filter((item) => !selectedRows.includes(item)));
    setSelectedRows([]);
    toast.success(data.message);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

const fetchUsersHandler = async ({ setLoading, setUsers }) => {
  setLoading(true);
  try {
    const { data } = await axios.get(constants.PATH_USERS, {
      withCredentials: true,
    });
    setUsers(data);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

const fetchServicesHandler = async ({ setLoading, setServices }) => {
  setLoading(true);
  try {
    const { data } = await axios.get(constants.PATH_SERVICES, {
      withCredentials: true,
    });
    setServices(data);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

const setReservationHandler = ({ service, setReservation, form }) => {
  setReservation((prev) => ({
    ...prev,
    timeFrom: service?.isFixedDuration ? service.timeFrom : "",
    timeTo: service?.isFixedDuration ? service.timeTo : "",
  }));
  form.clearErrors("timeFrom");
  form.clearErrors("timeTo");
  form.setValue("timeFrom", service?.isFixedDuration ? service.timeFrom : "");
  form.setValue("timeTo", service?.isFixedDuration ? service.timeTo : "");
};

const ReservationsHandlers = ({
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
}) => {
  return {
    handleSetReservation: () =>
      setReservationHandler({ service, setReservation, form }),
    handleFetchUsers: () =>
      fetchUsersHandler({
        setLoading,
        setUsers,
      }),
    handleFetchServices: () =>
      fetchServicesHandler({ setLoading, setServices }),
    handleCreate: () => createHandler({ form, setOpenDialog }),
    handleDelete: (row) => deleteHandler({ row, setSelectedRow, setOpenAlert }),
    handleDeleteMultiple: (rows) =>
      deleteMultipleHandler({ rows, setSelectedRows, setOpenAlert }),
    handleEdit: (row) =>
      editHandler({
        form,
        row,
        setSelectedRow,
        setOpenDialog,
        setReservation,
      }),
    handleFetch: () => fetchHandler({ setData, setLoading, user }),
    handleResetForm: () =>
      resetFormHandler({
        form,
        openAlert,
        openDialog,
        setSelectedRow,
        setReservation,
        user,
      }),
    handleSubmit: (values) =>
      submitHandler({
        form,
        selectedRow,
        setData,
        setLoading,
        setOpenDialog,
        setReservation,
        user,
        values,
      }),
    handleSubmitDelete: () =>
      submitHandlerDelete({ selectedRow, setData, setLoading }),
    handleSubmitDeleteMultiple: () =>
      submitHandlerDeleteMultiple({
        selectedRows,
        setData,
        setLoading,
        setSelectedRows,
      }),
  };
};

export default ReservationsHandlers;

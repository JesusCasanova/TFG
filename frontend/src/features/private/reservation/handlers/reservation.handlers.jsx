// Vendors
import axios from "@/core/config/axios";
// Constants
import constants from "./constants/reservation.handlers.constants";
// Libs
import { setFormErrors } from "@/core/lib/utils";

const submitHandler = async ({
  form,
  setLoading,
  setMessage,
  setReservation,
  user,
  values,
}) => {
  setLoading(true);
  try {
    const { data } = await axios.post(constants.PATH_RESERVATION, values, {
      withCredentials: true,
    });
    setMessage({ text: data.message.text, type: data.message.type });
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
    form.reset();
  } catch (error) {
    if (error.response.data.errors) {
      setFormErrors(form, error);
    }
    if (error.response?.data.message) {
      setMessage({
        text: error.response.data.message.text,
        type: error.response.data.message.type,
      });
    }
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

const ReservationHandlers = ({
  form,
  service,
  setLoading,
  setMessage,
  setReservation,
  setServices,
  setUsers,
  user,
}) => {
  return {
    handleSubmit: (values) =>
      submitHandler({
        form,
        setLoading,
        setMessage,
        setReservation,
        user,
        values,
      }),
    handleFetchUsers: () =>
      fetchUsersHandler({
        setLoading,
        setUsers,
      }),
    handleFetchServices: () =>
      fetchServicesHandler({ setLoading, setServices }),
    handleSetReservation: () =>
      setReservationHandler({ service, setReservation, form }),
  };
};

export default ReservationHandlers;

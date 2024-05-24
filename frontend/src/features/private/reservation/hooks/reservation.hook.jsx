// Vendors
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// Constants
import constants from "../constants/reservation.constants";
// Handlers
import ReservationHandlers from "../handlers/reservation.handlers";
// Schemas
import { reservationSchema } from "../schemas/reservation.schema";
// Stores
import { useAuthStore } from "@/core/stores/auth.store";

const ReservationHook = () => {
  const { user } = useAuthStore();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
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
    defaultValues: constants.DEFAULT_FORM_VALUES,
  });

  const service = services.find(
    (service) => service._id === reservation.serviceId
  );

  const {
    handleFetchServices,
    handleFetchUsers,
    handleSubmit,
    handleSetReservation,
  } = ReservationHandlers({
    form,
    setLoading,
    setMessage,
    setReservation,
    setServices,
    setUsers,
    service,
    user,
  });

  useEffect(() => {
    handleFetchUsers();
    handleFetchServices();

    if (user.role === "user") {
      setUsers([user]);
      form.setValue("userId", user._id);
    }
  }, []);

  useEffect(() => {
    handleSetReservation();
  }, [reservation.serviceId]);

  return {
    form,
    handleSubmit,
    loading,
    message,
    service,
    services,
    user,
    users,
    reservation,
    setReservation,
  };
};

export default ReservationHook;

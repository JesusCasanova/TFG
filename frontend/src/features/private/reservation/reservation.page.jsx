// Constants
import { ReservationForm } from "./components/reservation-form/reservation-form.component";
// Hooks
import ReservationHook from "./hooks/reservation.hook";

const ReservationPage = () => {
  const {
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
  } = ReservationHook();

  return (
    <div className="flex flex-col gap-6 grow max-w-3xl">
      <h1 className="text-xl font-semibold">Reservar en el gimnasio</h1>
      <ReservationForm
        {...{
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
        }}
      />
    </div>
  );
};

export default ReservationPage;

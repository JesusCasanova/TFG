// Pages
import GymPage from "@/features/private/gym/gym.page";
import ReservationPage from "@/features/private/reservation/reservation.page";
import ReservationsPage from "@/features/private/reservations/reservations.page";
import LogoutPage from "@/features/auth/logout/logout.page";

export const privateRoutes = [
  {
    path: "/logout",
    element: <LogoutPage />,
    admin: false,
  },
  {
    path: "/reserva",
    element: <ReservationPage />,
    admin: false,
  },
  {
    path: "/reservas",
    element: <ReservationsPage />,
    admin: false,
  },
  {
    path: "/gimnasio",
    element: <GymPage />,
    admin: true,
  },
];

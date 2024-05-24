// Icons
import {
  LuCalendar,
  LuCalendarPlus,
  LuDumbbell,
  LuLogIn,
  LuUserPlus2,
} from "react-icons/lu";

const loggedInNavigationMenuItems = [
  {
    icon: LuCalendar,
    label: "Reserva",
    path: "/reserva",
    admin: false,
  },
  {
    icon: LuCalendarPlus,
    label: "Reservas",
    path: "/reservas",
    admin: false,
  },
  {
    icon: LuDumbbell,
    label: "Gimnasio",
    path: "/gimnasio",
    admin: true,
  },
];

const loggedOutNavigationMenuItems = [
  {
    icon: LuLogIn,
    label: "Login",
    path: "/login",
    admin: false,
  },
  {
    icon: LuUserPlus2,
    label: "Registro",
    path: "/registro",
    admin: false,
  },
];

const constants = {
  LOGGED_IN_NAVIGATION_MENU_ITEMS: loggedInNavigationMenuItems,
  LOGGED_OUT_NAVIGATION_MENU_ITEMS: loggedOutNavigationMenuItems,
  NAVIGATION_MENU_DESKTOP_PROPS: {
    fullWidth: false,
    itemsAlignment: "left",
    className: "hidden md:flex",
    orientation: "horizontal",
  },
  NAVIGATION_MENU_MOBILE_PROPS: {
    fullWidth: true,
    itemsAlignment: "left",
    orientation: "vertical",
  },
};

export default constants;

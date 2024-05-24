const constants = {
  FORM_FIELD_NAME: {
    label: "Nombre",
    name: "name",
    placeholder: "Nombre",
    type: "text",
  },
  FORM_FIELD_DESCRIPTION: {
    label: "Descripción",
    name: "description",
    placeholder: "Descripción",
    type: "text",
  },
  FORM_FIELD_IS_FIXED_DURATION: {
    label: "Duración fija",
    name: "isFixedDuration",
    type: "checkbox",
  },
  FORM_FIELD_TIME_FROM: {
    label: "Hora de inicio",
    name: "timeFrom",
    placeholder: "Hora de inicio",
    type: "time",
  },
  FORM_FIELD_TIME_TO: {
    label: "Hora de finalización",
    name: "timeTo",
    placeholder: "Hora de finalización",
    type: "time",
  },
  ITEMS: [
    {
      id: "monday",
      label: "Lunes",
    },
    {
      id: "tuesday",
      label: "Martes",
    },
    {
      id: "wednesday",
      label: "Miércoles",
    },
    {
      id: "thursday",
      label: "Jueves",
    },
    {
      id: "friday",
      label: "Viernes",
    },
    {
      id: "saturday",
      label: "Sábado",
    },
    {
      id: "sunday",
      label: "Domingo",
    },
  ],
  FORM_FIELD_CAPACITY: {
    label: "Capacidad",
    name: "capacity",
    placeholder: "Capacidad",
    type: "number",
  },
  BUTTON_SUBMIT_PROPS: {
    fullWidth: true,
    showLabel: false,
    type: "submit",
  },
};

export default constants;

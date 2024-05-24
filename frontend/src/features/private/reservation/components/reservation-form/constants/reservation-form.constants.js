const constants = {
  FORM_FIELD_USER_ID: {
    label: "Usuario",
    name: "userId",
    placeholder: "Usuario",
    type: "select",
  },
  FORM_FIELD_SERVICE_ID: {
    label: "Servicio",
    name: "serviceId",
    placeholder: "Servicio",
    type: "select",
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
  FORM_FIELD_DAY_OF_WEEK: {
    label: "Día de la semana",
    name: "dayOfWeek",
  },
  FORM_FIELD_DAY: {
    label: "Día",
    name: "day",
    placeholder: "Día",
    type: "select",
  },
  FORM_FIELD_MONTH: {
    label: "Mes",
    name: "month",
    placeholder: "Mes",
    type: "select",
  },
  FORM_FIELD_YEAR: {
    items: [...Array(2).keys()].map((key) => ({
      label: new Date().getFullYear() + key,
      value: new Date().getFullYear() + key,
    })),
    label: "Año",
    name: "year",
    placeholder: "Año",
    type: "select",
  },
  BUTTON_SUBMIT_PROPS: {
    fullWidth: true,
    showLabel: false,
    type: "submit",
  },
};

export default constants;

export const getValue = (value) => {
  const translations = {
    monday: "Lunes",
    tuesday: "Martes",
    wednesday: "Miércoles",
    thursday: "Jueves",
    friday: "Viernes",
    saturday: "Sábado",
    sunday: "Domingo",
  };
  return translations[value];
};

export const getMonths = ({ year }) => {
  const months = [
    { label: "Enero", value: 0 },
    { label: "Febrero", value: 1 },
    { label: "Marzo", value: 2 },
    { label: "Abril", value: 3 },
    { label: "Mayo", value: 4 },
    { label: "Junio", value: 5 },
    { label: "Julio", value: 6 },
    { label: "Agosto", value: 7 },
    { label: "Septiembre", value: 8 },
    { label: "Octubre", value: 9 },
    { label: "Noviembre", value: 10 },
    { label: "Diciembre", value: 11 },
  ];

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  if (year === currentYear) {
    return months.filter((month) => month.value >= currentMonth);
  }
  return months;
};

export const getDaysOfMonth = ({ month, year, dayOfWeek }) => {
  const daysOfWeekMap = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
  };

  const dayOfWeekIndex = daysOfWeekMap[dayOfWeek.toLowerCase()];
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const result = [];

  const today = new Date();
  const startDay =
    year === today.getFullYear() && month === today.getMonth()
      ? today.getDate()
      : 1;

  for (let day = startDay; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    if (date.getDay() === dayOfWeekIndex) {
      result.push(day);
    }
  }

  return result;
};

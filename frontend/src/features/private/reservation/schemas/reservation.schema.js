// Vendors
import * as z from "zod";

export const reservationSchema = z.object({
  userId: z.string({
    required_error: "El usuario es obligatorio",
  }),
  serviceId: z.string({
    required_error: "El servicio es obligatorio",
  }),
  timeFrom: z.preprocess(
    (time) => (time.split(":").length === 2 ? time + ":00" : time),
    z
      .string({
        required_error: "La hora de inicio es obligatoria",
      })
      .time({
        message: "La hora de inicio no es válida",
      })
  ),
  timeTo: z.preprocess(
    (time) => (time.split(":").length === 2 ? time + ":00" : time),
    z
      .string({
        required_error: "La hora de finalización es obligatoria",
      })
      .time({
        message: "La hora de finalización no es válida",
      })
  ),
  dayOfWeek: z.enum(
    [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ],
    {
      required_error: "El día de la semana es obligatorio",
    }
  ),
  day: z.number({
    required_error: "El día es obligatorio",
  }),
  month: z.number({
    required_error: "El mes es obligatorio",
  }),
  year: z.number({
    required_error: "El año es obligatorio",
  }),
});

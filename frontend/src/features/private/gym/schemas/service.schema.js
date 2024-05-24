// Vendors
import * as z from "zod";

export const serviceSchema = z.object({
  name: z
    .string({ required_error: "El nombre es obligatorio" })
    .min(1, { message: "El nombre es obligatorio" }),
  description: z.string().optional(),
  isFixedDuration: z.boolean().default(false).optional(),
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
  daysOfWeek: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: "Tienes que seleccionar al menos un día de la semana",
    }),
  capacity: z.coerce
    .number({ required_error: "La capacidad es obligatoria" })
    .min(1, {
      message: "La capacidad debe ser mayor a 0",
    }),
});

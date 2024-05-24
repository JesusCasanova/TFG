// Models
import Service from "../models/service.model.js";

export const readAll = async (req, res) => {
  try {
    const services = await Service.find();

    res.status(200).json(services);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const readOne = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    res.status(200).json(service);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const create = async (req, res) => {
  const { name, timeFrom, timeTo, daysOfWeek, capacity } = req.body;

  const errors = {};

  if (!name) {
    const error = new Error("El nombre es obligatorio");
    errors.name = error.message;
  }

  if (!timeFrom) {
    const error = new Error("La hora de inicio es obligatoria");
    errors.timeFrom = error.message;
  }

  if (!timeTo) {
    const error = new Error("La hora de finalización es obligatoria");
    errors.timeTo = error.message;
  }

  if (daysOfWeek.length === 0) {
    const error = new Error("Debe seleccionar al menos un día de la semana");
    errors.daysOfWeek = error.message;
  }

  if (!capacity) {
    const error = new Error("La capacidad es obligatoria");
    errors.capacity = error.message;
  }

  if (Object.keys(errors).length) {
    return res.status(400).json({ errors });
  }

  try {
    const service = await Service.create(req.body);

    res.status(201).json({
      message: "Servicio creado con éxito",
      service,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const update = async (req, res) => {
  const { name, description, timeFrom, timeTo, daysOfWeek, capacity } =
    req.body;

  const errors = {};

  if (!name) {
    const error = new Error("El nombre es obligatorio");
    errors.name = error.message;
  }

  if (!timeFrom) {
    const error = new Error("La hora de inicio es obligatoria");
    errors.timeFrom = error.message;
  }

  if (!timeTo) {
    const error = new Error("La hora de finalización es obligatoria");
    errors.timeTo = error.message;
  }

  if (daysOfWeek.length === 0) {
    const error = new Error("Debe seleccionar al menos un día de la semana");
    errors.daysOfWeek = error.message;
  }

  if (!capacity) {
    const error = new Error("La capacidad es obligatoria");
    errors.capacity = error.message;
  }

  if (Object.keys(errors).length) {
    return res.status(400).json({ errors });
  }

  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      message: "Servicio actualizado con éxito",
      service,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Servicio eliminado con éxito" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const removeMultiple = async (req, res) => {
  const { ids } = req.body;

  try {
    await Service.deleteMany({ _id: { $in: ids } });

    res.status(200).json({
      message: `${
        ids.length > 1 ? "Servicios eliminados" : "Servicio eliminado"
      } con éxito`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

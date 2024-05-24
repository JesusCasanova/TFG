// Models
import Reservation from "../models/reservation.model.js";
import Service from "../models/service.model.js";
import User from "../models/user.model.js";

export const readAll = async (req, res) => {
  try {
    const reservations = await Reservation.find();

    const userIds = reservations.map((reservation) => reservation.userId);
    const users = await User.find({ _id: { $in: userIds } });
    const usersMap = users.reduce((acc, user) => {
      acc[user._id] = user;
      return acc;
    }, {});

    const serviceIds = reservations.map((reservation) => reservation.serviceId);
    const services = await Service.find({ _id: { $in: serviceIds } });
    const servicesMap = services.reduce((acc, service) => {
      acc[service._id] = service;
      return acc;
    }, {});

    const reservationsWithUsersAndServices = reservations.map((reservation) => {
      return {
        ...reservation._doc,
        user: usersMap[reservation.userId],
        service: servicesMap[reservation.serviceId],
      };
    });

    res.status(200).json(reservationsWithUsersAndServices);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const readAllByUserId = async (req, res) => {
  const { userId } = req.params;
  

  try {
    const reservations = await Reservation.find({ userId });

    const reservationUser = await User.findById(userId);

    const serviceIds = reservations.map((reservation) => reservation.serviceId);
    const services = await Service.find({ _id: { $in: serviceIds } });
    const servicesMap = services.reduce((acc, service) => {
      acc[service._id] = service;
      return acc;
    }, {});

    const reservationsWithUsersAndServices = reservations.map((reservation) => {
      return {
        ...reservation._doc,
        user: reservationUser,
        service: servicesMap[reservation.serviceId],
      };
    });

    res.status(200).json(reservationsWithUsersAndServices);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const readOne = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    const reservationUser = await User.findById(reservation.userId);
    const reservationService = await Service.findById(reservation.serviceId);

    const reservationWithUserAndService = {
      ...reservation._doc,
      user: reservationUser,
      service: reservationService,
    };

    res.status(200).json(reservationWithUserAndService);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const create = async (req, res) => {
  const { userId, serviceId, timeFrom, timeTo, dayOfWeek, day, month, year } =
    req.body;

  const errors = {};

  if (!userId) {
    const error = new Error("El usuario es obligatorio");
    errors.userId = error.message;
  }

  if (!serviceId) {
    const error = new Error("El servicio es obligatorio");
    errors.serviceId = error.message;
  }

  if (!timeFrom) {
    const error = new Error("La hora de inicio es obligatoria");
    errors.timeFrom = error.message;
  }

  if (!timeTo) {
    const error = new Error("La hora de finalización es obligatoria");
    errors.timeTo = error.message;
  }

  if (!dayOfWeek) {
    const error = new Error("El día de la semana es obligatorio");
    errors.dayOfWeek = error.message;
  }

  if (!day) {
    const error = new Error("El día es obligatorio");
    errors.day = error.message;
  }

  if (!month) {
    const error = new Error("El mes es obligatorio");
    errors.month = error.message;
  }

  if (!year) {
    const error = new Error("El año es obligatorio");
    errors.year = error.message;
  }

  if (Object.keys(errors).length) {
    return res.status(400).json({ errors });
  }

  try {
    const service = await Service.findById(serviceId);

    if (timeFrom < service.timeFrom) {
      const error = new Error(
        `La hora de inicio debe ser después o igual a ${service.timeFrom}`
      );
      errors.timeFrom = error.message;
    }

    if (timeTo > service.timeTo) {
      const error = new Error(
        `La hora de finalización debe ser antes o igual a ${service.timeTo}`
      );
      errors.timeTo = error.message;
    }

    if (!service.daysOfWeek.includes(dayOfWeek)) {
      const error = new Error(
        `El día de la semana debe ser uno de los siguientes: ${service.daysOfWeek.join(
          ", "
        )}`
      );
      errors.dayOfWeek = error.message;
    }

    if (Object.keys(errors).length) {
      return res.status(400).json({ errors });
    }

    const reservations = await Reservation.find();

    const reservationExists = reservations.find((reservation) => {
      const date = new Date(reservation.date);
      return (
        reservation.userId.equals(userId) &&
        reservation.serviceId.equals(serviceId) &&
        reservation.dayOfWeek === dayOfWeek &&
        reservation.timeFrom === timeFrom &&
        reservation.timeTo === timeTo &&
        date.getDate() === day &&
        date.getMonth() === month &&
        date.getFullYear() === year
      );
    });

    if (reservationExists) {
      return res.status(400).json({
        message: {
          text: "La reserva ya existe",
          type: "error",
        },
      });
    }

    const reservationsCount = reservations.filter((reservation) => {
      const date = new Date(reservation.date);
      return (
        reservation.serviceId.equals(serviceId) &&
        reservation.dayOfWeek === dayOfWeek &&
        reservation.timeFrom === timeFrom &&
        reservation.timeTo === timeTo &&
        date.getDate() === day &&
        date.getMonth() === month &&
        date.getFullYear() === year
      );
    }).length;

    if (reservationsCount >= service.capacity) {
      return res.status(400).json({
        message: {
          text: "La capacidad del servicio está llena",
          type: "error",
        },
      });
    }

    req.body.date = `${year}-${(month + 1).toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;

    const reservation = await Reservation.create(req.body);

    const reservationUser = await User.findById(reservation.userId);
    const reservationService = await Service.findById(reservation.serviceId);

    const reservationWithUserAndService = {
      ...reservation._doc,
      user: reservationUser,
      service: reservationService,
    };

    res.status(201).json({
      message: {
        text: "Reserva creada correctamente",
        type: "success",
      },
      reservation: reservationWithUserAndService,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const update = async (req, res) => {
  const { userId, serviceId, timeFrom, timeTo, dayOfWeek, day, month, year } =
    req.body;

  const errors = {};

  if (!userId) {
    const error = new Error("El usuario es obligatorio");
    errors.userId = error.message;
  }

  if (!serviceId) {
    const error = new Error("El servicio es obligatorio");
    errors.serviceId = error.message;
  }

  if (!timeFrom) {
    const error = new Error("La hora de inicio es obligatoria");
    errors.timeFrom = error.message;
  }

  if (!timeTo) {
    const error = new Error("La hora de finalización es obligatoria");
    errors.timeTo = error.message;
  }

  if (!dayOfWeek) {
    const error = new Error("El día de la semana es obligatorio");
    errors.dayOfWeek = error.message;
  }

  if (!day) {
    const error = new Error("El día es obligatorio");
    errors.day = error.message;
  }

  if (!month) {
    const error = new Error("El mes es obligatorio");
    errors.month = error.message;
  }

  if (!year) {
    const error = new Error("El año es obligatorio");
    errors.year = error.message;
  }

  if (Object.keys(errors).length) {
    return res.status(400).json({ errors });
  }

  try {
    const service = await Service.findById(serviceId);

    if (timeFrom < service.timeFrom) {
      const error = new Error(
        `La hora de inicio debe ser después o igual a ${service.timeFrom}`
      );
      errors.timeFrom = error.message;
    }

    if (timeTo > service.timeTo) {
      const error = new Error(
        `La hora de finalización debe ser antes o igual a ${service.timeTo}`
      );
      errors.timeTo = error.message;
    }

    if (!service.daysOfWeek.includes(dayOfWeek)) {
      const error = new Error(
        `El día de la semana debe ser uno de los siguientes: ${service.daysOfWeek.join(
          ", "
        )}`
      );
      errors.dayOfWeek = error.message;
    }

    if (Object.keys(errors).length) {
      return res.status(400).json({ errors });
    }

    const reservations = await Reservation.find();

    const reservationExists = reservations.find((reservation) => {
      const date = new Date(reservation.date);
      return (
        reservation.userId.equals(userId) &&
        reservation.serviceId.equals(serviceId) &&
        reservation.dayOfWeek === dayOfWeek &&
        reservation.timeFrom === timeFrom &&
        reservation.timeTo === timeTo &&
        date.getDate() === day &&
        date.getMonth() === month &&
        date.getFullYear() === year
      );
    });

    if (reservationExists) {
      return res.status(400).json({
        message: {
          text: "La reserva ya existe",
          type: "error",
        },
      });
    }

    const reservationsCount = reservations.filter((reservation) => {
      const date = new Date(reservation.date);
      return (
        reservation.serviceId.equals(serviceId) &&
        reservation.dayOfWeek === dayOfWeek &&
        reservation.timeFrom === timeFrom &&
        reservation.timeTo === timeTo &&
        date.getDate() === day &&
        date.getMonth() === month &&
        date.getFullYear() === year
      );
    }).length;

    if (reservationsCount >= service.capacity) {
      return res.status(400).json({
        message: {
          text: "La capacidad del servicio está llena",
          type: "error",
        },
      });
    }

    req.body.date = `${year}-${(month + 1).toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;

    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    const reservationUser = await User.findById(reservation.userId);
    const reservationService = await Service.findById(reservation.serviceId);

    const reservationWithUserAndService = {
      ...reservation._doc,
      user: reservationUser,
      service: reservationService,
    };

    res.status(200).json({
      message: {
        text: "Reserva actualizada correctamente",
        type: "success",
      },
      reservation: reservationWithUserAndService,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    await Reservation.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Reserva eliminado con éxito" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const removeMultiple = async (req, res) => {
  const { ids } = req.body;

  try {
    await Reservation.deleteMany({ _id: { $in: ids } });

    res.status(200).json({
      message: `${
        ids.length > 1 ? "Reservas eliminados" : "Reserva eliminado"
      } con éxito`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

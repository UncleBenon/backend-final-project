import { Router } from 'express';
import { prisma } from "../client.js";
import NotFoundError from '../errors/NotFoundError.js';
import FailedToCreateError from '../errors/FailedToCreateError.js';
import authMiddleware from '../middlewear/auth.js';

const router = Router();

router.get("/", authMiddleware, async (req, res) => {
    const { userId } = req.query;
    const users = await prisma.booking.findMany({
        where: {
            userId: userId,
        }
    });
    if (users.length <= 0) throw new NotFoundError("Booking");
    res.status(200).json(users);
});

router.post("/", authMiddleware, async (req, res) => {
    try {
        const { userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus } = req.body;
        const newBooking = await prisma.booking.create({
            data: {
                userId: userId,
                propertyId: propertyId,
                checkinDate: checkinDate,
                checkoutDate: checkoutDate,
                numberOfGuests: numberOfGuests,
                totalPrice: totalPrice,
                bookingStatus: bookingStatus,
            }
        });
        res.status(201).json(newBooking);
    } catch (error) {
        throw new FailedToCreateError("Booking");
    }
});

router.get("/:id", authMiddleware, async (req, res) => {
    const { id } = req.params;
    const booking = await prisma.booking.findFirst({
        where: {
            id: id,
        }
    });
    if (!booking) throw new NotFoundError("Booking", id);
    res.status(200).json(booking);
});

router.delete("/:id", authMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
        const booking = await prisma.booking.delete({
            where: { id: id },
        });
        res.status(200).json(booking);
    } catch (error) {
        throw new NotFoundError("Booking", id);
    }
});

router.put("/:id", authMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
        const { userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus } = req.body;
        const booking = await prisma.booking.update({
            where: { id: id },
            data: {
                userId: userId,
                propertyId: propertyId,
                checkinDate: checkinDate,
                checkoutDate: checkoutDate,
                numberOfGuests: numberOfGuests,
                totalPrice: totalPrice,
                bookingStatus: bookingStatus,
            },
        })
        res.status(200).send(booking);
    } catch (error) {
        throw new NotFoundError("Booking", id);
    }
});

export default router

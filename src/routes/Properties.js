import { Router } from 'express';
import { prisma } from "../client.js";
import NotFoundError from '../errors/NotFoundError.js';
import FailedToCreateError from '../errors/FailedToCreateError.js';
import authMiddleware from '../middlewear/auth.js';

const router = Router();

router.get("/", async (req, res) => {
    const { location, pricePerNight } = req.query;
    const properties = await prisma.property.findMany({
        where: {
            location: location,
            pricePerNight: pricePerNight
        },
    });
    if (properties.length <= 0) throw new NotFoundError("Property");
    res.status(200).json(properties);
});

router.post("/", authMiddleware, async (req, res) => {
    try {
        const { hostId, title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, rating } = req.body;
        const newProperty = await prisma.property.create({
            data: {
                hostId: hostId,
                title: title,
                description: description,
                location: location,
                pricePerNight: pricePerNight,
                bedroomCount: bedroomCount,
                bathRoomCount: bathRoomCount,
                maxGuestCount: maxGuestCount,
                rating: rating,
            }
        });
        res.status(201).json(newProperty);
    } catch (error) {
        throw new FailedToCreateError("Property");
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const property = await prisma.property.findFirst({
        where: { id: id },
    });
    if (!property) throw new NotFoundError("Property", id);
    res.status(200).json(property);
});

router.delete("/:id", authMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
        const property = await prisma.property.delete({
            where: { id: id },
        });
        res.status(200).json(property);
    } catch (error) {
        throw new NotFoundError("Property", id);
    }
});

router.put("/:id", authMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
        const { hostId, title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, rating } = req.body;
        const property = await prisma.property.update({
            where: { id: id },
            data: {
                hostId: hostId,
                title: title,
                description: description,
                location: location,
                pricePerNight: pricePerNight,
                bedroomCount: bedroomCount,
                bathRoomCount: bathRoomCount,
                maxGuestCount: maxGuestCount,
                rating: rating,
            },
        })
        res.status(200).send(property);
    } catch (error) {
        throw new NotFoundError("Property", id);
    }
});

export default router

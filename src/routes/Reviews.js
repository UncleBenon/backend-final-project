import { Router } from 'express';
import { prisma } from "../client.js";
import NotFoundError from '../errors/NotFoundError.js';
import FailedToCreateError from '../errors/FailedToCreateError.js';
import authMiddleware from '../middlewear/auth.js';

const router = Router();

router.get("/", async (_req, res) => {
    const properties = await prisma.review.findMany();
    if (properties.length <= 0) throw new NotFoundError("Review");
    res.status(200).json(properties);
});

router.post("/", authMiddleware, async (req, res) => {
    try {
        const { userId, propertyId, rating, comment } = req.body;
        const newReview = await prisma.review.create({
            data: {
                userId: userId,
                propertyId: propertyId,
                rating: rating,
                comment: comment,
            }
        })
        res.status(201).json(newReview);
    } catch (error) {
        throw new FailedToCreateError("Review");
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const review = await prisma.review.findFirst({
        where: { id: id },
    });
    if (!review) throw new NotFoundError("Review", id);
    res.status(200).json(review);
});

router.delete("/:id", authMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
        const review = await prisma.review.delete({
            where: { id: id },
        });
        res.status(200).json(review);
    } catch (error) {
        throw new NotFoundError("Review", id);
    }
});

router.put("/:id", authMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
        const { userId, propertyId, rating, comment } = req.body;
        const review = await prisma.review.update({
            where: { id: id },
            data: {
                userId: userId,
                propertyId: propertyId,
                rating: rating,
                comment: comment,
            },
        })
        res.status(200).send(review);
    } catch (error) {
        throw new NotFoundError("Review", id);
    }
});

export default router;

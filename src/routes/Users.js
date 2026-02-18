import { Router } from 'express';
import { prisma } from "../client.js";
import NotFoundError from '../errors/NotFoundError.js';
import FailedToCreateError from '../errors/FailedToCreateError.js';
import authMiddleware from '../middlewear/auth.js';

const router = Router();

router.get("/", authMiddleware, async (req, res) => {
    const { username, email } = req.query;
    const users = await prisma.user.findMany({
        where: {
            username: username,
            email: email,
        },
        include: { password: false }
    });
    if (users.length <= 0) throw new NotFoundError("User");
    res.status(200).json(users);
});

router.get("/:id", authMiddleware, async (req, res) => {
    const { id } = req.params;
    const user = await prisma.user.findFirst({
        where: { id: id },
        include: { password: false }
    });
    if (!user) throw new NotFoundError("User", id);
    res.status(200).json(user);
});

router.post("/", authMiddleware, async (req, res) => {
    try {
        const { username, password, name, email, phoneNumber, pictureUrl } = req.body;
        const newUser = await prisma.user.create({
            data: {
                username: username,
                password: password,
                name: name,
                email: email,
                phoneNumber: phoneNumber,
                pictureUrl: pictureUrl
            }
        })
        res.status(201).json(newUser);
    } catch (error) {
        throw new FailedToCreateError("User");
    }
});

router.delete("/:id", authMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
        const user = await prisma.user.delete({
            where: { id: id },
        });
        res.status(200).json(user);
    } catch (error) {
        throw new NotFoundError("User", id);
    }
});

router.put("/:id", authMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
        const { username, password, fullName, email, phoneNumber, pictureUrl } = req.body;
        const user = await prisma.user.update({
            where: { id: id },
            data: {
                username: username,
                password: password,
                name: fullName,
                email: email,
                phoneNumber: phoneNumber,
                pictureUrl: pictureUrl
            },
        })
        res.status(200).send(user);
    } catch (error) {
        throw new NotFoundError("User", id);
    }
});

export default router

import express from 'express';
import { prisma } from "../client.js";
import NotFoundError from '../errors/NotFoundError.js';

const router = express.Router();

router.get("/", async (req, res) => {
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

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const user = await prisma.user.findFirst({
        where: { id: id },
        include: { password: false }
    });
    if (!user) throw new NotFoundError("User", id);
    res.status(200).json(user);
});

router.post("/", async (req, res) => {
    const test = req.body;
});

// TODO: This needs auth middlewear.
//       Everything below this point does.

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const user = await prisma.user.delete({
            where: { id: id },
        });
        res.status(201).json(user);
    } catch (error) {
        throw new NotFoundError("User", id);
    }
});

export default router

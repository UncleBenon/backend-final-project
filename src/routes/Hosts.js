import { Router } from 'express';
import { prisma } from "../client.js";
import NotFoundError from '../errors/NotFoundError.js';
import FailedToCreateError from '../errors/FailedToCreateError.js';
import authMiddleware from '../middlewear/auth.js';

const router = Router();

router.get("/", authMiddleware, async (req, res) => {
    const { name } = req.query;
    const hosts = await prisma.host.findMany({
        where: {
            name: name,
        },
        include: { password: false }
    });
    if (hosts.length <= 0) throw new NotFoundError("User");
    res.status(200).json(hosts);
});

router.post("/", authMiddleware, async (req, res) => {
    try {
        const { username, password, name, email, phoneNumber, pictureUrl, aboutMe } = req.body;
        const newHost = await prisma.host.create({
            data: {
                username: username,
                password: password,
                name: name,
                email: email,
                phoneNumber: phoneNumber,
                pictureUrl: pictureUrl,
                aboutMe: aboutMe,
            }
        });
        res.status(201).json(newHost);
    } catch (error) {
        throw new FailedToCreateError("Host");
    }
});

router.get("/:id", authMiddleware, async (req, res) => {
    const { id } = req.params;
    const host = await prisma.host.findFirst({
        where: {
            id: id,
        }
    });
    if (!host) throw new NotFoundError("Host", id);
    res.status(200).json(host);
});

router.delete("/:id", authMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
        const host = await prisma.host.delete({
            where: { id: id },
        });
        res.status(200).json(host);
    } catch (error) {
        console.log(error);
        throw new NotFoundError("Host", id);
    }
});

router.put("/:id", authMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
        const { username, password, name, email, phoneNumber, pictureUrl, aboutMe } = req.body;
        const host = await prisma.host.update({
            where: { id: id },
            data: {
                username: username,
                password: password,
                name: name,
                email: email,
                phoneNumber: phoneNumber,
                pictureUrl: pictureUrl,
                aboutMe: aboutMe,
            },
        })
        res.status(200).send(host);
    } catch (error) {
        throw new NotFoundError("Host", id);
    }
});

export default router;

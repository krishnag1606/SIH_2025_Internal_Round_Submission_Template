import { Router } from "express";
import { registerType } from "../lib/zodTypes.js";
import prisma from "../lib/prismaClient.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();

const salt = bcrypt.genSaltSync(10);

router.post("/register", async (req, res) => {

    const body = req.body;

    try {

        const parsedBody = registerType.safeParse(body);

        if (!parsedBody.success) {
            return res.status(400).json({ error: parsedBody.error, status: false });
        }

        const { name, email, phone, password, age, gender, address } = parsedBody.data;

        const existingPatient = await prisma.patient.findFirst({
            where: {
                email: email
            }
        });

        if (existingPatient) {
            return res.status(400).json({ error: "Patient already exists", status: false });
        }

        const hashedPassword = bcrypt.hashSync(password, salt);

        const patient = await prisma.patient.create({
            data: {
                name,
                email,
                phone,
                password: hashedPassword,
                age,
                gender,
                address
            }
        });

        const token = jwt.sign({ id: patient.id }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        });

        return res.status(201).json({ token, status: true });

    } catch (error) {
        console.error("Error registering patient:", error);
        return res.status(500).json({ error: "Internal server error", status: false });
    }
});

router.post("/login", async (req, res) => {

    const { phone, password } = req.body;

    try {

        if (!phone || !password) {
            return res.status(400).json({ error: "Phone and password are required", status: false });
        }

        const patient = await prisma.patient.findUnique({
            where: {
                phone: phone
            }
        });

        if (!patient || !bcrypt.compareSync(password, patient.password)) {
            return res.status(400).json({ error: "Invalid phone or password", status: false });
        }

        const token = jwt.sign({ id: patient.id }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        });

        return res.status(200).json({ token, status: true });

    } catch (error) {
        console.error("Error logging in patient:", error);
        return res.status(500).json({ error: "Internal server error", status: false });
    }
});

router.get("/me", async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: "Authorization header missing", status: false });
    }

    const token = authHeader.split(" ")[1];

    console.log(token)

    if (!token) {
        return res.status(401).json({ error: "Token missing", status: false });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const patientId = decoded.id;

        const patient = await prisma.patient.findUnique({
            where: {
                id: patientId
            },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                age: true,
                gender: true,
                address: true
            }
        });

        if (!patient) {
            return res.status(404).json({ error: "Patient not found", status: false });
        }

        return res.status(200).json({ patient, status: true });

    } catch (error) {
        console.error("Error fetching patient data:", error);
        return res.status(500).json({ error: "Internal server error", status: false });
    }
});

export default router;
import { Router } from "express";
import prisma from "../lib/prismaClient.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { doctorAuthMiddleware } from "../middleware/doctorAuthMiddleware.js";

const router = Router();

const salt = bcrypt.genSaltSync(10);

router.post("/register", async (req, res) => {

    const body = req.body;

    try {

        const { name, email, phone, password, specialization, experience, gender, language, address } = body;

        const existingDoctor = await prisma.doctor.findFirst({
            where: {
                OR: [{ email }, { phone }]
            }
        });

        if (existingDoctor) {
            return res.status(400).json({ error: "Doctor already exists", status: false });
        }

        const hashedPassword = bcrypt.hashSync(password, salt);

        const doctor = await prisma.doctor.create({
            data: {
                name,
                email,
                phone,
                password: hashedPassword,
                specialization,
                experience,
                gender,
                language: {
                    create: language.map(lang => ({ language: lang }))
                },
                address
            },
            include: {
                language: true
            }
        });

        const token = jwt.sign({ id: doctor.id }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        });

        return res.status(201).json({ token, status: true });

    } catch (error) {
        console.error("Error registering doctor:", error);
        return res.status(500).json({ error: "Internal server error", status: false });
    }
});

router.post("/login", async (req, res) => {

    const { phone, password } = req.body;

    try {

        if (!phone || !password) {
            return res.status(400).json({ error: "Phone and password are required", status: false });
        }

        const doctor = await prisma.doctor.findUnique({
            where: {
                phone: phone
            }
        });

        if (!doctor || !bcrypt.compareSync(password, doctor.password)) {
            return res.status(400).json({ error: "Invalid phone or password", status: false });
        }

        const token = jwt.sign({ id: doctor.id }, process.env.JWT_SECRET, {
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
        const doctorId = decoded.id;

        const doctor = await prisma.doctor.findUnique({
            where: {
                id: doctorId
            }
        });

        if (!doctor) {
            return res.status(404).json({ error: "Doctor not found", status: false });
        }

        return res.status(200).json({ doctor, status: true });

    } catch (error) {
        console.error("Error fetching doctor data:", error);
        return res.status(500).json({ error: "Internal server error", status: false });
    }
});

router.get("/all", async (req, res) => {

    try {

        const doctors = await prisma.doctor.findMany({
            include: {
                language: true,
                Appointment: true,
                DoctorAvailability: true
            }
        })

        res.status(200).json({ doctors, status: true });

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error", status: false });
    }

})

router.post("/book", async (req, res) => {
    const { doctorId, patientId, availabilityId } = req.body;

    console.log(doctorId, patientId, availabilityId);

    try {
        const appointment = await prisma.appointment.create({
            data: {
                doctorId,
                patientId,
                availabilityId
            }
        });

        res.status(201).json({ appointment, status: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error", status: false });
    }
})

router.get("/appointments/today", doctorAuthMiddleware, async (req, res) => {
    const doctorId = req.doctorId;

    try {

        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const appointments = await prisma.appointment.findMany({
            where: {
                doctorId: doctorId,
                availability: {
                    date: {
                        gte: startOfDay,
                        lt: endOfDay
                    }
                }
            },
            include: {
                availability: true,
                patient: true
            }
        });

        res.status(200).json({ appointments, status: true });
    } catch (error) {
        console.error("Error fetching today's appointments:", error);
        res.status(500).json({ error: "Internal server error", status: false });
    }
})


export default router;
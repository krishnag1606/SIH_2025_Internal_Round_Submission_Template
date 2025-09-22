import express from "express"
import http from "http"
import { Server } from "socket.io"
import cors from "cors"
import patientRouter from "./routes/patientRoute.js"
import doctorRouter from "./routes/doctorRoute.js"

const app = express();
const server = http.createServer(app);

app.use(cors({ origin: "*" }));
app.use(express.json());

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true
    }
});

const onlinePatients = new Map();
const onlineDoctors = new Map();

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("register-patient", ({ patientId }) => {
        onlinePatients.set(patientId, socket.id);
        console.log("Registered patient:", patientId, "with socket ID:", socket.id);
    })

    socket.on("register-doctor", ({ doctorId }) => {
        onlineDoctors.set(doctorId, socket.id);
        console.log("Registered doctor:", doctorId, "with socket ID:", socket.id);
    });

    socket.on("call-patient", async ({ patientId, metadata }) => {

        const videoRoomId = `room-${socket.id}-${patientId}`;

        const patientSocketId = onlinePatients.get(patientId);
        if (!patientSocketId) {
            socket.emit('call-failed', { reason: 'Patient not online' });
            return;
        }

        io.to(patientSocketId).emit("incoming-call", { from: socket.id, metadata, videoRoomId });
    })

    socket.on("accept-call", ({ doctorId, videoRoomId }) => {
        const doctorSocketId = onlineDoctors.get(doctorId);
        if (doctorSocketId) {
            io.to(doctorSocketId).emit("call-accepted", { patientId: socket.data.id, videoRoomId });
        }
    })

    socket.on("signal", ({ toUserId, toRole, data }) => {
        const targetSocketId =
            toRole === "doctor"
                ? onlineDoctors.get(toUserId)
                : onlinePatients.get(toUserId);

        if (targetSocketId) {
            io.to(targetSocketId).emit("signal", {
                fromUserId: socket.data.id,
                fromRole: socket.data.role,
                data,
            });
        }
    });

    socket.on("disconnect", () => {
        console.log("disconnected:", socket.id);
    });
});

app.use("/patient", patientRouter)
app.use("/doctor", doctorRouter)

app.get("/", (req, res) => {
    res.status(200).json({ msg: "Hello World!" });
});

server.listen(4000, () => {
    console.log("Server is running on port 4000");
});
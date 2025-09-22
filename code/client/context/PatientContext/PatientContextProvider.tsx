import React, { ReactNode, useEffect, useState } from "react";
import { PatientContext, PatientType } from "./PatientContext";
import axios from "axios";
import { AllDoctorsRoute, BASE_URL, MeRoute } from "@/lib/RouteProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import io, { Socket } from "socket.io-client"

interface PropType {
    children: ReactNode;
}

const PatientContextProvider: React.FC<PropType> = ({ children }) => {
    const [patient, setPatient] = useState<PatientType | null>(null);
    const [socket, setSocket] = useState<Socket | null>(null);

    async function fetchPatient() {
        try {
            const token = await AsyncStorage.getItem("token");

            if (!token) {
                return;
            }

            const res = (await axios.get(MeRoute, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }));

            console.log("Fetched patient data:", res.data);

            if (res.data.status) {
                const data: PatientType = res.data.patient;
                setPatient(data);

                // Initialize socket connection
                const newSocket = io(BASE_URL);

                newSocket.on("connect", () => {
                    console.log("Socket connected:", newSocket.id);
                    newSocket.emit("register-patient", { patientId: data.id });
                    setSocket(newSocket);
                });

            }
        } catch (err) {
            console.log("Failed to fetch patient:", err);
        }
    }
    useEffect(() => {
        fetchPatient();

        return (() => {
            if (socket) {
                socket.disconnect();
            }
        })
    }, []);

    return (
        <PatientContext.Provider value={{ patient, setPatient, fetchPatient, socket, setSocket }}>
            {children}
        </PatientContext.Provider>
    );
};

export default PatientContextProvider;

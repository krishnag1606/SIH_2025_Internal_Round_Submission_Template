import React, { ReactNode, useEffect, useState } from "react";
import { DoctorContext, DoctorType } from "./DoctorContext";
import axios from "axios";
import { AllDoctorsRoute, MeRoute } from "@/lib/RouteProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import io, { Socket } from "socket.io-client"
import { BASE_URL } from "@/lib/RouteProvider";

interface PropType {
    children: ReactNode;
}

const DoctorContextProvider: React.FC<PropType> = ({ children }) => {
    const [doctor, setDoctor] = useState<DoctorType | null>(null);
    const [socket, setSocket] = useState<Socket | null>(null);

    async function fetchDoctor() {
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
                const data: DoctorType = res.data.doctor;
                setDoctor(data);

                // Initialize socket connection
                const newSocket = io(BASE_URL);

                newSocket.on("connect", () => {
                    console.log("Socket connected:", newSocket.id);
                    newSocket.emit("register-doctor", { doctorId: data.id });
                    setSocket(newSocket);
                });

            }
        } catch (err) {
            console.log("Failed to fetch doctor:", err);
        }
    }

    useEffect(() => {

        fetchDoctor();
    }, []);

    return (
        <DoctorContext.Provider value={{ doctor, setDoctor, socket, setSocket, fetchDoctor }}>
            {children}
        </DoctorContext.Provider>
    );
};

export default DoctorContextProvider;

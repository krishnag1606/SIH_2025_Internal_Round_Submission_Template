import { createContext } from "react";
import { Socket } from "socket.io-client";


export interface PatientType {
    id: number;
    name: string;
    email: string;
    password: string;
    specialization: string;
    experience: number;
    gender: string;
    phone?: string | null;
    address?: string | null;
    createdAt: string;
    updatedAt: string;
}


interface PatientContextType {
    patient: PatientType | null;
    setPatient: (patient: PatientType | null) => void;
    fetchPatient: () => Promise<void>;
    socket: Socket | null;
    setSocket: (socket: Socket | null) => void;
}

const defaultValues: PatientContextType = {
    patient: null,
    setPatient: () => { },
    fetchPatient: async () => { },
    socket: null,
    setSocket: () => { },
};

export const PatientContext = createContext<PatientContextType>(defaultValues);

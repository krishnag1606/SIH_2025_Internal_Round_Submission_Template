import { createContext } from "react";
import { Socket } from "socket.io-client";

export interface DoctorLanguage {
    id: number;
    doctorId: number;
    language: string;
}

export interface DoctorAvailability {
    id: number;
    doctorId: number;
    date: string;
    slot: string;
    isBooked: boolean;
}

export interface DoctorType {
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
    language: DoctorLanguage[];
    Appointment: any[];
    DoctorAvailability: DoctorAvailability[];
}


interface DoctorContextType {
    doctor: DoctorType | null;
    setDoctor: (doctors: DoctorType | null) => void;
    socket: Socket | null;
    setSocket: (socket: Socket | null) => void;
    fetchDoctor: () => Promise<void>;
}

const defaultValues: DoctorContextType = {
    doctor: null,
    setDoctor: () => { },
    socket: {} as Socket,
    setSocket: () => { },
    fetchDoctor: async () => { },
};

export const DoctorContext = createContext<DoctorContextType>(defaultValues);

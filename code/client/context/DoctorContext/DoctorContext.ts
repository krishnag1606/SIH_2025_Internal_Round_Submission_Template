import { createContext } from "react";

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
    doctors: DoctorType[];
    setDoctors: (doctors: DoctorType[]) => void;
}

const defaultValues: DoctorContextType = {
    doctors: [],
    setDoctors: () => { },
};

export const DoctorContext = createContext<DoctorContextType>(defaultValues);

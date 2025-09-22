import React, { ReactNode, useEffect, useState } from "react";
import { DoctorContext, DoctorType } from "./DoctorContext";
import axios from "axios";
import { AllDoctorsRoute } from "@/lib/RouteProvider";

interface PropType {
    children: ReactNode;
}

const DoctorContextProvider: React.FC<PropType> = ({ children }) => {
    const [doctors, setDoctors] = useState<DoctorType[]>([]);

    useEffect(() => {
        async function fetchDoctors() {
            try {
                const res = await axios.get(AllDoctorsRoute);
                const data: DoctorType[] = res.data.doctors;
                setDoctors(data);
            } catch (err) {
                console.log("Failed to fetch doctors:", err);
            }
        }

        fetchDoctors();
    }, []);

    return (
        <DoctorContext.Provider value={{ doctors, setDoctors }}>
            {children}
        </DoctorContext.Provider>
    );
};

export default DoctorContextProvider;

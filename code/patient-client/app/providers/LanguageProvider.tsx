"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// types
export type Language = "english" | "hindi" | "punjabi";
export type Screen =
    | "language"
    | "home"
    | "doctor"
    | "medicine"
    | "records"
    | "symptoms"
    | "community";

// translations
export const translations: Record<Language, Record<string, string>> = {
    english: {
        selectLanguage: "Select Your Language",
        continue: "Continue",
        consultDoctor: "Consult a Doctor",
        checkMedicines: "Check Medicines",
        healthRecords: "My Health Records",
        symptomChecker: "Symptom Checker",
        offlineMode: "Offline Mode",
        online: "Online",
        offline: "Offline",
        welcome: "Welcome to TeleMed",
        yourHealth: "Your health, our priority",
        doctorConsultation: "Doctor Consultation",
        medicineAvailability: "Medicine Availability",
        myHealthRecords: "My Health Records",
        aiSymptomChecker: "AI Symptom Checker",
        communityMode: "Community Access",
        bookAppointment: "Book Appointment",
        startVideoCall: "Start Video Call",
        voiceCall: "Voice Call",
        chatWithDoctor: "Chat with Doctor",
        searchMedicine: "Search for medicine...",
        nearbyPharmacies: "Nearby Pharmacies",
        available: "Available",
        outOfStock: "Out of Stock",
        patientCard: "Digital Patient Card",
        syncData: "Sync Data",
        pastConsultations: "Past Consultations",
        describeSymptoms: "Describe your symptoms",
        speakSymptoms: "Tap to speak",
        homeCare: "Home Care",
        pharmacyVisit: "Visit Pharmacy",
        doctorConsult: "Consult Doctor",
        kioskMode: "ASHA Worker Mode",
        addPatient: "Add New Patient",
        switchProfile: "Switch Profile",
    },
    hindi: {
        selectLanguage: "अपनी भाषा चुनें",
        continue: "जारी रखें",
        consultDoctor: "डॉक्टर से सलाह लें",
        checkMedicines: "दवाइयाँ देखें",
        healthRecords: "मेरे स्वास्थ्य रिकॉर्ड",
        symptomChecker: "लक्षण जाँचकर्ता",
        offlineMode: "ऑफलाइन मोड",
        online: "ऑनलाइन",
        offline: "ऑफलाइन",
        welcome: "टेलीमेड में आपका स्वागत है",
        yourHealth: "आपका स्वास्थ्य, हमारी प्राथमिकता",
        doctorConsultation: "डॉक्टर परामर्श",
        medicineAvailability: "दवा की उपलब्धता",
        myHealthRecords: "मेरे स्वास्थ्य रिकॉर्ड",
        aiSymptomChecker: "एआई लक्षण जाँचकर्ता",
        communityMode: "सामुदायिक पहुँच",
        bookAppointment: "अपॉइंटमेंट बुक करें",
        startVideoCall: "वीडियो कॉल शुरू करें",
        voiceCall: "वॉयस कॉल",
        chatWithDoctor: "डॉक्टर से चैट करें",
        searchMedicine: "दवा खोजें...",
        nearbyPharmacies: "नजदीकी फार्मेसी",
        available: "उपलब्ध",
        outOfStock: "स्टॉक में नहीं",
        patientCard: "डिजिटल मरीज़ कार्ड",
        syncData: "डेटा सिंक करें",
        pastConsultations: "पिछली सलाह",
        describeSymptoms: "अपने लक्षण बताएं",
        speakSymptoms: "बोलने के लिए टैप करें",
        homeCare: "घरेलू देखभाल",
        pharmacyVisit: "फार्मेसी जाएं",
        doctorConsult: "डॉक्टर से सलाह लें",
        kioskMode: "आशा वर्कर मोड",
        addPatient: "नया मरीज़ जोड़ें",
        switchProfile: "प्रोफाइल बदलें",
    },
    punjabi: {
        selectLanguage: "ਆਪਣੀ ਭਾਸ਼ਾ ਚੁਣੋ",
        continue: "ਜਾਰੀ ਰੱਖੋ",
        consultDoctor: "ਡਾਕਟਰ ਨਾਲ ਸਲਾਹ ਕਰੋ",
        checkMedicines: "ਦਵਾਈਆਂ ਦੇਖੋ",
        healthRecords: "ਮੇਰੇ ਸਿਹਤ ਰਿਕਾਰਡ",
        symptomChecker: "ਲੱਛਣ ਜਾਂਚਕਰਤਾ",
        offlineMode: "ਔਫਲਾਈਨ ਮੋਡ",
        online: "ਔਨਲਾਈਨ",
        offline: "ਔਫਲਾਈਨ",
        welcome: "ਟੈਲੀਮੈਡ ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ",
        yourHealth: "ਤੁਹਾਡੀ ਸਿਹਤ, ਸਾਡੀ ਤਰਜੀਹ",
        doctorConsultation: "ਡਾਕਟਰ ਸਲਾਹ",
        medicineAvailability: "ਦਵਾਈ ਦੀ ਉਪਲਬਧਤਾ",
        myHealthRecords: "ਮੇਰੇ ਸਿਹਤ ਰਿਕਾਰਡ",
        aiSymptomChecker: "ਏਆਈ ਲੱਛਣ ਜਾਂਚਕਰਤਾ",
        communityMode: "ਭਾਈਚਾਰਕ ਪਹੁੰਚ",
        bookAppointment: "ਮੁਲਾਕਾਤ ਬੁੱਕ ਕਰੋ",
        startVideoCall: "ਵੀਡੀਓ ਕਾਲ ਸ਼ੁਰੂ ਕਰੋ",
        voiceCall: "ਆਵਾਜ਼ ਕਾਲ",
        chatWithDoctor: "ਡਾਕਟਰ ਨਾਲ ਚੈਟ ਕਰੋ",
        searchMedicine: "ਦਵਾਈ ਖੋਜੋ...",
        nearbyPharmacies: "ਨੇੜਲੀ ਫਾਰਮੇਸੀ",
        available: "ਉਪਲਬਧ",
        outOfStock: "ਸਟਾਕ ਵਿੱਚ ਨਹੀਂ",
        patientCard: "ਡਿਜੀਟਲ ਮਰੀਜ਼ ਕਾਰਡ",
        syncData: "ਡੇਟਾ ਸਿੰਕ ਕਰੋ",
        pastConsultations: "ਪਿਛਲੀ ਸਲਾਹ",
        describeSymptoms: "ਆਪਣੇ ਲੱਛਣ ਦੱਸੋ",
        speakSymptoms: "ਬੋਲਣ ਲਈ ਟੈਪ ਕਰੋ",
        homeCare: "ਘਰੇਲੂ ਦੇਖਭਾਲ",
        pharmacyVisit: "ਫਾਰਮੇਸੀ ਜਾਓ",
        doctorConsult: "ਡਾਕਟਰ ਨਾਲ ਸਲਾਹ ਕਰੋ",
        kioskMode: "ਆਸ਼ਾ ਵਰਕਰ ਮੋਡ",
        addPatient: "ਨਵਾਂ ਮਰੀਜ਼ ਜੋੜੋ",
        switchProfile: "ਪ੍ਰੋਫਾਈਲ ਬਦਲੋ",
    },
};

// context type
type LanguageContextType = {
    lang: Language;
    setLang: (lang: Language) => void;
    t: (key: string) => string;
};

// create context
const LanguageContext = createContext<LanguageContextType | undefined>(
    undefined
);

// provider
export function LanguageProvider({ children }: { children: ReactNode }) {
    const [lang, setLang] = useState<Language>("english");

    const t = (key: string) => translations[lang][key] || key;

    return (
        <LanguageContext.Provider value={{ lang, setLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

// custom hook
export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within LanguageProvider");
    }
    return context;
}

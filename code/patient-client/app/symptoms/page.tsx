"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    ChevronLeft,
    Mic,
    X,
    Search,
    Home,
    Pill,
    Stethoscope,
    Shield,
    Plus,
    User,
    Check,
    FileText,
    Video,
} from "lucide-react";

// mock translation object
const t = {
    aiSymptomChecker: "AI Symptom Checker",
    describeSymptoms: "Describe your symptoms",
    speakSymptoms: "Tap the mic and speak your symptoms",
    homeCare: "Home Care",
    pharmacyVisit: "Pharmacy Visit",
    doctorConsult: "Consult a Doctor",
    kioskMode: "Community Mode",
    addPatient: "Add Patient",
    switchProfile: "Switch Patient Profile",
};

export default function SymptomsPage() {
    const [isRecording, setIsRecording] = useState(false);
    const [currentPatient, setCurrentPatient] = useState("Ravi Kumar");

    const patients = [
        { id: "P001", name: "Ravi Kumar", age: 45 },
        { id: "P002", name: "Sita Devi", age: 39 },
        { id: "P003", name: "Amit Sharma", age: 50 },
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
                <div className="flex items-center">
                    <Button variant="ghost" size="sm" onClick={() => history.back()}>
                        <ChevronLeft className="w-5 h-5" />
                    </Button>
                    <h1 className="ml-2 text-lg font-semibold text-gray-900 dark:text-white">
                        {t.aiSymptomChecker}
                    </h1>
                </div>
            </div>

            <div className="p-4 space-y-4">
                {/* Voice Input */}
                <Card className="p-6">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        {t.describeSymptoms}
                    </h2>
                    <div className="flex flex-col items-center space-y-4">
                        <Button
                            size="lg"
                            variant={isRecording ? "destructive" : "default"}
                            className="w-24 h-24 rounded-full"
                            onClick={() => setIsRecording(!isRecording)}
                        >
                            {isRecording ? <X className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
                        </Button>
                        <p className="text-center text-gray-600 dark:text-gray-300">
                            {isRecording ? "Listening..." : t.speakSymptoms}
                        </p>
                    </div>
                </Card>

                {/* Text Input */}
                <Card className="p-4">
                    <Input placeholder="Type your symptoms here..." className="mb-4" />
                    <Button className="w-full">
                        <Search className="w-4 h-4 mr-2" />
                        Analyze Symptoms
                    </Button>
                </Card>

                {/* Common Symptoms */}
                <Card className="p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                        Common Symptoms
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                        {["Fever", "Headache", "Cough", "Cold", "Stomach Pain", "Weakness"].map(
                            (symptom) => (
                                <Button key={symptom} variant="outline" size="sm">
                                    {symptom}
                                </Button>
                            )
                        )}
                    </div>
                </Card>

                {/* Recommendations */}
                <Card className="p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                        Recommendations
                    </h3>
                    <div className="space-y-3">
                        {[
                            { type: t.homeCare, icon: Home, color: "text-green-600", bgColor: "bg-green-50" },
                            { type: t.pharmacyVisit, icon: Pill, color: "text-yellow-600", bgColor: "bg-yellow-50" },
                            { type: t.doctorConsult, icon: Stethoscope, color: "text-red-600", bgColor: "bg-red-50" },
                        ].map((rec, index) => (
                            <div
                                key={index}
                                className={`flex items-center p-3 rounded-lg ${rec.bgColor}`}
                            >
                                <rec.icon className={`w-5 h-5 ${rec.color} mr-3`} />
                                <span className={`font-semibold ${rec.color}`}>{rec.type}</span>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* --- Community Mode --- */}
                <Card className="p-4 border-2 border-blue-200 dark:border-blue-800">
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="font-semibold text-gray-900 dark:text-white">
                            Current Patient
                        </h2>
                        <Button size="sm" variant="outline">
                            <Plus className="w-4 h-4 mr-2" />
                            {t.addPatient}
                        </Button>
                    </div>
                    <div className="flex items-center">
                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                            <User className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900 dark:text-white">{currentPatient}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                Age: 45 | ID: P001
                            </p>
                        </div>
                    </div>
                </Card>

                {/* Patient List */}
                <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                        {t.switchProfile}
                    </h3>
                    {patients.map((patient) => (
                        <Card
                            key={patient.id}
                            className={`p-4 mb-3 cursor-pointer transition-colors ${currentPatient === patient.name
                                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                                : "hover:bg-gray-50 dark:hover:bg-gray-800"
                                }`}
                            onClick={() => setCurrentPatient(patient.name)}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center mr-3">
                                        <User className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900 dark:text-white">
                                            {patient.name}
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            Age: {patient.age} | ID: {patient.id}
                                        </p>
                                    </div>
                                </div>
                                {currentPatient === patient.name && (
                                    <Check className="w-5 h-5 text-blue-500" />
                                )}
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Quick Actions */}
                <Card className="p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                        Quick Actions
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" size="sm" onClick={() => (window.location.href = "/doctor")}>
                            <Video className="w-4 h-4 mr-2" />
                            Consult
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => (window.location.href = "/symptoms")}>
                            <Stethoscope className="w-4 h-4 mr-2" />
                            Symptoms
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => (window.location.href = "/records")}>
                            <FileText className="w-4 h-4 mr-2" />
                            Records
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => (window.location.href = "/medicine")}>
                            <Pill className="w-4 h-4 mr-2" />
                            Medicine
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
}

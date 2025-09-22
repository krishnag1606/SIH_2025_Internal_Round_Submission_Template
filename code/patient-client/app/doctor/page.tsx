'use client';
import { useAppContext } from '../context/AppContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { User, Video, Phone, MessageCircle, Calendar, ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DoctorPage() {
    const { currentPatient } = useAppContext();
    const router = useRouter();

    const doctors = [
        { name: 'Dr. Priya Sharma', specialty: 'General Medicine', languages: ['Hindi', 'English'], rating: 4.8, available: true },
        { name: 'Dr. Amjit Singh', specialty: 'Pediatrician', languages: ['Punjabi', 'Hindi'], rating: 4.9, available: false },
        { name: 'Dr. Sarah Johnson', specialty: 'Cardiology', languages: ['English'], rating: 4.7, available: true },
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 border-b p-4 flex items-center">
                <Button variant="ghost" size="sm" onClick={() => router.push('/home')}>
                    <ChevronLeft className="w-5 h-5" />
                </Button>
                <h1 className="ml-2 text-lg font-semibold text-gray-900 dark:text-white">Doctor Consultation</h1>
            </div>

            <div className="p-4 space-y-4">
                {doctors.map((doctor, idx) => (
                    <Card key={idx} className="p-4">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                                    <User className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white">{doctor.name}</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">{doctor.specialty}</p>
                                    <p className="text-xs text-gray-500">Languages: {doctor.languages.join(', ')}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="flex items-center mb-1">
                                    <span className="text-yellow-500">★</span>
                                    <span className="text-sm ml-1 text-gray-600 dark:text-gray-300">{doctor.rating}</span>
                                </div>
                                <span className={`text-xs ${doctor.available ? 'text-green-500' : 'text-red-500'}`}>
                                    {doctor.available ? 'Available' : 'Busy'}
                                </span>
                            </div>
                        </div>

                        <div className="flex space-x-2">
                            <Button size="sm" className="flex-1" disabled={!doctor.available}>
                                <Video className="w-4 h-4 mr-2" />
                                Video Call
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1">
                                <Phone className="w-4 h-4 mr-2" />
                                Voice Call
                            </Button>
                        </div>

                        <div className="flex space-x-2 mt-2">
                            <Button size="sm" variant="outline" className="flex-1">
                                <MessageCircle className="w-4 h-4 mr-2" />
                                Chat
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1">
                                <Calendar className="w-4 h-4 mr-2" />
                                Book
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}

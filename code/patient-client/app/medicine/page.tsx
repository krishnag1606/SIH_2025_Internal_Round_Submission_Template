'use client';
import { useAppContext } from '../context/AppContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Map, List, ChevronLeft, Phone } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function MedicinePage() {
    const { viewMode, setViewMode } = useAppContext();
    const router = useRouter();

    const medicines = [
        { name: 'Paracetamol', pharmacy: 'Local Pharmacy', distance: '0.5 km', available: true },
        { name: 'Crocin', pharmacy: 'Health Plus', distance: '1.2 km', available: false },
        { name: 'Amoxicillin', pharmacy: 'Care Chemist', distance: '0.8 km', available: true },
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 border-b p-4 flex items-center mb-4">
                <Button variant="ghost" size="sm" onClick={() => router.push('/home')}>
                    <ChevronLeft className="w-5 h-5" />
                </Button>
                <h1 className="ml-2 text-lg font-semibold text-gray-900 dark:text-white">Medicine Availability</h1>
                <div className="ml-auto flex items-center space-x-2">
                    <Button size="sm" variant="outline" onClick={() => setViewMode(viewMode === 'list' ? 'map' : 'list')}>
                        {viewMode === 'list' ? <Map className="w-4 h-4" /> : <List className="w-4 h-4" />}
                    </Button>
                </div>
            </div>

            <div className="p-4 space-y-3">
                {medicines.map((med, idx) => (
                    <Card key={idx} className="p-4 flex justify-between items-start">
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">{med.name}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{med.pharmacy}</p>
                            <p className="text-xs text-gray-500">{med.distance}</p>
                        </div>
                        <div className="flex flex-col space-y-1">
                            <span className={`text-xs ${med.available ? 'text-green-500' : 'text-red-500'}`}>
                                {med.available ? 'Available' : 'Out of Stock'}
                            </span>
                            <div className="flex space-x-2">
                                <Button size="sm" variant="outline">
                                    <Phone className="w-4 h-4 mr-1" />
                                    Call
                                </Button>
                                <Button size="sm" variant="outline">
                                    <Map className="w-4 h-4 mr-1" />
                                    Directions
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}

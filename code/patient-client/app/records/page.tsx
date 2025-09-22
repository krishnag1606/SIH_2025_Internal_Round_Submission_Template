'use client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FileText, RefreshCw, ChevronLeft, QrCode } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function RecordsPage() {
    const router = useRouter();

    const records = [
        { date: '15 Jan 2024', doctor: 'Dr. Priya Sharma', condition: 'Fever', prescription: 'Paracetamol 500mg' },
        { date: '10 Dec 2023', doctor: 'Dr. Amjit Singh', condition: 'Cold', prescription: 'Crocin, Rest' },
        { date: '25 Nov 2023', doctor: 'Dr. Sarah Johnson', condition: 'Headache', prescription: 'Aspirin' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 border-b p-4 flex justify-between items-center">
                <div className="flex items-center">
                    <Button variant="ghost" size="sm" onClick={() => router.push('/home')}>
                        <ChevronLeft className="w-5 h-5" />
                    </Button>
                    <h1 className="ml-2 text-lg font-semibold text-gray-900 dark:text-white">Health Records</h1>
                </div>
                <Button size="sm" variant="outline">
                    <RefreshCw className="w-4 h-4 mr-1" />
                    Sync
                </Button>
            </div>

            <div className="p-4 space-y-4">
                <Card className="p-6 bg-gradient-to-r from-blue-500 to-green-500 text-white">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h2 className="text-xl font-bold">Patient Card</h2>
                            <p>Rajesh Kumar</p>
                            <p className="text-sm">Age: 45 | ID: P001</p>
                        </div>
                        <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
                            <QrCode className="w-10 h-10 text-gray-800" />
                        </div>
                    </div>
                </Card>

                <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Past Consultations</h3>
                    {records.map((rec, idx) => (
                        <Card key={idx} className="p-4 mb-3">
                            <div className="flex justify-between">
                                <div>
                                    <p className="font-semibold text-gray-900 dark:text-white">{rec.condition}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">{rec.doctor}</p>
                                    <p className="text-xs text-gray-500">{rec.date}</p>
                                </div>
                                <FileText className="w-5 h-5 text-gray-800" />
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2"><strong>Rx:</strong> {rec.prescription}</p>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}

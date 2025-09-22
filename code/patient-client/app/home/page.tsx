'use client';
import { useAppContext } from '../context/AppContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Wifi, WifiOff, Globe, Video, Pill, FileText, Stethoscope, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../providers/LanguageProvider';

export default function HomePage() {
    const { isOnline, viewMode, setViewMode } = useAppContext();
    const { t } = useLanguage();
    const router = useRouter();

    const screens = [
        { label: t('consultDoctor'), icon: Video, url: '/doctor', color: 'bg-blue-500' },
        { label: t('checkMedicines'), icon: Pill, url: '/medicine', color: 'bg-green-500' },
        { label: t('healthRecords'), icon: FileText, url: '/records', color: 'bg-purple-500' },
        { label: t('symptomChecker'), icon: Stethoscope, url: '/symptoms', color: 'bg-red-500' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-sm border-b p-4 flex justify-between items-center">
                <h1 className="text-xl font-bold">Welcome</h1>
                <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                        {isOnline ? <Wifi className="w-5 h-5 text-green-500" /> : <WifiOff className="w-5 h-5 text-red-500" />}
                        <span className="ml-1 text-xs">{isOnline ? 'Online' : 'Offline'}</span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => router.push('/language')}>
                        <Globe className="w-5 h-5" />
                    </Button>
                </div>
            </div>

            {/* Main Content */}
            <div className="p-6 grid grid-cols-2 gap-4">
                {screens.map((item, index) => (
                    <Card
                        key={index}
                        className={`p-6 cursor-pointer hover:scale-105 transition-transform duration-200 ${item.color} text-white`}
                        onClick={() => router.push(item.url)}
                    >
                        <item.icon className="w-6 h-6 mb-2" />
                        <p className="text-center font-semibold">{item.label}</p>
                    </Card>
                ))}
            </div>
        </div>
    );
}

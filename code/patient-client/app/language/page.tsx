'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../providers/LanguageProvider';

export default function LanguagePage() {
    const { lang, setLang, t } = useLanguage();
    const router = useRouter();

    const languages = [
        { key: 'english', label: 'English', flag: '🇬🇧' },
        { key: 'hindi', label: 'हिन्दी', flag: '🇮🇳' },
        { key: 'punjabi', label: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
    ] as const;

    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <Card className="p-6 backdrop-blur-sm bg-white/90">
                <h2 className="text-xl font-bold text-center mb-6">
                    {t('selectLanguage')}
                </h2>
                <div className="space-y-4">
                    {languages.map((language) => (
                        <Button
                            key={language.key}
                            variant={lang === language.key ? 'default' : 'outline'}
                            className="w-full h-14 text-lg justify-start"
                            onClick={() => setLang(language.key)}
                        >
                            <span className="text-2xl mr-3">{language.flag}</span>
                            {language.label}
                        </Button>
                    ))}
                </div>
                <Button
                    className="w-full mt-8 h-12 text-lg bg-green-600 hover:bg-green-700"
                    onClick={() => router.push('/home')}
                >
                    {t('continue')} →
                </Button>
            </Card>
        </div>
    );
}

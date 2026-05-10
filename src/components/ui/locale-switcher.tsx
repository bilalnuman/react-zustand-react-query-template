'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { useTransition } from 'react';

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function onSelectChange(nextLocale: string) {
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={() => onSelectChange('en')}
        disabled={isPending || locale === 'en'}
        className={`px-2 py-1 text-sm font-medium rounded ${
          locale === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        } disabled:opacity-50`}
      >
        EN
      </button>
      <button
        onClick={() => onSelectChange('fr')}
        disabled={isPending || locale === 'fr'}
        className={`px-2 py-1 text-sm font-medium rounded ${
          locale === 'fr' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        } disabled:opacity-50`}
      >
        FR
      </button>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/layout/Sidebar';
import { useAppStore } from '@/lib/store';
import { MobileNav } from '@/components/layout/MobileNav';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, _hasHydrated } = useAppStore();
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!_hasHydrated) return;
    if (!isAuthenticated) {
      router.replace('/login');
    } else {
      setReady(true);
    }
  }, [_hasHydrated, isAuthenticated, router]);

  if (!ready) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6c5ce7] to-[#00d2ff] flex items-center justify-center animate-pulse">
            <span className="text-white text-lg">⚡</span>
          </div>
          <div className="flex gap-1.5">
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-[#6c5ce7]"
                style={{ animation: `bounce 0.6s ease-in-out ${i * 0.15}s infinite alternate` }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Sidebar />
      <MobileNav />
      <main className="lg:ml-64 min-h-screen pb-20 lg:pb-0">
        {children}
      </main>
    </div>
  );
}

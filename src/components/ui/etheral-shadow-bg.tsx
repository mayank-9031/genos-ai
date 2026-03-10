'use client';

import { EtheralShadow } from '@/components/ui/etheral-shadow';

export function EtheralShadowBg() {
    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 0,
                pointerEvents: 'none',
                width: '100vw',
                height: '100vh',
            }}
        >
            <EtheralShadow
                color="rgba(26, 16, 48, 1)"
                animation={{ scale: 60, speed: 40 }}
                noise={{ opacity: 0.6, scale: 1 }}
                sizing="fill"
            />
        </div>
    );
}

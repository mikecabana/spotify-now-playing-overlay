'use client';

import { setCookieConsent } from '@/app/actions';
import { AnimatePresence } from 'motion/react';
import * as motion from 'motion/react-client';
import { useState } from 'react';
import { Btn } from './btn';

type ConsentBannerProps = {
    show: boolean;
};

export function ConsentBanner({ show }: ConsentBannerProps) {
    const [visible, setVisible] = useState(show);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    className="flex flex-col md:flex-row gap-1 items-center sticky bottom-0 md:bottom-2 w-full max-w-[950px] mx-auto z-50 bg-black border border-zinc-700 py-2 px-4 rounded-lg shadow-2xl"
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 100 }}
                >
                    <p className="text-sm opacity-75 flex-grow">
                        {
                            'We use cookies to enhance your experience. By clicking "Allow Cookies", you agree to our use of cookies.'
                        }
                    </p>

                    <div className="flex justify-center md:justify-end shrink-0 gap-1">
                        <form action={() => setCookieConsent('declined')}>
                            <Btn type="submit" onClick={() => setVisible(false)}>
                                <span className="text-sm">Decline</span>
                            </Btn>
                        </form>
                        <form action={() => setCookieConsent('granted')}>
                            <Btn type="submit" onClick={() => setVisible(false)}>
                                <span className="text-sm">Allow Cookies</span>
                            </Btn>
                        </form>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

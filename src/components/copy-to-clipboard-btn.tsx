'use client';

import { FC, ReactNode } from 'react';
import { toast } from 'react-hot-toast';
import { Btn } from './btn';

type CopyToClipboardBtnProps = {
    children: ReactNode;
    value: string;
};

export const CopyToClipboardBtn: FC<CopyToClipboardBtnProps> = ({ children, value }) => {
    const handleCopy = () => {
        navigator.clipboard.writeText(value);
        toast.success('Copied to clipboard!');
    };
    return <Btn onClick={() => handleCopy()}>{children}</Btn>;
};

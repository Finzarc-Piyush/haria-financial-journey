import React from 'react';
import { FaDownload, FaSave, FaShareAlt } from 'react-icons/fa';

interface CTAButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'download' | 'save' | 'share';
    icon?: React.ReactNode;
    children?: React.ReactNode;
}

const baseClass =
    'font-playfair px-6 py-3 rounded-full text-lg shadow-lg transition-transform duration-150 focus:outline-none focus:ring-2 focus:ring-secondary hover:scale-105 active:animate-pulse';

export const PrimaryCTA: React.FC<CTAButtonProps> = ({ children = 'Schedule Consultation', ...props }) => (
    <button
        className={`bg-secondary text-secondary-foreground ${baseClass}`}
        {...props}
    >
        {children}
    </button>
);

export const SecondaryCTA: React.FC<CTAButtonProps> = ({ children = 'Get Personalized Plan', ...props }) => (
    <button
        className={`bg-[#E6C674] text-[#3A3A3A] ${baseClass}`}
        {...props}
    >
        {children}
    </button>
);

export const DownloadCTA: React.FC<CTAButtonProps> = ({ children = 'Download', icon = <FaDownload />, ...props }) => (
    <button
        className={`bg-tertiary text-white ${baseClass}`}
        {...props}
    >
        {icon} <span className="ml-2">{children}</span>
    </button>
);

export const SaveCTA: React.FC<CTAButtonProps> = ({ children = 'Save', icon = <FaSave />, ...props }) => (
    <button
        className={`bg-[#B4A078] text-white ${baseClass}`}
        {...props}
    >
        {icon} <span className="ml-2">{children}</span>
    </button>
);

export const ShareCTA: React.FC<CTAButtonProps> = ({ children = 'Share', icon = <FaShareAlt />, ...props }) => (
    <button
        className={`bg-blue-500 text-white ${baseClass}`}
        {...props}
    >
        {icon} <span className="ml-2">{children}</span>
    </button>
); 
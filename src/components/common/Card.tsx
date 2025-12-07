import React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import styles from './Card.module.css';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
    children,
    className,
    onClick,
    hoverable = false,
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={clsx(
                styles.card,
                (hoverable || onClick) && styles.hoverable,
                className
            )}
            onClick={onClick}
        >
            {children}
        </motion.div>
    );
};

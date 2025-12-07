import React from 'react';
import { Loader2 } from 'lucide-react';
import styles from './Loader.module.css';

interface LoaderProps {
    text?: string;
}

export const Loader: React.FC<LoaderProps> = ({ text }) => {
    return (
        <div className={styles.container}>
            <Loader2 className={styles.spinner} size={48} />
            {text && <p className={styles.text}>{text}</p>}
        </div>
    );
};

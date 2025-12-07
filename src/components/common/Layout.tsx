import React from 'react';
import { Sparkles, HeartPulse, Moon, Sun } from 'lucide-react';
import styles from './Layout.module.css';
import { useAppState } from '../../context/AppStateContext';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { resetApp, theme, toggleTheme } = useAppState();

    return (
        <div className={styles.layout}>
            <header className={styles.header}>
                <div className={styles.headerContent}>
                    <div className={styles.logo} onClick={resetApp} role="button">
                        <HeartPulse className={styles.logoIcon} size={28} />
                        <span className={styles.logoText}>BenefitsAI</span>
                    </div>
                    <div className={styles.controls}>
                        <button onClick={toggleTheme} className={styles.themeToggle} aria-label="Toggle theme">
                            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                        </button>
                        <div className={styles.badge}>
                            <Sparkles size={16} />
                            <span>Interactive Demo</span>
                        </div>
                    </div>
                </div>
            </header>
            <main className={styles.main}>
                {children}
            </main>
            <footer className={styles.footer}>
                <p>© 2025 Benefits Helper. Internal Employee Tool.</p>
            </footer>
        </div>
    );
};

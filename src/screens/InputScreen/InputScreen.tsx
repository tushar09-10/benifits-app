import React, { useState } from 'react';
import { ArrowRight, Search } from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import styles from './InputScreen.module.css';
import { motion } from 'framer-motion';

export const InputScreen: React.FC = () => {
    const { userInput, setUserInput, setStep } = useAppState();
    const [localInput, setLocalInput] = useState(userInput);
    const [error, setLocalError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!localInput.trim()) {
            setLocalError('Please describe your need so we can help you.');
            return;
        }
        setUserInput(localInput);
        setStep('classifying');
    };

    return (
        <div className={styles.container}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className={styles.hero}>
                    <h1 className={styles.title}>How can we help you today?</h1>
                    <p className={styles.subtitle}>
                        Describe your health symptom or need, and our AI will guide you to the right benefit.
                    </p>
                </div>

                <Card className={styles.inputCard}>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.inputWrapper}>
                            <Search className={styles.searchIcon} size={20} />
                            <textarea
                                className={styles.textarea}
                                placeholder="Ex: I have a severe toothache..."
                                value={localInput}
                                onChange={(e) => {
                                    setLocalInput(e.target.value);
                                    if (error) setLocalError('');
                                }}
                                rows={3}
                            />
                        </div>
                        {error && <p className={styles.errorMessage}>{error}</p>}

                        <div className={styles.actions}>
                            <Button type="submit" size="lg" rightIcon={<ArrowRight size={18} />}>
                                Find Benefits
                            </Button>
                        </div>
                    </form>
                </Card>

                <div className={styles.examples}>
                    <p className={styles.exampleLabel}>Try searching for:</p>
                    <div className={styles.tags}>
                        <button type="button" className={styles.tag} onClick={() => setLocalInput('I need new glasses')}>
                            "I need new glasses"
                        </button>
                        <button type="button" className={styles.tag} onClick={() => setLocalInput('Feeling very stressed lately')}>
                            "Feeling very stressed"
                        </button>
                        <button type="button" className={styles.tag} onClick={() => setLocalInput('High fever and body pain')}>
                            "High fever and body pain"
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

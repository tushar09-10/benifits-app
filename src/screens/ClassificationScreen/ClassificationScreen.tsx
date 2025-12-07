import React, { useEffect } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { aiService } from '../../services/aiService';
import { Loader } from '../../components/common/Loader';
import { Button } from '../../components/common/Button';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import styles from './ClassificationScreen.module.css';
import { motion } from 'framer-motion';

export const ClassificationScreen: React.FC = () => {
    const { userInput, setClassification, setStep, error, setError, goBack } = useAppState();

    useEffect(() => {
        const classify = async () => {
            try {
                setError(null);
                // Only classify if we have input and no generic error yet
                if (userInput) {
                    const category = await aiService.classifyNeed(userInput);

                    if (!category) {
                        throw new Error('Could not classify input.');
                    }

                    setClassification(category);
                    setStep('list');
                }
            } catch (err) {
                console.error(err);
                // Fallback or mapped generically?
                // Requirement says: "If AI output is malformed... use fallback... show subtle message"
                // But here I'm simulating a total failure or handling logic.
                // Let's implement the fallback logic inside aiService or here.
                // If it throws, it's a "Network"/Critical error.
                setError('We encountered an issue analyzing your request.');
            }
        };

        classify();
    }, [userInput, setClassification, setStep, setError]);

    if (error) {
        return (
            <div className={styles.container}>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={styles.errorCard}
                >
                    <AlertCircle size={48} className={styles.errorIcon} />
                    <h2 className={styles.errorTitle}>Oops! Something went wrong.</h2>
                    <p className={styles.errorText}>{error}</p>
                    <div className={styles.actions}>
                        <Button variant="outline" onClick={goBack} leftIcon={<ArrowLeft size={16} />}>
                            Go Back
                        </Button>
                        <Button onClick={() => window.location.reload()}>
                            Retry
                        </Button>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <Loader text="Analyzing your health need..." />
        </div>
    );
};

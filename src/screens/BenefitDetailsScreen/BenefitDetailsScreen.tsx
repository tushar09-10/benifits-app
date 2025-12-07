import React, { useEffect } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { aiService } from '../../services/aiService';
import { Loader } from '../../components/common/Loader';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { ArrowLeft, RefreshCw, CheckCircle } from 'lucide-react';
import styles from './BenefitDetailsScreen.module.css';
import { motion } from 'framer-motion';

export const BenefitDetailsScreen: React.FC = () => {
    const {
        userInput,
        selectedBenefit,
        actionPlan,
        setActionPlan,
        setStep,
        resetApp,
        error,
        setError
    } = useAppState();

    useEffect(() => {
        const fetchPlan = async () => {
            if (selectedBenefit && !actionPlan && !error) {
                try {
                    const plan = await aiService.generateActionPlan(userInput, selectedBenefit);
                    setActionPlan(plan);
                } catch (e) {
                    console.error(e);
                    setError("Failed to generate action plan.");
                }
            }
        };
        fetchPlan();
    }, [selectedBenefit, actionPlan, error, userInput, setError, setActionPlan]);

    if (!selectedBenefit) return null;

    const handleRegenerate = async () => {
        setActionPlan(null); // triggers effect
        setError(null);
    };

    return (
        <div className={styles.container}>
            <Button
                variant="ghost"
                className={styles.backButton}
                onClick={() => setStep('list')}
                leftIcon={<ArrowLeft size={16} />}
            >
                Back to benefits
            </Button>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <Card className={styles.benefitHeaderCtx}>
                    <span className={styles.categoryTag}>{selectedBenefit.category}</span>
                    <h1 className={styles.benefitTitle}>{selectedBenefit.title}</h1>
                    <p className={styles.benefitCoverage}>{selectedBenefit.coverage}</p>
                </Card>

                <h2 className={styles.sectionTitle}>Your Action Plan</h2>

                {!actionPlan && !error && (
                    <div className={styles.loaderWrapper}>
                        <Loader text="Generating your personalized action plan..." />
                    </div>
                )}

                {error && (
                    <div className={styles.errorState}>
                        <p>{error}</p>
                        <Button onClick={handleRegenerate} size="sm">Try Again</Button>
                    </div>
                )}

                {actionPlan && (
                    <div className={styles.stepsContainer}>
                        {actionPlan.steps.map((step, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.2 }}
                                className={styles.stepCard}
                            >
                                <div className={styles.stepNumber}>{step.step}</div>
                                <div className={styles.stepContent}>
                                    <h3 className={styles.stepTitle}>{step.title}</h3>
                                    <p className={styles.stepDesc}>{step.description}</p>
                                </div>
                            </motion.div>
                        ))}

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className={styles.completion}
                        >
                            <div className={styles.completionIcon}>
                                <CheckCircle size={24} />
                                <span>You're all set!</span>
                            </div>
                        </motion.div>
                    </div>
                )}

                {actionPlan && (
                    <div className={styles.footerActions}>
                        <Button variant="outline" onClick={handleRegenerate} leftIcon={<RefreshCw size={16} />}>
                            Regenerate Plan
                        </Button>
                        <Button variant="primary" onClick={resetApp}>
                            Start Over
                        </Button>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

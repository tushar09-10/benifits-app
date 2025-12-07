import React, { useMemo } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { benefits } from '../../data/benefits';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { ArrowLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import styles from './BenefitListScreen.module.css';
import { motion } from 'framer-motion';

export const BenefitListScreen: React.FC = () => {
    const { classification, setSelectedBenefit, setStep, resetApp } = useAppState();

    const filteredBenefits = useMemo(() => {
        return benefits.filter(b => b.category === classification);
    }, [classification]);

    const handleSelect = (benefit: typeof filteredBenefits[0]) => {
        setSelectedBenefit(benefit);
        setStep('details');
    };

    return (
        <div className={styles.container}>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className={styles.header}>
                    <div className={styles.headerTop}>
                        <span className={styles.categoryBadge}>{classification}</span>
                    </div>
                    <h2 className={styles.title}>We found relevant benefits for you</h2>
                    <p className={styles.subtitle}>Select a benefit to generate a step-by-step action plan.</p>
                </div>

                <div className={styles.grid}>
                    {filteredBenefits.length > 0 ? (
                        filteredBenefits.map((benefit, index) => (
                            <motion.div
                                key={benefit.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card
                                    hoverable
                                    onClick={() => handleSelect(benefit)}
                                    className={styles.benefitCard}
                                >
                                    <div className={styles.cardContent}>
                                        <div>
                                            <h3 className={styles.benefitTitle}>{benefit.title}</h3>
                                            <p className={styles.benefitDesc}>{benefit.description}</p>
                                            <div className={styles.coverage}>
                                                <CheckCircle2 size={16} className={styles.checkIcon} />
                                                <span>{benefit.coverage}</span>
                                            </div>
                                        </div>
                                        <ChevronRight className={styles.arrow} size={20} />
                                    </div>
                                </Card>
                            </motion.div>
                        ))
                    ) : (
                        <div className={styles.emptyState}>
                            <p>No specific benefits found for this category.</p>
                            <Button onClick={resetApp} variant="outline">Start Over</Button>
                        </div>
                    )}
                </div>

                <div className={styles.footerActions}>
                    <Button variant="ghost" onClick={resetApp} leftIcon={<ArrowLeft size={16} />}>
                        Try another search
                    </Button>
                </div>
            </motion.div>
        </div>
    );
};

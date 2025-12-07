import { useAppState } from './context/AppStateContext';
import { Layout } from './components/common/Layout';
import { InputScreen } from './screens/InputScreen/InputScreen';
import { ClassificationScreen } from './screens/ClassificationScreen/ClassificationScreen';
import { BenefitListScreen } from './screens/BenefitListScreen/BenefitListScreen';
import { BenefitDetailsScreen } from './screens/BenefitDetailsScreen/BenefitDetailsScreen';
import { AnimatePresence, motion } from 'framer-motion';

function AppContent() {
  const { step } = useAppState();

  return (
    <Layout>
      <AnimatePresence mode="wait">
        {step === 'input' && (
          <motion.div key="input" exit={{ opacity: 0, x: -20 }}>
            <InputScreen />
          </motion.div>
        )}
        {step === 'classifying' && (
          <motion.div key="classifying" exit={{ opacity: 0 }}>
            <ClassificationScreen />
          </motion.div>
        )}
        {step === 'list' && (
          <motion.div key="list" exit={{ opacity: 0, x: -20 }}>
            <BenefitListScreen />
          </motion.div>
        )}
        {step === 'details' && (
          <motion.div key="details" exit={{ opacity: 0, x: 20 }}>
            <BenefitDetailsScreen />
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}

function App() {
  return <AppContent />;
}

export default App;

import type { Benefit } from '../types';

export const benefits: Benefit[] = [
    {
        id: 'b1',
        category: 'Dental',
        title: 'Routine Checkup & Cleaning',
        coverage: '100% covered, 2x/year',
        description: 'Full coverage for bi-annual cleanings and oral exams at network clinics.'
    },
    {
        id: 'b2',
        category: 'Dental',
        title: 'Major Dental Procedures',
        coverage: '80% covered up to ₹50,000',
        description: 'Coverage for root canals, crowns, and bridges with a small co-pay.'
    },
    {
        id: 'b3',
        category: 'Vision',
        title: 'Eye Exam & Glasses',
        coverage: 'Up to ₹3,000/year',
        description: 'Annual eye exam coverage plus allowance for frames or contact lenses.'
    },
    {
        id: 'b4',
        category: 'Mental Health',
        title: 'Therapy Sessions',
        coverage: '10 free sessions/year',
        description: 'Access to licensed therapists for in-person or video consultations.'
    },
    {
        id: 'b5',
        category: 'Mental Health',
        title: 'Wellness App Subscription',
        coverage: 'Full Premium Access',
        description: 'Free subscription to Headspace or Calm for mindfulness and sleep.'
    },
    {
        id: 'b6',
        category: 'OPD',
        title: 'General Physician Consultation',
        coverage: 'Unlimited Online Consults',
        description: '24/7 access to general physicians via video call with 0 wait time.'
    },
    {
        id: 'b7',
        category: 'OPD',
        title: 'Diagnostic Tests',
        coverage: '70% reimbursement',
        description: 'Reimbursement for prescribed blood tests and scans at partner labs.'
    },
];

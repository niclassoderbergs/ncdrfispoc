import { BaselineMethod } from '../types';

export const baselineMethods: BaselineMethod[] = [
    { id: 'BM-001', name: 'Nominering', description: 'Based on the schedule submitted by the actor in advance.', approvedProducts: ['mFRR', 'aFRR', 'Lokal Flex'], status: 'Approved' },
    { id: 'BM-002', name: 'Meter before meter after (MBMA)', description: 'Compares the metered value immediately before activation with the metered value immediately after.', approvedProducts: ['FCR-N', 'FCR-D Up', 'FCR-D Down', 'FFR'], status: 'Approved' },
    { id: 'BM-003', name: 'Historisk baseline utan justering', description: 'An average of historical consumption.', approvedProducts: ['FCR-N', 'mFRR', 'Lokal Flex'], status: 'Approved' },
    { id: 'BM-004', name: 'Historisk baseline med SDA', description: 'Historical average adjusted based on the actual outcome on the same day.', approvedProducts: ['aFRR', 'mFRR', 'Lokal Flex'], status: 'Approved' }
];

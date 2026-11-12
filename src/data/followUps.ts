import type { Localized } from '@/types';

export interface FollowUpSign {
  id: string;
  text: string;
  translations: Localized;
}

export const FOLLOW_UP_SIGNS: FollowUpSign[] = [
  { id: 'my-hand', text: 'My hand.', translations: { en: 'My hand.', hi: 'मेरे हाथ में।', kn: 'ನನ್ನ ಕೈಯಲ್ಲಿ.' } },
  { id: 'my-head', text: 'My head.', translations: { en: 'My head.', hi: 'मेरे सिर में।', kn: 'ನನ್ನ ತಲೆಯಲ್ಲಿ.' } },
  {
    id: 'two-days',
    text: 'Two days.',
    translations: { en: 'Two days.', hi: 'दो दिन से।', kn: 'ಎರಡು ದಿನಗಳಿಂದ.' },
  },
  {
    id: 'since-morning',
    text: 'Since this morning.',
    translations: { en: 'Since this morning.', hi: 'आज सुबह से।', kn: 'ಇಂದು ಬೆಳಿಗ್ಗೆಯಿಂದ.' },
  },
  { id: 'thank-you', text: 'Thank you.', translations: { en: 'Thank you.', hi: 'धन्यवाद।', kn: 'ಧನ್ಯವಾದಗಳು.' } },
];

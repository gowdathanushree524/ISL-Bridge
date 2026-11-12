import type { Phrase } from '@/types';

export const EMERGENCY_PHRASES: Phrase[] = [
  {
    id: 'need-help',
    label: 'I need help.',
    translations: { en: 'I need help.', hi: 'मुझे सहायता चाहिए।', kn: 'ನನಗೆ ಸಹಾಯ ಬೇಕು.' },
  },
  {
    id: 'call-ambulance',
    label: 'Please call an ambulance.',
    translations: {
      en: 'Please call an ambulance.',
      hi: 'कृपया एम्बुलेंस बुलाइए।',
      kn: 'ದಯವಿಟ್ಟು ಆಂಬ್ಯುಲೆನ್ಸ್ ಕರೆಯಿರಿ.',
    },
  },
  {
    id: 'injured',
    label: 'I am injured.',
    translations: { en: 'I am injured.', hi: 'मैं घायल हूँ।', kn: 'ನಾನು ಗಾಯಗೊಂಡಿದ್ದೇನೆ.' },
  },
  {
    id: 'need-doctor',
    label: 'I need a doctor.',
    translations: { en: 'I need a doctor.', hi: 'मुझे डॉक्टर चाहिए।', kn: 'ನನಗೆ ವೈದ್ಯರು ಬೇಕು.' },
  },
  {
    id: 'contact-family',
    label: 'Please contact my family.',
    translations: {
      en: 'Please contact my family.',
      hi: 'कृपया मेरे परिवार से संपर्क करें।',
      kn: 'ದಯವಿಟ್ಟು ನನ್ನ ಕುಟುಂಬವನ್ನು ಸಂಪರ್ಕಿಸಿ.',
    },
  },
];

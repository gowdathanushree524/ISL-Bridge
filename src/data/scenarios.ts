import type { Scenario } from '@/types';

// Predefined demonstration examples. Gloss, predictions, confidence values, grammar output
// and translations are fixed authored data; they are not produced by a trained model.
export const SCENARIOS: Scenario[] = [
  {
    id: 'hospital-doctor',
    title: 'Hospital: I need a doctor',
    summary: 'Low-confidence prediction that triggers MeaningGuard.',
    contextMode: 'hospital',
    gloss: ['I', 'PAIN', 'DOCTOR', 'NEED'],
    predictions: [
      {
        id: 'doctor',
        text: 'I need a doctor.',
        confidence: 0.58,
        translations: {
          en: 'I need a doctor.',
          hi: 'मुझे डॉक्टर चाहिए।',
          kn: 'ನನಗೆ ವೈದ್ಯರು ಬೇಕು.',
        },
        naturalSentence: {
          en: 'I need a doctor because I am experiencing pain.',
          hi: 'मुझे दर्द हो रहा है, इसलिए मुझे डॉक्टर चाहिए।',
          kn: 'ನನಗೆ ನೋವಾಗುತ್ತಿದೆ, ಆದ್ದರಿಂದ ನನಗೆ ವೈದ್ಯರು ಬೇಕು.',
        },
      },
      {
        id: 'medicine',
        text: 'I need medicine.',
        confidence: 0.27,
        translations: {
          en: 'I need medicine.',
          hi: 'मुझे दवाई चाहिए।',
          kn: 'ನನಗೆ ಔಷಧಿ ಬೇಕು.',
        },
        naturalSentence: {
          en: 'I need medicine because I am experiencing pain.',
          hi: 'मुझे दर्द हो रहा है, इसलिए मुझे दवाई चाहिए।',
          kn: 'ನನಗೆ ನೋವಾಗುತ್ತಿದೆ, ಆದ್ದರಿಂದ ನನಗೆ ಔಷಧಿ ಬೇಕು.',
        },
      },
    ],
    retryPredictions: [
      {
        id: 'doctor',
        text: 'I need a doctor.',
        confidence: 0.86,
        translations: {
          en: 'I need a doctor.',
          hi: 'मुझे डॉक्टर चाहिए।',
          kn: 'ನನಗೆ ವೈದ್ಯರು ಬೇಕು.',
        },
        naturalSentence: {
          en: 'I need a doctor because I am experiencing pain.',
          hi: 'मुझे दर्द हो रहा है, इसलिए मुझे डॉक्टर चाहिए।',
          kn: 'ನನಗೆ ನೋವಾಗುತ್ತಿದೆ, ಆದ್ದರಿಂದ ನನಗೆ ವೈದ್ಯರು ಬೇಕು.',
        },
      },
      {
        id: 'medicine',
        text: 'I need medicine.',
        confidence: 0.09,
        translations: {
          en: 'I need medicine.',
          hi: 'मुझे दवाई चाहिए।',
          kn: 'ನನಗೆ ಔಷಧಿ ಬೇಕು.',
        },
        naturalSentence: {
          en: 'I need medicine because I am experiencing pain.',
          hi: 'मुझे दर्द हो रहा है, इसलिए मुझे दवाई चाहिए।',
          kn: 'ನನಗೆ ನೋವಾಗುತ್ತಿದೆ, ಆದ್ದರಿಂದ ನನಗೆ ಔಷಧಿ ಬೇಕು.',
        },
      },
    ],
  },
  {
    id: 'emergency-help',
    title: 'Emergency: Please help me',
    summary: 'Clear, high-confidence request for help.',
    contextMode: 'police',
    gloss: ['PLEASE', 'HELP', 'ME'],
    predictions: [
      {
        id: 'help',
        text: 'Please help me.',
        confidence: 0.93,
        translations: {
          en: 'Please help me.',
          hi: 'कृपया मेरी मदद करें।',
          kn: 'ದಯವಿಟ್ಟು ನನಗೆ ಸಹಾಯ ಮಾಡಿ.',
        },
        naturalSentence: {
          en: 'Please help me.',
          hi: 'कृपया मेरी मदद करें।',
          kn: 'ದಯವಿಟ್ಟು ನನಗೆ ಸಹಾಯ ಮಾಡಿ.',
        },
      },
    ],
  },
  {
    id: 'shopping-buy',
    title: 'Shopping: I want to buy this',
    summary: 'Product request in a shop.',
    contextMode: 'shopping',
    gloss: ['THIS', 'I', 'BUY', 'WANT'],
    predictions: [
      {
        id: 'buy',
        text: 'I want to buy this.',
        confidence: 0.88,
        translations: {
          en: 'I want to buy this.',
          hi: 'मुझे यह खरीदना है।',
          kn: 'ನಾನು ಇದನ್ನು ಖರೀದಿಸಲು ಬಯಸುತ್ತೇನೆ.',
        },
        naturalSentence: {
          en: 'I want to buy this item.',
          hi: 'मुझे यह सामान खरीदना है।',
          kn: 'ನಾನು ಈ ವಸ್ತುವನ್ನು ಖರೀದಿಸಲು ಬಯಸುತ್ತೇನೆ.',
        },
      },
    ],
  },
  {
    id: 'education-lesson',
    title: 'Education: Help with a lesson',
    summary: 'Classroom request for clarification.',
    contextMode: 'education',
    gloss: ['LESSON', 'UNDERSTAND', 'HELP', 'I', 'NEED'],
    predictions: [
      {
        id: 'lesson',
        text: 'I need help understanding this lesson.',
        confidence: 0.81,
        translations: {
          en: 'I need help understanding this lesson.',
          hi: 'मुझे इस पाठ को समझने में मदद चाहिए।',
          kn: 'ಈ ಪಾಠವನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ನನಗೆ ಸಹಾಯ ಬೇಕು.',
        },
        naturalSentence: {
          en: 'I need help understanding this lesson.',
          hi: 'मुझे इस पाठ को समझने में मदद चाहिए।',
          kn: 'ಈ ಪಾಠವನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ನನಗೆ ಸಹಾಯ ಬೇಕು.',
        },
      },
    ],
  },
  {
    id: 'everyday-greeting',
    title: 'Everyday: How are you?',
    summary: 'Simple everyday greeting.',
    contextMode: 'general',
    gloss: ['YOU', 'HOW'],
    predictions: [
      {
        id: 'greeting',
        text: 'How are you?',
        confidence: 0.96,
        translations: {
          en: 'How are you?',
          hi: 'आप कैसे हैं?',
          kn: 'ನೀವು ಹೇಗಿದ್ದೀರಿ?',
        },
        naturalSentence: {
          en: 'How are you?',
          hi: 'आप कैसे हैं?',
          kn: 'ನೀವು ಹೇಗಿದ್ದೀರಿ?',
        },
      },
    ],
  },
];

export const LOW_CONFIDENCE_THRESHOLD = 0.7;

export function getScenario(id: string) {
  return SCENARIOS.find((scenario) => scenario.id === id) ?? null;
}

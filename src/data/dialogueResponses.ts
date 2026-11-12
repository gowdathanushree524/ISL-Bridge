import type { Localized } from '@/types';

export type ReplyKey =
  | 'doctor_hospital'
  | 'ask_location'
  | 'ask_duration'
  | 'pain_summary'
  | 'medicine_hospital'
  | 'help_police'
  | 'help_general'
  | 'buy_shopping'
  | 'lesson_education'
  | 'greeting'
  | 'thanks'
  | 'ambulance'
  | 'injured'
  | 'family'
  | 'doctor_general'
  | 'fallback';

export const REPLIES: Record<ReplyKey, Localized> = {
  doctor_hospital: {
    en: 'I understand you need a doctor. Where are you experiencing pain?',
    hi: 'मुझे समझ आया कि आपको डॉक्टर चाहिए। आपको कहाँ दर्द हो रहा है?',
    kn: 'ನಿಮಗೆ ವೈದ್ಯರು ಬೇಕು ಎಂದು ನನಗೆ ಅರ್ಥವಾಯಿತು. ನಿಮಗೆ ಎಲ್ಲಿ ನೋವಾಗುತ್ತಿದೆ?',
  },
  ask_location: {
    en: 'Where are you experiencing pain?',
    hi: 'आपको कहाँ दर्द हो रहा है?',
    kn: 'ನಿಮಗೆ ಎಲ್ಲಿ ನೋವಾಗುತ್ತಿದೆ?',
  },
  ask_duration: {
    en: 'How long have you been experiencing the pain?',
    hi: 'यह दर्द कितने समय से है?',
    kn: 'ಈ ನೋವು ಎಷ್ಟು ದಿನಗಳಿಂದ ಇದೆ?',
  },
  pain_summary: {
    en: 'Thank you. I have noted the location and duration of the pain. Please show this to the doctor or nurse on duty.',
    hi: 'धन्यवाद। मैंने दर्द की जगह और समय नोट कर लिया है। कृपया यह डॉक्टर या ड्यूटी पर मौजूद नर्स को दिखाएँ।',
    kn: 'ಧನ್ಯವಾದಗಳು. ನೋವಿನ ಸ್ಥಳ ಮತ್ತು ಅವಧಿಯನ್ನು ನಾನು ಗಮನಿಸಿದ್ದೇನೆ. ದಯವಿಟ್ಟು ಇದನ್ನು ಕರ್ತವ್ಯದಲ್ಲಿರುವ ವೈದ್ಯರು ಅಥವಾ ದಾದಿಗೆ ತೋರಿಸಿ.',
  },
  medicine_hospital: {
    en: 'Do you have any known medicine allergies?',
    hi: 'क्या आपको किसी दवाई से एलर्जी है?',
    kn: 'ನಿಮಗೆ ಯಾವುದಾದರೂ ಔಷಧಿಗೆ ಅಲರ್ಜಿ ಇದೆಯೇ?',
  },
  help_police: {
    en: 'Are you safe right now? Please describe where you are.',
    hi: 'क्या आप अभी सुरक्षित हैं? कृपया बताएँ कि आप कहाँ हैं।',
    kn: 'ನೀವು ಈಗ ಸುರಕ್ಷಿತವಾಗಿದ್ದೀರಾ? ನೀವು ಎಲ್ಲಿದ್ದೀರಿ ಎಂದು ದಯವಿಟ್ಟು ತಿಳಿಸಿ.',
  },
  help_general: {
    en: 'I have received your request. How can I help you right now?',
    hi: 'मुझे आपका अनुरोध मिल गया है। मैं अभी आपकी कैसे मदद कर सकता हूँ?',
    kn: 'ನಿಮ್ಮ ವಿನಂತಿ ನನಗೆ ತಲುಪಿದೆ. ಈಗ ನಾನು ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?',
  },
  buy_shopping: {
    en: 'Please show me the item. Do you need a different size or colour?',
    hi: 'कृपया मुझे वह सामान दिखाएँ। क्या आपको कोई दूसरा साइज़ या रंग चाहिए?',
    kn: 'ದಯವಿಟ್ಟು ಆ ವಸ್ತುವನ್ನು ತೋರಿಸಿ. ನಿಮಗೆ ಬೇರೆ ಗಾತ್ರ ಅಥವಾ ಬಣ್ಣ ಬೇಕೇ?',
  },
  lesson_education: {
    en: 'Which part of the lesson is confusing? Tell me the topic or page number.',
    hi: 'पाठ का कौन सा हिस्सा मुश्किल लग रहा है? कृपया विषय या पेज नंबर बताइए।',
    kn: 'ಪಾಠದ ಯಾವ ಭಾಗ ಕಷ್ಟವಾಗಿದೆ? ದಯವಿಟ್ಟು ವಿಷಯ ಅಥವಾ ಪುಟ ಸಂಖ್ಯೆ ತಿಳಿಸಿ.',
  },
  greeting: {
    en: 'Hello! It is nice to talk with you. What would you like to discuss?',
    hi: 'नमस्ते! आपसे बात करके अच्छा लगा। आप किस बारे में बात करना चाहेंगे?',
    kn: 'ನಮಸ್ಕಾರ! ನಿಮ್ಮೊಂದಿಗೆ ಮಾತನಾಡಿ ಸಂತೋಷವಾಯಿತು. ನೀವು ಏನು ಚರ್ಚಿಸಲು ಬಯಸುತ್ತೀರಿ?',
  },
  thanks: {
    en: 'You are welcome. Is there anything else you would like to say?',
    hi: 'आपका स्वागत है। क्या आप कुछ और बताना चाहेंगे?',
    kn: 'ನಿಮಗೆ ಸ್ವಾಗತ. ನೀವು ಇನ್ನೇನಾದರೂ ತಿಳಿಸಲು ಬಯಸುವಿರಾ?',
  },
  ambulance: {
    en: 'Please ask someone nearby to call an ambulance, or dial your local emergency number now.',
    hi: 'कृपया पास के किसी व्यक्ति से एम्बुलेंस बुलाने को कहें, या अभी अपने स्थानीय आपातकालीन नंबर पर कॉल करें।',
    kn: 'ದಯವಿಟ್ಟು ಹತ್ತಿರದವರನ್ನು ಆಂಬ್ಯುಲೆನ್ಸ್ ಕರೆಯಲು ಹೇಳಿ, ಅಥವಾ ಈಗಲೇ ನಿಮ್ಮ ಸ್ಥಳೀಯ ತುರ್ತು ಸಂಖ್ಯೆಗೆ ಕರೆ ಮಾಡಿ.',
  },
  injured: {
    en: 'Are you bleeding or in severe pain? Please show where you are injured.',
    hi: 'क्या आपसे खून बह रहा है या तेज़ दर्द है? कृपया बताएँ कि आपको कहाँ चोट लगी है।',
    kn: 'ನಿಮ್ಮಿಂದ ರಕ್ತ ಸುರಿಯುತ್ತಿದೆಯೇ ಅಥವಾ ತೀವ್ರ ನೋವಿದೆಯೇ? ದಯವಿಟ್ಟು ಎಲ್ಲಿ ಗಾಯವಾಗಿದೆ ತೋರಿಸಿ.',
  },
  family: {
    en: 'I have noted your request to contact your family. Please share their phone number with the staff.',
    hi: 'परिवार से संपर्क करने का आपका अनुरोध मैंने नोट कर लिया है। कृपया उनका फ़ोन नंबर स्टाफ को दें।',
    kn: 'ನಿಮ್ಮ ಕುಟುಂಬವನ್ನು ಸಂಪರ್ಕಿಸುವ ವಿನಂತಿಯನ್ನು ನಾನು ಗಮನಿಸಿದ್ದೇನೆ. ದಯವಿಟ್ಟು ಅವರ ಫೋನ್ ಸಂಖ್ಯೆಯನ್ನು ಸಿಬ್ಬಂದಿಗೆ ನೀಡಿ.',
  },
  doctor_general: {
    en: 'I have noted that you need a doctor. Please stay where you are and show this message to someone nearby.',
    hi: 'मैंने नोट कर लिया है कि आपको डॉक्टर चाहिए। कृपया जहाँ हैं वहीं रहें और यह संदेश पास के किसी व्यक्ति को दिखाएँ।',
    kn: 'ನಿಮಗೆ ವೈದ್ಯರು ಬೇಕು ಎಂದು ನಾನು ಗಮನಿಸಿದ್ದೇನೆ. ದಯವಿಟ್ಟು ಇರುವಲ್ಲಿಯೇ ಇದ್ದು ಈ ಸಂದೇಶವನ್ನು ಹತ್ತಿರದವರಿಗೆ ತೋರಿಸಿ.',
  },
  fallback: {
    en: 'I have noted your message. Could you add a little more detail?',
    hi: 'मैंने आपका संदेश नोट कर लिया है। क्या आप थोड़ा और विवरण दे सकते हैं?',
    kn: 'ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ನಾನು ಗಮನಿಸಿದ್ದೇನೆ. ಸ್ವಲ್ಪ ಹೆಚ್ಚಿನ ವಿವರ ನೀಡಬಹುದೇ?',
  },
};

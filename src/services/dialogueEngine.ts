import type { ChatMessage, ContextMode } from '@/types';
import { REPLIES, type ReplyKey } from '@/data/dialogueResponses';

// Local rule-based engine. It is not a language model and does not call any external API.

type Intent =
  | 'pain'
  | 'doctor'
  | 'medicine'
  | 'ambulance'
  | 'injured'
  | 'family'
  | 'buy'
  | 'lesson'
  | 'greeting'
  | 'thanks'
  | 'help'
  | 'unknown';

const INTENT_RULES: [Intent, RegExp][] = [
  ['pain', /\b(pain|hurts?|ache|aching)\b/i],
  ['ambulance', /\bambulance\b/i],
  ['injured', /\b(injur\w*|bleed\w*|wound\w*)\b/i],
  ['family', /\bfamily\b/i],
  ['doctor', /\bdoctors?\b/i],
  ['medicine', /\b(medicines?|medication|pills?)\b/i],
  ['buy', /\b(buy|buying|price|purchase|shop)\b/i],
  ['lesson', /\b(lesson|understand\w*|class|study)\b/i],
  ['greeting', /\b(how are you|hello|good morning)\b/i],
  ['thanks', /\bthank(s| you)\b/i],
  ['help', /\bhelp\b/i],
];

const BODY_PART = /\b(hand|arm|head|stomach|leg|back|chest|foot|knee|throat|neck|shoulder|eye|tooth)\b/i;
const DURATION = /\b(\d+|one|two|three|four|five|day|days|week|weeks|hour|hours|month|months|since|yesterday|today|morning|night)\b/i;

function detectIntent(text: string): Intent {
  const match = INTENT_RULES.find(([, pattern]) => pattern.test(text));
  return match ? match[0] : 'unknown';
}

function startsPainFlow(intent: Intent, mode: ContextMode) {
  return intent === 'pain' || (intent === 'doctor' && mode === 'hospital');
}

// Returns the signer texts of the open pain-assessment flow (including the new message), or null.
function openFlowTexts(history: ChatMessage[], message: string, intent: Intent, mode: ContextMode): string[] | null {
  if (startsPainFlow(intent, mode)) return [message];

  let lastSummaryIndex = -1;
  history.forEach((entry, index) => {
    if (entry.replyKey === 'pain_summary') lastSummaryIndex = index;
  });

  for (let index = history.length - 1; index > lastSummaryIndex; index -= 1) {
    const entry = history[index];
    if (entry.role === 'signer' && startsPainFlow(detectIntent(entry.text), mode)) {
      const texts = history
        .slice(index)
        .filter((item) => item.role === 'signer')
        .map((item) => item.text);
      return [...texts, message];
    }
  }
  return null;
}

function keyForIntent(intent: Intent, mode: ContextMode): ReplyKey {
  switch (intent) {
    case 'medicine':
      return mode === 'hospital' ? 'medicine_hospital' : 'fallback';
    case 'ambulance':
      return 'ambulance';
    case 'injured':
      return 'injured';
    case 'family':
      return 'family';
    case 'doctor':
      return mode === 'hospital' ? 'doctor_hospital' : 'doctor_general';
    case 'buy':
      return 'buy_shopping';
    case 'lesson':
      return 'lesson_education';
    case 'greeting':
      return 'greeting';
    case 'thanks':
      return 'thanks';
    case 'help':
      return mode === 'police' ? 'help_police' : 'help_general';
    case 'pain':
      return 'ask_location';
    default:
      return 'fallback';
  }
}

export function generateReply(input: { mode: ContextMode; message: string; history: ChatMessage[] }) {
  const intent = detectIntent(input.message);
  const flow = openFlowTexts(input.history, input.message, intent, input.mode);

  let key: ReplyKey;
  if (flow) {
    const hasLocation = flow.some((text) => BODY_PART.test(text));
    const hasDuration = flow.some((text) => DURATION.test(text));
    if (!hasLocation) {
      key = intent === 'doctor' ? 'doctor_hospital' : 'ask_location';
    } else if (!hasDuration) {
      key = 'ask_duration';
    } else {
      key = 'pain_summary';
    }
  } else {
    key = keyForIntent(intent, input.mode);
  }

  return { key, text: REPLIES[key] };
}

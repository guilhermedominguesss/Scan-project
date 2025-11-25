// Analytics utility
import { getStorage, setStorage } from './storage';

export const trackEvent = (eventName, payload = {}) => {
  try {
    const events = getStorage('events') || [];
    const newEvent = {
      event: eventName,
      timestamp: new Date().toISOString(),
      ...payload
    };
    
    events.push(newEvent);
    setStorage('events', events);
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Analytics] ${eventName}`, payload);
    }
  } catch (error) {
    console.error('Analytics Error:', error);
  }
};

export const EVENTS = {
  QUIZ_STARTED: 'quiz_started',
  LEAD_CAPTURED_DRAFT: 'lead_captured_draft',
  QUESTION_ANSWERED: 'question_answered',
  QUIZ_ABANDONED: 'quiz_abandoned',
  QUIZ_COMPLETED: 'quiz_completed',
  RADAR_VIEWED: 'radar_viewed',
  LP_VIEWED: 'lp_viewed',
  WHATSAPP_CLICKED: 'whatsapp_clicked',
};

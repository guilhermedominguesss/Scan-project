// Mock API service
import { getStorage, setStorage } from '../utils/storage';

const DELAY = 800; // Simulated network delay

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const api = {
  // Save draft answers (debounce handled in component usually, but here we just mock save)
  saveDraft: async (data) => {
    await sleep(300);
    const current = getStorage('quiz_draft') || {};
    const updated = { ...current, ...data, updatedAt: new Date().toISOString() };
    setStorage('quiz_draft', updated);
    return updated;
  },

  // Get draft
  getDraft: async () => {
    await sleep(200);
    return getStorage('quiz_draft');
  },

  // Save completed lead
  saveLead: async (lead) => {
    await sleep(DELAY);
    const leads = getStorage('leads') || [];
    // Check if lead exists update it, else push
    const existingIndex = leads.findIndex(l => l.leadId === lead.leadId);
    
    if (existingIndex >= 0) {
      leads[existingIndex] = { ...leads[existingIndex], ...lead, updatedAt: new Date().toISOString() };
    } else {
      leads.push({ ...lead, createdAt: new Date().toISOString() });
    }
    
    setStorage('leads', leads);
    return lead;
  },

  // Admin: Get all leads
  getLeads: async () => {
    await sleep(DELAY);
    return getStorage('leads') || [];
  }
};

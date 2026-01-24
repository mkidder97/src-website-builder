import { create } from 'zustand';

export interface ChatMessage {
  id: string;
  type: 'bot' | 'user' | 'options' | 'form';
  content: string;
  timestamp: Date;
  options?: { id: string; label: string; icon?: string }[];
  links?: { label: string; url: string; external?: boolean }[];
  formType?: 'quote' | 'storm';
}

interface ChatbotState {
  isOpen: boolean;
  currentFlow: string | null;
  currentStep: string;
  messages: ChatMessage[];
  serviceInterest: string;
  open: () => void;
  close: () => void;
  toggle: () => void;
  setFlow: (flowId: string) => void;
  setStep: (stepId: string) => void;
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  setServiceInterest: (service: string) => void;
  reset: () => void;
}

export const useChatbot = create<ChatbotState>((set) => ({
  isOpen: false,
  currentFlow: null,
  currentStep: 'main',
  messages: [],
  serviceInterest: '',
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  setFlow: (flowId) => set({ currentFlow: flowId, currentStep: 'start' }),
  setStep: (stepId) => set({ currentStep: stepId }),
  addMessage: (message) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          ...message,
          id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
          timestamp: new Date(),
        },
      ],
    })),
  setServiceInterest: (service) => set({ serviceInterest: service }),
  reset: () =>
    set({
      currentFlow: null,
      currentStep: 'main',
      messages: [],
      serviceInterest: '',
    }),
}));

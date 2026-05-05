import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface InteractionFormState {
  hcp_name: string;
  date: string;
  time: string;
  topics: string;
  sentiment: string;
  materials: string;
  notes: string;
  follow_up: string;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface InteractionState {
  form: InteractionFormState;
  messages: Message[];
}

const initialState: InteractionState = {
  form: {
    hcp_name: '',
    date: '',
    time: '',
    topics: '',
    sentiment: 'Neutral',
    materials: '',
    notes: '',
    follow_up: ''
  },
  messages: [
    { role: 'assistant', content: 'Hello! I am your CRM AI Assistant. How can I help you log your interaction today?' }
  ]
};

export const interactionSlice = createSlice({
  name: 'interaction',
  initialState,
  reducers: {
    updateForm: (state, action: PayloadAction<Partial<InteractionFormState>>) => {
      state.form = { ...state.form, ...action.payload };
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
    }
  }
});

export const { updateForm, addMessage, setMessages } = interactionSlice.actions;
export default interactionSlice.reducer;

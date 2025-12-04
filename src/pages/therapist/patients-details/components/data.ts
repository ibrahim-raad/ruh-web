export const MOCK_SESSIONS = [
  {
    id: "1",
    date: new Date(Date.now() - 86400000 * 2),
    duration: "45 mins",
    status: "COMPLETED",
    type: "Video Call",
  },
  {
    id: "2",
    date: new Date(Date.now() + 86400000),
    duration: "45 mins",
    status: "SCHEDULED",
    type: "Video Call",
  },
];

export const MOCK_MESSAGES = [
  {
    id: "1",
    sender: "patient",
    content: "Hi, I've been feeling a bit anxious lately about the new job.",
    timestamp: new Date(Date.now() - 86400000),
  },
  {
    id: "2",
    sender: "therapist",
    content:
      "I understand. That's a big change. Have you tried the breathing exercises we discussed?",
    timestamp: new Date(Date.now() - 82800000),
  },
  {
    id: "3",
    sender: "patient",
    content: "Yes, they help a little, but I still struggle at night.",
    timestamp: new Date(Date.now() - 3600000),
  },
];

export const MOCK_EXERCISES = [
  {
    id: "1",
    title: "Deep Breathing",
    description: "Practice 4-7-8 breathing for 5 minutes",
    status: "COMPLETED",
    assigned_at: new Date(Date.now() - 86400000 * 3),
  },
  {
    id: "2",
    title: "Gratitude Journal",
    description: "Write down 3 things you are grateful for",
    status: "PENDING",
    assigned_at: new Date(Date.now() - 86400000),
  },
];

export const MOCK_REFLECTIONS = [
  {
    id: "1",
    mood: "Anxious",
    content: "Felt overwhelmed with work today.",
    created_at: new Date(Date.now() - 86400000 * 2),
  },
  {
    id: "2",
    mood: "Calm",
    content: "Morning walk really helped clear my head.",
    created_at: new Date(Date.now() - 86400000),
  },
];

export const MOCK_DOCUMENTS = [
  {
    id: "1",
    name: "Blood Work Results.pdf",
    type: "PDF",
    size: "2.4 MB",
    uploaded_at: new Date(Date.now() - 86400000 * 5),
    uploaded_by: "patient",
  },
  {
    id: "2",
    name: "Anxiety Scale Assessment.docx",
    type: "DOCX",
    size: "1.1 MB",
    uploaded_at: new Date(Date.now() - 86400000 * 2),
    uploaded_by: "therapist",
  },
];

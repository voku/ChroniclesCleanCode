export type CodeSnippet = {
  title: string;
  language: string;
  code: string;
  comment?: string;
};

export type Interaction = {
  id: string;
  triggerPhrase: string;
  title: string;
  description: string;
  badExample: CodeSnippet;
  betterExample: CodeSnippet[]; // Array to show progression
};

export type StorySegment = {
  type: 'text' | 'interaction';
  content: string;
  interactionId?: string;
};

export type Chapter = {
  id: number;
  title: string;
  content: StorySegment[];
};

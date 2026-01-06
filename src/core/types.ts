/**
 * Core types for the life-sim game
 * Modular architecture allows easy extension
 */

// Character Traits - can be expanded
export type Trait = 
  | 'cheerful' 
  | 'serious' 
  | 'creative' 
  | 'analytical' 
  | 'empathetic' 
  | 'ambitious' 
  | 'laid-back' 
  | 'adventurous';

// Moods - influenced by needs and relationships
export type Mood = 
  | 'happy' 
  | 'content' 
  | 'neutral' 
  | 'stressed' 
  | 'sad' 
  | 'excited' 
  | 'lonely';

// Character with traits and dynamic mood
export interface Character {
  id: string;
  name: string;
  traits: Trait[];
  mood: Mood;
  bio?: string;
}

// Simplified needs system
export interface Needs {
  energy: number;     // 0-100
  money: number;      // Can go negative
  social: number;     // 0-100
}

// Relationship system with consequences
export interface Relationship {
  characterId: string;
  value: number;      // -100 to 100
  history: RelationshipEvent[];
}

export interface RelationshipEvent {
  chapterId: string;
  choiceId: string;
  impact: number;
  description: string;
}

// Choice system with lasting consequences
export interface Choice {
  id: string;
  text: string;
  requirements?: ChoiceRequirement[];
  consequences: Consequence[];
}

export interface ChoiceRequirement {
  type: 'need' | 'relationship' | 'trait';
  target?: string;  // character id or need name
  value?: number;   // minimum value
  trait?: Trait;    // required trait
}

export interface Consequence {
  type: 'need' | 'relationship' | 'mood' | 'story';
  target?: string;  // character id, need name, or story flag
  change?: number;  // amount of change
  newMood?: Mood;   // new mood to set
  flag?: string;    // story flag to set
  value?: boolean;  // flag value
}

// Chapter-based time progression
export interface Chapter {
  id: string;
  number: number;
  title: string;
  description: string;
  events: ChapterEvent[];
}

export interface ChapterEvent {
  id: string;
  description: string;
  choices: Choice[];
  involvedCharacters?: string[];
}

// Game state - everything that needs to be saved
export interface GameState {
  currentChapter: number;
  currentEvent: number;
  playerNeeds: Needs;
  playerTraits: Trait[];
  playerMood: Mood;
  relationships: Map<string, Relationship>;
  storyFlags: Map<string, boolean>;
  completedEvents: string[];
}

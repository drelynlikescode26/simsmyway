/**
 * Game Engine - coordinates all game systems
 * This is the main entry point for game logic
 */

import { GameState, Choice, Character, Chapter, Trait } from './types.js';
import { CharacterManager } from './CharacterManager.js';
import { NeedsManager } from './NeedsManager.js';
import { RelationshipManager } from './RelationshipManager.js';
import { ChoiceManager } from './ChoiceManager.js';
import { ChapterManager } from './ChapterManager.js';

export class GameEngine {
  private characterManager: CharacterManager;
  private needsManager: NeedsManager;
  private relationshipManager: RelationshipManager;
  private choiceManager: ChoiceManager;
  private chapterManager: ChapterManager;
  private gameState: GameState;

  constructor() {
    this.characterManager = new CharacterManager();
    this.needsManager = new NeedsManager();
    this.relationshipManager = new RelationshipManager();
    this.choiceManager = new ChoiceManager();
    this.chapterManager = new ChapterManager();

    // Initialize default game state
    this.gameState = {
      currentChapter: 1,
      currentEvent: 0,
      playerNeeds: {
        energy: 70,
        money: 200,
        social: 60
      },
      playerTraits: [],
      playerMood: 'neutral',
      relationships: new Map(),
      storyFlags: new Map(),
      completedEvents: []
    };
  }

  /**
   * Initialize game with content
   */
  initialize(characters: Character[], chapters: Chapter[], playerTraits: Trait[]): void {
    // Add characters
    characters.forEach(char => this.characterManager.addCharacter(char));

    // Add chapters
    chapters.forEach(chapter => this.chapterManager.addChapter(chapter));

    // Initialize relationships
    characters.forEach(char => {
      const relationship = this.relationshipManager.createRelationship(char.id, 50);
      this.gameState.relationships.set(char.id, relationship);
    });

    // Set player traits
    this.gameState.playerTraits = playerTraits;
  }

  /**
   * Get current game state
   */
  getGameState(): GameState {
    return { ...this.gameState };
  }

  /**
   * Get current event
   */
  getCurrentEvent() {
    return this.chapterManager.getEvent(
      this.gameState.currentChapter,
      this.gameState.currentEvent
    );
  }

  /**
   * Get current chapter
   */
  getCurrentChapter() {
    return this.chapterManager.getChapter(this.gameState.currentChapter);
  }

  /**
   * Get all characters
   */
  getCharacters(): Character[] {
    return this.characterManager.getAllCharacters();
  }

  /**
   * Make a choice and progress the game
   */
  makeChoice(choice: Choice): boolean {
    if (!this.choiceManager.isChoiceAvailable(choice, this.gameState)) {
      return false;
    }

    // Apply consequences
    const chapterId = `chapter_${this.gameState.currentChapter}`;
    this.gameState = this.choiceManager.applyConsequences(
      choice,
      this.gameState,
      chapterId
    );

    // Update mood based on new state
    const relationships = Array.from(this.gameState.relationships.values());
    this.gameState.playerMood = this.characterManager.calculateMood(
      this.gameState.playerNeeds,
      relationships,
      this.gameState.playerTraits
    );

    // Mark event as completed
    const currentEvent = this.getCurrentEvent();
    if (currentEvent) {
      this.gameState.completedEvents.push(currentEvent.id);
    }

    // Progress to next event
    this.progressEvent();

    return true;
  }

  /**
   * Progress to next event or chapter
   */
  private progressEvent(): void {
    if (this.chapterManager.hasNextEvent(this.gameState.currentChapter, this.gameState.currentEvent)) {
      this.gameState.currentEvent++;
    } else if (this.chapterManager.hasNextChapter(this.gameState.currentChapter)) {
      this.gameState.currentChapter++;
      this.gameState.currentEvent = 0;
    }
  }

  /**
   * Get available choices for current event
   */
  getAvailableChoices(): Choice[] {
    const event = this.getCurrentEvent();
    if (!event) return [];

    return event.choices.filter(choice => 
      this.choiceManager.isChoiceAvailable(choice, this.gameState)
    );
  }

  /**
   * Check if game is complete
   */
  isGameComplete(): boolean {
    return !this.getCurrentEvent();
  }

  /**
   * Save game state
   */
  save(): string {
    return JSON.stringify({
      ...this.gameState,
      relationships: Array.from(this.gameState.relationships.entries()),
      storyFlags: Array.from(this.gameState.storyFlags.entries())
    });
  }

  /**
   * Load game state
   */
  load(saveData: string): void {
    const data = JSON.parse(saveData);
    this.gameState = {
      ...data,
      relationships: new Map(data.relationships),
      storyFlags: new Map(data.storyFlags)
    };
  }
}

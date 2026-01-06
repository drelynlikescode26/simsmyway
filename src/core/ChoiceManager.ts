/**
 * Choice Manager - handles choice validation and consequence application
 */

import { 
  Choice, 
  ChoiceRequirement, 
  Consequence, 
  GameState, 
  Needs,
  Relationship 
} from './types.js';
import { NeedsManager } from './NeedsManager.js';
import { RelationshipManager } from './RelationshipManager.js';

export class ChoiceManager {
  private needsManager: NeedsManager;
  private relationshipManager: RelationshipManager;

  constructor() {
    this.needsManager = new NeedsManager();
    this.relationshipManager = new RelationshipManager();
  }

  /**
   * Check if a choice is available based on requirements
   */
  isChoiceAvailable(choice: Choice, gameState: GameState): boolean {
    if (!choice.requirements) return true;

    return choice.requirements.every(req => {
      switch (req.type) {
        case 'need':
          if (!req.target || req.value === undefined) return false;
          return this.needsManager.meetsRequirement(
            gameState.playerNeeds,
            req.target as 'energy' | 'money' | 'social',
            req.value
          );
        
        case 'relationship':
          if (!req.target || req.value === undefined) return false;
          const rel = gameState.relationships.get(req.target);
          return this.relationshipManager.meetsRequirement(rel, req.value);
        
        case 'trait':
          if (!req.trait) return false;
          return gameState.playerTraits.includes(req.trait);
        
        default:
          return false;
      }
    });
  }

  /**
   * Apply consequences of a choice to game state
   */
  applyConsequences(
    choice: Choice, 
    gameState: GameState,
    chapterId: string
  ): GameState {
    const newState = { ...gameState };

    choice.consequences.forEach(consequence => {
      switch (consequence.type) {
        case 'need':
          if (consequence.target && consequence.change !== undefined) {
            newState.playerNeeds = this.needsManager.applyChange(
              newState.playerNeeds,
              consequence.target as 'energy' | 'money' | 'social',
              consequence.change
            );
          }
          break;

        case 'relationship':
          if (consequence.target && consequence.change !== undefined) {
            const rel = newState.relationships.get(consequence.target);
            if (rel) {
              const updated = this.relationshipManager.updateRelationship(
                rel,
                chapterId,
                choice.id,
                consequence.change,
                choice.text
              );
              newState.relationships.set(consequence.target, updated);
            }
          }
          break;

        case 'mood':
          if (consequence.newMood) {
            newState.playerMood = consequence.newMood;
          }
          break;

        case 'story':
          if (consequence.flag && consequence.value !== undefined) {
            newState.storyFlags.set(consequence.flag, consequence.value);
          }
          break;
      }
    });

    return newState;
  }
}

/**
 * Relationship Manager - tracks relationships and their history
 */

import { Relationship, RelationshipEvent } from './types.js';

export class RelationshipManager {
  /**
   * Update relationship value and record the event
   */
  updateRelationship(
    relationship: Relationship,
    chapterId: string,
    choiceId: string,
    impact: number,
    description: string
  ): Relationship {
    const newValue = Math.max(-100, Math.min(100, relationship.value + impact));
    
    const event: RelationshipEvent = {
      chapterId,
      choiceId,
      impact,
      description
    };

    return {
      ...relationship,
      value: newValue,
      history: [...relationship.history, event]
    };
  }

  /**
   * Get relationship status
   */
  getRelationshipStatus(value: number): string {
    if (value >= 80) return 'best friends';
    if (value >= 60) return 'close friends';
    if (value >= 40) return 'friends';
    if (value >= 20) return 'friendly';
    if (value >= -20) return 'neutral';
    if (value >= -40) return 'tense';
    if (value >= -60) return 'unfriendly';
    if (value >= -80) return 'hostile';
    return 'enemies';
  }

  /**
   * Check if relationship meets a requirement
   */
  meetsRequirement(relationship: Relationship | undefined, value: number): boolean {
    if (!relationship) return value <= 0; // No relationship defaults to 0
    return relationship.value >= value;
  }

  /**
   * Create a new relationship
   */
  createRelationship(characterId: string, initialValue: number = 0): Relationship {
    return {
      characterId,
      value: initialValue,
      history: []
    };
  }
}

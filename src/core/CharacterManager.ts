/**
 * Character Manager - handles character state and mood calculation
 */

import { Character, Mood, Needs, Relationship, Trait } from './types.js';

export class CharacterManager {
  private characters: Map<string, Character> = new Map();

  addCharacter(character: Character): void {
    this.characters.set(character.id, character);
  }

  getCharacter(id: string): Character | undefined {
    return this.characters.get(id);
  }

  getAllCharacters(): Character[] {
    return Array.from(this.characters.values());
  }

  /**
   * Calculate mood based on needs and relationships
   * This is a key emotion-driven mechanic
   */
  calculateMood(needs: Needs, relationships: Relationship[], traits: Trait[]): Mood {
    const avgNeeds = (needs.energy + needs.social) / 2;
    const avgRelationships = relationships.length > 0 
      ? relationships.reduce((sum, r) => sum + r.value, 0) / relationships.length 
      : 0;

    // Traits influence mood calculation
    const hasPositiveTraits = traits.some(t => ['cheerful', 'laid-back'].includes(t));
    const hasNegativeTraits = traits.some(t => ['serious', 'ambitious'].includes(t));

    let moodScore = avgNeeds * 0.6 + ((avgRelationships + 100) / 2) * 0.4;
    
    if (hasPositiveTraits) moodScore += 10;
    if (hasNegativeTraits) moodScore -= 5;

    // Financial stress
    if (needs.money < 0) moodScore -= 20;
    else if (needs.money < 100) moodScore -= 10;

    // Map score to mood
    if (moodScore >= 80) return 'excited';
    if (moodScore >= 65) return 'happy';
    if (moodScore >= 50) return 'content';
    if (moodScore >= 35) return 'neutral';
    if (moodScore >= 20) return 'stressed';
    if (needs.social < 20) return 'lonely';
    return 'sad';
  }

  /**
   * Check if character has a specific trait
   */
  hasTrait(character: Character, trait: Trait): boolean {
    return character.traits.includes(trait);
  }
}

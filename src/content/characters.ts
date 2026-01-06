/**
 * Game Content - Characters
 * Small, focused cast for the life-sim
 */

import { Character } from '../core/types.js';

export const characters: Character[] = [
  {
    id: 'alex',
    name: 'Alex',
    traits: ['cheerful', 'creative', 'empathetic'],
    mood: 'happy',
    bio: 'Your artistic roommate who always sees the bright side. Works at a local gallery.'
  },
  {
    id: 'morgan',
    name: 'Morgan',
    traits: ['serious', 'analytical', 'ambitious'],
    mood: 'neutral',
    bio: 'A driven tech professional who lives across the hall. Always busy, but dependable.'
  },
  {
    id: 'sam',
    name: 'Sam',
    traits: ['laid-back', 'adventurous', 'empathetic'],
    mood: 'content',
    bio: 'The neighborhood coffee shop owner. Knows everyone and everything happening around.'
  },
  {
    id: 'riley',
    name: 'Riley',
    traits: ['creative', 'ambitious', 'adventurous'],
    mood: 'excited',
    bio: 'An aspiring musician with big dreams. Met them at one of Sam\'s open mic nights.'
  }
];

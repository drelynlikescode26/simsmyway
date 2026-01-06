/**
 * Main entry point for Sims My Way
 * Initialize and start the game
 */

import { GameEngine } from './core/GameEngine.js';
import { UIManager } from './ui/UIManager.js';
import { characters } from './content/characters.js';
import { chapters } from './content/chapters.js';

// Player starts with some basic traits - can be customized
const playerTraits = ['empathetic', 'creative'];

// Initialize game
const engine = new GameEngine();
engine.initialize(characters, chapters, playerTraits);

// Initialize UI
const ui = new UIManager(engine, 'game-root');

// Start the game
ui.render();

// Make engine globally available for debugging
(window as any).gameEngine = engine;

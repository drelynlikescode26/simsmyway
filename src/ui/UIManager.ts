/**
 * UI Manager - handles rendering game state to HTML
 */

import { GameEngine } from '../core/GameEngine.js';
import { Choice, Character, Relationship } from '../core/types.js';

export class UIManager {
  private engine: GameEngine;
  private container: HTMLElement;

  constructor(engine: GameEngine, containerId: string) {
    this.engine = engine;
    const container = document.getElementById(containerId);
    if (!container) {
      throw new Error(`Container with id ${containerId} not found`);
    }
    this.container = container;
  }

  /**
   * Render the complete game UI
   */
  render(): void {
    const state = this.engine.getGameState();
    const chapter = this.engine.getCurrentChapter();
    const event = this.engine.getCurrentEvent();
    const characters = this.engine.getCharacters();

    if (!chapter || !event) {
      this.renderGameComplete();
      return;
    }

    this.container.innerHTML = `
      <div class="game-container">
        <header class="game-header">
          <h1>Sims My Way</h1>
          <div class="chapter-info">
            <span class="chapter-number">Chapter ${chapter.number}</span>
            <span class="chapter-title">${chapter.title}</span>
          </div>
        </header>

        <div class="game-content">
          <aside class="sidebar">
            ${this.renderPlayerStatus(state)}
            ${this.renderRelationships(state, characters)}
          </aside>

          <main class="story-area">
            ${this.renderEvent(event)}
            ${this.renderChoices(this.engine.getAvailableChoices())}
          </main>
        </div>

        <footer class="game-footer">
          <button id="save-btn" class="btn-secondary">Save Game</button>
          <button id="load-btn" class="btn-secondary">Load Game</button>
        </footer>
      </div>
    `;

    this.attachEventListeners();
  }

  private renderPlayerStatus(state: any): string {
    return `
      <div class="player-status">
        <h2>You</h2>
        <div class="mood">
          <span class="label">Mood:</span>
          <span class="value mood-${state.playerMood}">${state.playerMood}</span>
        </div>
        
        <div class="needs">
          <h3>Needs</h3>
          <div class="need">
            <span class="label">Energy:</span>
            <div class="need-bar">
              <div class="need-fill" style="width: ${state.playerNeeds.energy}%"></div>
            </div>
            <span class="value">${state.playerNeeds.energy}</span>
          </div>
          <div class="need">
            <span class="label">Social:</span>
            <div class="need-bar">
              <div class="need-fill" style="width: ${state.playerNeeds.social}%"></div>
            </div>
            <span class="value">${state.playerNeeds.social}</span>
          </div>
          <div class="need">
            <span class="label">Money:</span>
            <span class="value money">${state.playerNeeds.money < 0 ? '-' : ''}$${Math.abs(state.playerNeeds.money)}</span>
          </div>
        </div>

        <div class="traits">
          <h3>Traits</h3>
          <div class="trait-list">
            ${state.playerTraits.map((trait: string) => `
              <span class="trait">${trait}</span>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  private renderRelationships(state: any, characters: Character[]): string {
    const relationships: Array<[string, any]> = Array.from(state.relationships.entries());
    
    return `
      <div class="relationships">
        <h2>Relationships</h2>
        ${relationships.map(([charId, rel]) => {
          const char = characters.find(c => c.id === charId);
          if (!char) return '';
          
          const percentage = ((rel.value + 100) / 2); // Convert -100 to 100 into 0-100%
          
          return `
            <div class="relationship">
              <div class="rel-header">
                <span class="char-name">${char.name}</span>
                <span class="rel-value">${rel.value > 0 ? '+' : ''}${rel.value}</span>
              </div>
              <div class="rel-bar">
                <div class="rel-fill" style="width: ${percentage}%"></div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  private renderEvent(event: any): string {
    return `
      <div class="event">
        <p class="event-description">${event.description}</p>
      </div>
    `;
  }

  private renderChoices(choices: Choice[]): string {
    if (choices.length === 0) {
      return '<p class="no-choices">No available choices right now.</p>';
    }

    return `
      <div class="choices">
        <h3>What will you do?</h3>
        ${choices.map((choice, index) => `
          <button class="choice-btn" data-choice-id="${choice.id}">
            ${choice.text}
          </button>
        `).join('')}
      </div>
    `;
  }

  private renderGameComplete(): void {
    const state = this.engine.getGameState();
    
    this.container.innerHTML = `
      <div class="game-complete">
        <h1>Your Story Complete</h1>
        <p>Thank you for playing Sims My Way!</p>
        
        <div class="final-stats">
          <h2>Final Status</h2>
          <p><strong>Mood:</strong> ${state.playerMood}</p>
          <p><strong>Energy:</strong> ${state.playerNeeds.energy}</p>
          <p><strong>Social:</strong> ${state.playerNeeds.social}</p>
          <p><strong>Money:</strong> $${state.playerNeeds.money}</p>
          
          <h2>Your Relationships</h2>
          ${Array.from(state.relationships.entries()).map(([charId, rel]: [string, any]) => {
            const char = this.engine.getCharacters().find(c => c.id === charId);
            return char ? `<p><strong>${char.name}:</strong> ${rel.value}</p>` : '';
          }).join('')}
        </div>

        <button id="restart-btn" class="btn-primary">Play Again</button>
      </div>
    `;

    const restartBtn = document.getElementById('restart-btn');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        window.location.reload();
      });
    }
  }

  private attachEventListeners(): void {
    // Choice buttons
    const choiceButtons = this.container.querySelectorAll('.choice-btn');
    choiceButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const choiceId = target.dataset.choiceId;
        if (choiceId) {
          this.handleChoice(choiceId);
        }
      });
    });

    // Save button
    const saveBtn = document.getElementById('save-btn');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => this.saveGame());
    }

    // Load button
    const loadBtn = document.getElementById('load-btn');
    if (loadBtn) {
      loadBtn.addEventListener('click', () => this.loadGame());
    }
  }

  private handleChoice(choiceId: string): void {
    const event = this.engine.getCurrentEvent();
    if (!event) return;

    const choice = event.choices.find(c => c.id === choiceId);
    if (!choice) return;

    const success = this.engine.makeChoice(choice);
    if (success) {
      this.render();
    } else {
      alert('You don\'t meet the requirements for this choice.');
    }
  }

  private saveGame(): void {
    const saveData = this.engine.save();
    localStorage.setItem('simsmyway_save', saveData);
    alert('Game saved!');
  }

  private loadGame(): void {
    const saveData = localStorage.getItem('simsmyway_save');
    if (saveData) {
      this.engine.load(saveData);
      this.render();
      alert('Game loaded!');
    } else {
      alert('No save game found!');
    }
  }
}

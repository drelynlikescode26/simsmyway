/**
 * Needs Manager - handles player needs (energy, money, social)
 */

import { Needs } from './types.js';

export class NeedsManager {
  /**
   * Apply a change to needs
   */
  applyChange(needs: Needs, type: 'energy' | 'money' | 'social', amount: number): Needs {
    const newNeeds = { ...needs };
    
    switch (type) {
      case 'energy':
        newNeeds.energy = Math.max(0, Math.min(100, needs.energy + amount));
        break;
      case 'money':
        newNeeds.money = needs.money + amount; // Can go negative
        break;
      case 'social':
        newNeeds.social = Math.max(0, Math.min(100, needs.social + amount));
        break;
    }
    
    return newNeeds;
  }

  /**
   * Check if needs meet a requirement
   */
  meetsRequirement(needs: Needs, type: 'energy' | 'money' | 'social', value: number): boolean {
    return needs[type] >= value;
  }

  /**
   * Get status description for a need
   */
  getNeedStatus(value: number): string {
    if (value >= 80) return 'excellent';
    if (value >= 60) return 'good';
    if (value >= 40) return 'moderate';
    if (value >= 20) return 'low';
    return 'critical';
  }

  /**
   * Get money status
   */
  getMoneyStatus(money: number): string {
    if (money < 0) return 'in debt';
    if (money < 100) return 'struggling';
    if (money < 500) return 'getting by';
    if (money < 1000) return 'comfortable';
    return 'wealthy';
  }
}

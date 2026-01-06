/**
 * Chapter Manager - handles chapter-based time progression
 */

import { Chapter, ChapterEvent } from './types.js';

export class ChapterManager {
  private chapters: Chapter[] = [];

  addChapter(chapter: Chapter): void {
    this.chapters.push(chapter);
    // Sort by chapter number
    this.chapters.sort((a, b) => a.number - b.number);
  }

  getChapter(number: number): Chapter | undefined {
    return this.chapters.find(c => c.number === number);
  }

  getEvent(chapterNumber: number, eventIndex: number): ChapterEvent | undefined {
    const chapter = this.getChapter(chapterNumber);
    if (!chapter || eventIndex >= chapter.events.length) {
      return undefined;
    }
    return chapter.events[eventIndex];
  }

  hasNextEvent(chapterNumber: number, currentEventIndex: number): boolean {
    const chapter = this.getChapter(chapterNumber);
    if (!chapter) return false;
    return currentEventIndex < chapter.events.length - 1;
  }

  hasNextChapter(currentChapter: number): boolean {
    return this.chapters.some(c => c.number === currentChapter + 1);
  }

  getAllChapters(): Chapter[] {
    return [...this.chapters];
  }

  getTotalChapters(): number {
    return this.chapters.length;
  }
}

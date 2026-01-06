/**
 * Game Content - Chapters and Story
 * Chapter-based progression with meaningful choices
 */

import { Chapter } from '../core/types.js';

export const chapters: Chapter[] = [
  {
    id: 'chapter_1',
    number: 1,
    title: 'New Beginnings',
    description: 'You\'ve just moved into a small apartment in the city. Money is tight, but you\'re hopeful about this fresh start.',
    events: [
      {
        id: 'event_1_1',
        description: 'It\'s your first morning in the new apartment. Alex, your roommate, knocks on your door with coffee and a warm smile. "Morning! Want to grab breakfast at Sam\'s coffee shop? My treat!"',
        involvedCharacters: ['alex', 'sam'],
        choices: [
          {
            id: 'choice_1_1_a',
            text: 'Accept enthusiastically - you could use the company and a good meal.',
            consequences: [
              { type: 'relationship', target: 'alex', change: 15 },
              { type: 'relationship', target: 'sam', change: 10 },
              { type: 'need', target: 'social', change: 20 },
              { type: 'need', target: 'energy', change: 10 },
              { type: 'need', target: 'money', change: 0 }
            ]
          },
          {
            id: 'choice_1_1_b',
            text: 'Decline politely - you need to unpack and organize before you can relax.',
            requirements: [{ type: 'trait', trait: 'serious' }],
            consequences: [
              { type: 'relationship', target: 'alex', change: -5 },
              { type: 'need', target: 'social', change: -10 },
              { type: 'need', target: 'energy', change: -5 },
              { type: 'story', flag: 'organized_early', value: true }
            ]
          },
          {
            id: 'choice_1_1_c',
            text: 'Suggest having breakfast at home instead - save money and still be social.',
            consequences: [
              { type: 'relationship', target: 'alex', change: 10 },
              { type: 'need', target: 'social', change: 15 },
              { type: 'need', target: 'energy', change: 5 },
              { type: 'story', flag: 'budget_conscious', value: true }
            ]
          }
        ]
      },
      {
        id: 'event_1_2',
        description: 'Later that day, Morgan from across the hall stops by. "Hey, I\'m having a few people over tonight for game night. Low-key thing. You in?"',
        involvedCharacters: ['morgan'],
        choices: [
          {
            id: 'choice_1_2_a',
            text: 'Accept - it\'s a good chance to meet more people in the building.',
            requirements: [{ type: 'need', target: 'energy', value: 30 }],
            consequences: [
              { type: 'relationship', target: 'morgan', change: 20 },
              { type: 'need', target: 'social', change: 25 },
              { type: 'need', target: 'energy', change: -20 },
              { type: 'story', flag: 'met_neighbors', value: true }
            ]
          },
          {
            id: 'choice_1_2_b',
            text: 'Decline - you\'re exhausted from moving and need rest.',
            consequences: [
              { type: 'relationship', target: 'morgan', change: -10 },
              { type: 'need', target: 'energy', change: 15 },
              { type: 'need', target: 'social', change: -5 }
            ]
          },
          {
            id: 'choice_1_2_c',
            text: 'Ask if you can stop by later - commit to a short visit.',
            consequences: [
              { type: 'relationship', target: 'morgan', change: 10 },
              { type: 'need', target: 'social', change: 15 },
              { type: 'need', target: 'energy', change: -10 }
            ]
          }
        ]
      },
      {
        id: 'event_1_3',
        description: 'Your first week is ending. You need to find work soon. Sam mentions they\'re looking for weekend help at the coffee shop. The pay isn\'t great ($150/week), but it\'s flexible. Meanwhile, Morgan heard about an office job opening ($300/week) but it requires a formal interview.',
        involvedCharacters: ['sam', 'morgan'],
        choices: [
          {
            id: 'choice_1_3_a',
            text: 'Take the coffee shop job - it\'s casual, you\'ll meet people, and Sam is nice.',
            consequences: [
              { type: 'relationship', target: 'sam', change: 25 },
              { type: 'need', target: 'money', change: 150 },
              { type: 'need', target: 'social', change: 20 },
              { type: 'story', flag: 'works_at_coffeeshop', value: true }
            ]
          },
          {
            id: 'choice_1_3_b',
            text: 'Go for the office job - better pay means less stress about money.',
            requirements: [{ type: 'trait', trait: 'ambitious' }],
            consequences: [
              { type: 'relationship', target: 'morgan', change: 20 },
              { type: 'need', target: 'money', change: 300 },
              { type: 'need', target: 'energy', change: -15 },
              { type: 'story', flag: 'office_worker', value: true }
            ]
          },
          {
            id: 'choice_1_3_c',
            text: 'Try to do both - maximize income but it will be exhausting.',
            requirements: [{ type: 'need', target: 'energy', value: 50 }],
            consequences: [
              { type: 'relationship', target: 'sam', change: 15 },
              { type: 'relationship', target: 'morgan', change: 15 },
              { type: 'need', target: 'money', change: 400 },
              { type: 'need', target: 'energy', change: -40 },
              { type: 'story', flag: 'workaholic', value: true }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'chapter_2',
    number: 2,
    title: 'Finding Your Rhythm',
    description: 'A few weeks have passed. You\'re settling into your new life, but new challenges arise.',
    events: [
      {
        id: 'event_2_1',
        description: 'You run into Riley at Sam\'s coffee shop. They\'re practicing guitar in the corner. "Hey! Want to hear my new song? I\'m playing at an open mic next Friday. You should come!"',
        involvedCharacters: ['riley', 'sam'],
        choices: [
          {
            id: 'choice_2_1_a',
            text: 'Enthusiastically agree and offer to help promote the show.',
            requirements: [{ type: 'trait', trait: 'creative' }],
            consequences: [
              { type: 'relationship', target: 'riley', change: 30 },
              { type: 'need', target: 'social', change: 15 },
              { type: 'story', flag: 'riley_supporter', value: true }
            ]
          },
          {
            id: 'choice_2_1_b',
            text: 'Say yes, but you\'re not sure you can make it - keep it casual.',
            consequences: [
              { type: 'relationship', target: 'riley', change: 10 },
              { type: 'need', target: 'social', change: 5 }
            ]
          },
          {
            id: 'choice_2_1_c',
            text: 'Politely decline - you\'re not really into that scene.',
            consequences: [
              { type: 'relationship', target: 'riley', change: -15 },
              { type: 'need', target: 'social', change: -5 }
            ]
          }
        ]
      },
      {
        id: 'event_2_2',
        description: 'Alex comes home upset. Their art show was cancelled last minute due to gallery issues. They were counting on sales to help with rent. "I don\'t know what I\'m going to do..."',
        involvedCharacters: ['alex'],
        choices: [
          {
            id: 'choice_2_2_a',
            text: 'Offer to lend them money to cover rent.',
            requirements: [{ type: 'need', target: 'money', value: 200 }],
            consequences: [
              { type: 'relationship', target: 'alex', change: 40 },
              { type: 'need', target: 'money', change: -200 },
              { type: 'story', flag: 'helped_alex_financially', value: true }
            ]
          },
          {
            id: 'choice_2_2_b',
            text: 'Help them brainstorm alternative ways to sell their art online.',
            requirements: [{ type: 'trait', trait: 'creative' }],
            consequences: [
              { type: 'relationship', target: 'alex', change: 25 },
              { type: 'need', target: 'energy', change: -10 },
              { type: 'story', flag: 'helped_alex_creatively', value: true }
            ]
          },
          {
            id: 'choice_2_2_c',
            text: 'Express sympathy but admit you can\'t help much right now.',
            consequences: [
              { type: 'relationship', target: 'alex', change: -5 },
              { type: 'need', target: 'social', change: -10 }
            ]
          }
        ]
      },
      {
        id: 'event_2_3',
        description: 'Morgan invites you to a professional networking event. It could lead to better opportunities, but it costs $50 to attend and means missing Riley\'s open mic if you committed to it.',
        involvedCharacters: ['morgan', 'riley'],
        choices: [
          {
            id: 'choice_2_3_a',
            text: 'Go to the networking event - career comes first.',
            requirements: [
              { type: 'need', target: 'money', value: 50 },
              { type: 'trait', trait: 'ambitious' }
            ],
            consequences: [
              { type: 'relationship', target: 'morgan', change: 30 },
              { type: 'relationship', target: 'riley', change: -20 },
              { type: 'need', target: 'money', change: -50 },
              { type: 'story', flag: 'networked_professionally', value: true }
            ]
          },
          {
            id: 'choice_2_3_b',
            text: 'Keep your commitment to Riley - you gave your word.',
            requirements: [{ type: 'relationship', target: 'riley', value: 30 }],
            consequences: [
              { type: 'relationship', target: 'riley', change: 35 },
              { type: 'relationship', target: 'morgan', change: -15 },
              { type: 'need', target: 'social', change: 25 },
              { type: 'story', flag: 'loyal_to_riley', value: true }
            ]
          },
          {
            id: 'choice_2_3_c',
            text: 'Try to attend both - rush between events.',
            requirements: [{ type: 'need', target: 'energy', value: 60 }],
            consequences: [
              { type: 'relationship', target: 'morgan', change: 15 },
              { type: 'relationship', target: 'riley', change: 15 },
              { type: 'need', target: 'energy', change: -35 },
              { type: 'need', target: 'money', change: -50 }
            ]
          },
          {
            id: 'choice_2_3_d',
            text: 'Skip both - you need a quiet night to recharge.',
            consequences: [
              { type: 'relationship', target: 'morgan', change: -10 },
              { type: 'relationship', target: 'riley', change: -10 },
              { type: 'need', target: 'energy', change: 25 },
              { type: 'need', target: 'social', change: -15 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'chapter_3',
    number: 3,
    title: 'Consequences',
    description: 'Your choices have shaped your relationships and life. Now you face the results.',
    events: [
      {
        id: 'event_3_1',
        description: 'The person you\'ve grown closest to wants to talk about your future together - whether as friends, roommates, or something more.',
        choices: [
          {
            id: 'choice_3_1_a',
            text: 'Open up about wanting a deeper connection.',
            requirements: [{ type: 'need', target: 'social', value: 50 }],
            consequences: [
              { type: 'need', target: 'social', change: 30 },
              { type: 'mood', newMood: 'happy' },
              { type: 'story', flag: 'deep_connection', value: true }
            ]
          },
          {
            id: 'choice_3_1_b',
            text: 'Keep things as they are - you value the friendship.',
            consequences: [
              { type: 'need', target: 'social', change: 10 },
              { type: 'story', flag: 'maintained_boundaries', value: true }
            ]
          },
          {
            id: 'choice_3_1_c',
            text: 'Admit you need space - you\'ve been overwhelmed.',
            consequences: [
              { type: 'need', target: 'social', change: -20 },
              { type: 'need', target: 'energy', change: 15 },
              { type: 'story', flag: 'needed_space', value: true }
            ]
          }
        ]
      },
      {
        id: 'event_3_2',
        description: 'An opportunity arises that could change everything - but it means potentially leaving this life you\'ve built behind.',
        choices: [
          {
            id: 'choice_3_2_a',
            text: 'Take the leap - chase the opportunity.',
            requirements: [{ type: 'trait', trait: 'adventurous' }],
            consequences: [
              { type: 'need', target: 'money', change: 500 },
              { type: 'need', target: 'social', change: -30 },
              { type: 'mood', newMood: 'excited' },
              { type: 'story', flag: 'took_opportunity', value: true }
            ]
          },
          {
            id: 'choice_3_2_b',
            text: 'Stay where you are - these relationships matter more.',
            requirements: [{ type: 'need', target: 'social', value: 60 }],
            consequences: [
              { type: 'need', target: 'social', change: 25 },
              { type: 'mood', newMood: 'content' },
              { type: 'story', flag: 'chose_relationships', value: true }
            ]
          }
        ]
      },
      {
        id: 'event_3_3',
        description: 'As this chapter of your life closes, you reflect on the journey. You\'ve changed, grown, and built something meaningful in this small corner of the city.',
        choices: [
          {
            id: 'choice_3_3_a',
            text: 'Look forward to what comes next with hope.',
            consequences: [
              { type: 'mood', newMood: 'excited' },
              { type: 'story', flag: 'hopeful_ending', value: true }
            ]
          },
          {
            id: 'choice_3_3_b',
            text: 'Feel content with where you are now.',
            consequences: [
              { type: 'mood', newMood: 'content' },
              { type: 'story', flag: 'content_ending', value: true }
            ]
          }
        ]
      }
    ]
  }
];

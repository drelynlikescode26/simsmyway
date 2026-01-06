# Sims My Way

A focused life-sim game inspired by The Sims, emphasizing story, emotions, and meaningful player decisions over micromanagement.

## 🎮 Game Features

### Core Experience
- **Story-Driven**: Follow a narrative through chapter-based progression
- **Meaningful Choices**: Every decision has lasting consequences on relationships and story
- **Emotional Depth**: Dynamic mood system influenced by needs and relationships
- **Small Cast**: 4 well-developed characters with distinct personalities and traits
- **One Setting**: Intimate apartment building environment

### Core Systems

#### 1. Character System
- **Traits**: Characters have defining traits (cheerful, serious, creative, analytical, empathetic, ambitious, laid-back, adventurous)
- **Moods**: Dynamic moods that change based on needs and relationships (happy, content, neutral, stressed, sad, excited, lonely)

#### 2. Simplified Needs
- **Energy** (0-100): Physical and mental stamina
- **Money**: Financial resources (can go negative for debt)
- **Social** (0-100): Connection and companionship

#### 3. Relationship System
- **Dynamic Values**: Range from -100 (enemies) to +100 (best friends)
- **Consequence Tracking**: Every interaction is remembered
- **History**: Complete log of relationship-changing events

#### 4. Chapter-Based Time
- Story progresses through distinct chapters
- Events unfold naturally without time micromanagement
- Clear beginning, middle, and end structure

#### 5. Choice System with Requirements
- Some choices require specific traits, relationship levels, or need values
- Choices have multiple types of consequences (needs, relationships, mood, story flags)
- Player agency drives the narrative

## 🏗️ Modular Architecture

The game is built with extensibility in mind:

```
src/
├── core/              # Core game systems (can be reused for new content)
│   ├── types.ts       # Type definitions
│   ├── CharacterManager.ts
│   ├── NeedsManager.ts
│   ├── RelationshipManager.ts
│   ├── ChoiceManager.ts
│   ├── ChapterManager.ts
│   └── GameEngine.ts  # Coordinates all systems
├── content/           # Game content (easily expandable)
│   ├── characters.ts  # Character definitions
│   └── chapters.ts    # Story chapters and events
└── ui/                # User interface
    └── UIManager.ts   # Rendering and interaction
```

### Adding New Content

#### Add a New Character
```typescript
// In src/content/characters.ts
{
  id: 'newchar',
  name: 'New Character',
  traits: ['creative', 'empathetic'],
  mood: 'happy',
  bio: 'Description of the character'
}
```

#### Add a New Chapter
```typescript
// In src/content/chapters.ts
{
  id: 'chapter_4',
  number: 4,
  title: 'New Chapter',
  description: 'Chapter description',
  events: [
    {
      id: 'event_4_1',
      description: 'Event description',
      choices: [
        {
          id: 'choice_4_1_a',
          text: 'Choice text',
          consequences: [
            { type: 'relationship', target: 'alex', change: 10 },
            { type: 'need', target: 'energy', change: -15 }
          ]
        }
      ]
    }
  ]
}
```

#### Add New Traits
```typescript
// In src/core/types.ts, extend the Trait type
export type Trait = 
  | 'cheerful' 
  | 'serious'
  // ... existing traits
  | 'your-new-trait';
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/drelynlikescode26/simsmyway.git
cd simsmyway

# Install dependencies
npm install

# Build the game
npm run build

# Start a local server and play
npm start
```

The game will open in your browser at `http://localhost:8080`

### Development

```bash
# Watch mode - auto-recompiles on changes
npm run dev

# In another terminal, serve the files
npx http-server -p 8080
```

## 🎨 Design Philosophy

### Focused, Not Overwhelming
- **No time pressure**: Chapter-based progression lets players engage at their own pace
- **Clear choices**: Options are meaningful and understandable
- **Visible consequences**: Changes to needs and relationships are immediately apparent

### Story First
- Every event advances the narrative
- Characters have depth and development
- Player choices shape personal stories, not just stats

### Emotional Connection
- Mood system reflects the player's life situation
- Relationships feel real and consequential
- Success isn't just about stats, but about meaningful connections

## 🎯 Future Expansion Ideas

The modular architecture supports many expansion possibilities:

1. **New Chapters**: Extend the story with new events and choices
2. **More Characters**: Expand the cast with new relationships
3. **Additional Needs**: Add complexity with new need types (health, creativity, etc.)
4. **Mini-Games**: Optional activities that affect needs/relationships
5. **Multiple Endings**: Branch the story based on earlier choices
6. **Character Customization**: Let players define their own traits at game start
7. **Random Events**: Add unpredictability to chapters
8. **Achievement System**: Track player accomplishments

## 📝 Save System

- **Auto-save**: Games can be saved at any point
- **Local Storage**: Saves persist in browser localStorage
- **Load Game**: Resume from where you left off

## 🎮 Playing the Game

1. **Read the Event**: Each event describes what's happening
2. **Choose Your Action**: Select from available choices (some may require specific traits or need levels)
3. **See Consequences**: Watch your needs, mood, and relationships change
4. **Progress Through Story**: Move through chapters as events unfold
5. **Reach Your Ending**: See how your choices shaped your story

## 📄 License

ISC License

## 🤝 Contributing

This is a focused, single-version project. The modular architecture is designed to let you fork and build your own stories and systems on top of the core engine.

---

**Built with ❤️ using TypeScript and vanilla JavaScript**

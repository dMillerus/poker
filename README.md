# Poker Hand Analysis & Training Application

A client-side poker training application that helps players learn Texas Hold'em through real-time hand analysis, probability calculations, and adaptive AI guidance.

## Features

- **Interactive Game Engine** — Play through hands with 1-8 AI opponents
- **Real-Time Probability Calculations** — Outs, equity, and pot odds computed on every street
- **Adaptive AI Guidance** — Context-aware feedback that adjusts to your skill level
- **Comprehensive Statistics** — Track performance by starting hand, position, and session
- **Hand Replay** — Review past hands with street-by-street analysis
- **Offline-First** — All features work without internet connection

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 18 + TypeScript |
| Build | Vite |
| State | Zustand |
| Styling | Tailwind CSS |
| Persistence | IndexedDB (Dexie.js) |
| Testing | Vitest + React Testing Library |

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
git clone https://github.com/your-org/poker-trainer.git
cd poker-trainer
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Production Build

```bash
npm run build
npm run preview
```

### Testing

```bash
npm run test        # Run tests
npm run test:ui     # Run with UI
npm run coverage    # Generate coverage report
```

## Project Structure

```
src/
├── components/          # React UI components
│   ├── common/          # Reusable primitives (Button, Modal, Tabs)
│   ├── game/            # Game table, cards, controls
│   ├── guidance/        # AI feedback panel
│   ├── layout/          # App shell, header
│   ├── replay/          # Hand history replay
│   ├── settings/        # User preferences
│   └── statistics/      # Performance dashboard
├── db/                  # IndexedDB persistence layer
│   ├── database.ts      # Dexie configuration
│   ├── repositories/    # Data access objects
│   └── hooks.ts         # React hooks for DB access
├── engine/              # Core game logic
│   ├── deck.ts          # Card/deck operations
│   ├── evaluator.ts     # Hand ranking evaluation
│   ├── game-controller.ts
│   ├── guidance/        # AI guidance generation
│   ├── probability/     # Odds/equity calculations
│   └── statistics/      # Performance tracking
├── hooks/               # Custom React hooks
├── stores/              # Zustand state management
├── types/               # TypeScript type definitions
└── utils/               # Shared utilities
```

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      UI Layer                           │
│  GameTable │ GuidancePanel │ Statistics │ HandReplay    │
└─────────────────────────┬───────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────┐
│                  State Management                        │
│         Zustand stores (game, guidance, stats)          │
└─────────────────────────┬───────────────────────────────┘
                          │
┌──────────┬──────────────┼──────────────┬────────────────┐
│  Game    │  Probability │   Guidance   │   Statistics   │
│  Engine  │    Engine    │    System    │     Engine     │
└──────────┴──────────────┴──────────────┴────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────┐
│              Persistence Layer (IndexedDB)              │
└─────────────────────────────────────────────────────────┘
```

### Engine Modules

| Module | Responsibility |
|--------|----------------|
| **Game Engine** | Deck management, dealing, hand evaluation, street progression |
| **Probability Engine** | Outs calculation, Monte Carlo equity simulation, odds conversion |
| **Guidance System** | Hand strength analysis, concept detection, adaptive feedback |
| **Statistics Engine** | Hand recording, aggregation, pattern detection, progress tracking |

## Key Algorithms

### Hand Evaluation

The evaluator determines the best 5-card hand from 7 available cards using combinatorial analysis. Hand rankings (1-10):

1. High Card
2. One Pair
3. Two Pair
4. Three of a Kind
5. Straight
6. Flush
7. Full House
8. Four of a Kind
9. Straight Flush
10. Royal Flush

### Equity Calculation

Monte Carlo simulation with 10,000 iterations:
1. Remove visible cards from deck
2. Deal random opponent hands
3. Complete the board
4. Evaluate all hands and determine winner
5. Aggregate win/loss/tie counts

Target latency: <200ms

### Adaptive Guidance

The guidance system tracks concept competency:
- New concepts receive full explanations
- Demonstrated understanding reduces verbosity
- Recurring mistakes trigger reinforcement

## Configuration

### User Preferences

| Setting | Default | Options |
|---------|---------|---------|
| Opponent Count | 3 | 1-8 |
| Verbosity | Beginner | Beginner, Intermediate, Minimal |
| Auto-Advance | Off | On/Off |

### Storage

Data stored in IndexedDB:
- Hand history (last 10,000 hands)
- Session records
- User preferences
- Concept competency scores

## Performance Targets

| Metric | Target |
|--------|--------|
| Initial Load | <2s |
| AI Guidance Latency | <500ms |
| Probability Calculation | <200ms |
| Bundle Size (gzipped) | <500KB |
| Lighthouse PWA Score | >90 |

## Scripts

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run preview      # Preview production build
npm run test         # Run tests
npm run test:ui      # Run tests with UI
npm run coverage     # Generate coverage report
npm run lint         # Run ESLint
npm run lint:fix     # Fix lint errors
npm run format       # Run Prettier
npm run typecheck    # TypeScript type checking
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Requires IndexedDB support. Graceful degradation in private browsing mode.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit changes (`git commit -am 'Add feature'`)
4. Push to branch (`git push origin feature/improvement`)
5. Open a Pull Request

### Code Style

- TypeScript strict mode
- Functional components only
- Tailwind for styling (no CSS files)
- Comprehensive unit tests for engine modules

## License

MIT

## Acknowledgments

- Hand evaluation logic adapted from standard poker algorithms
- Starting hand rankings based on established poker theory
- Monte Carlo equity methodology from academic poker research

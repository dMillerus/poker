/**
 * TypeScript Types barrel export
 *
 * This module re-exports all TypeScript type definitions:
 *
 * - card.ts        Card, Suit, Rank types
 * - hand.ts        Hand rankings and evaluation types
 * - game.ts        Game state and player types
 * - probability.ts Outs, equity, odds types
 * - guidance.ts    AI guidance and competency types
 * - statistics.ts  Statistics and tracking types
 */

// Card types will be exported here
// export * from './card';

// Hand types will be exported here
// export * from './hand';

// Game types will be exported here
// export * from './game';

// Probability types will be exported here
// export * from './probability';

// Guidance types will be exported here
// export * from './guidance';

// Statistics types will be exported here
// export * from './statistics';

// Placeholder types for Phase 1 - will be replaced in Phase 2
export interface PlaceholderCard {
  suit: string;
  rank: string;
}

export interface PlaceholderGameState {
  id: string;
  status: 'waiting' | 'playing' | 'complete';
}

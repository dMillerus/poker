/**
 * Card types for Texas Hold'em poker
 * Represents the 52-card standard deck
 */

/** Card suits as const tuple for type safety */
export const SUITS = ['clubs', 'diamonds', 'hearts', 'spades'] as const;
export type Suit = (typeof SUITS)[number];

/** Card ranks from 2 to Ace */
export const RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'] as const;
export type Rank = (typeof RANKS)[number];

/** Unicode suit symbols for display */
export const SUIT_SYMBOLS: Record<Suit, string> = {
  clubs: '\u2663',
  diamonds: '\u2666',
  hearts: '\u2665',
  spades: '\u2660',
} as const;

export type SuitSymbol = (typeof SUIT_SYMBOLS)[Suit];

/** Display representation of ranks */
export const RANK_DISPLAY: Record<Rank, string> = {
  '2': '2',
  '3': '3',
  '4': '4',
  '5': '5',
  '6': '6',
  '7': '7',
  '8': '8',
  '9': '9',
  '10': '10',
  J: 'J',
  Q: 'Q',
  K: 'K',
  A: 'A',
} as const;

export type RankDisplay = (typeof RANK_DISPLAY)[Rank];

/** Numeric values for rank comparisons (Ace high) */
export const RANK_VALUES: Record<Rank, number> = {
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  '10': 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
} as const;

/** Whether a suit is red (diamonds, hearts) or black (clubs, spades) */
export const SUIT_COLORS: Record<Suit, 'red' | 'black'> = {
  clubs: 'black',
  diamonds: 'red',
  hearts: 'red',
  spades: 'black',
} as const;

export type SuitColor = 'red' | 'black';

/**
 * Represents a single playing card
 */
export interface Card {
  readonly suit: Suit;
  readonly rank: Rank;
}

/**
 * A standard 52-card deck
 */
export type Deck = readonly Card[];

/**
 * A mutable deck for shuffling and dealing
 */
export type MutableDeck = Card[];

/**
 * Card represented as a unique string identifier (e.g., "Ah" for Ace of hearts)
 * Useful for serialization and comparison
 */
export type CardId = `${Rank}${Suit}`;

/**
 * Helper type for creating card from ID
 */
export type ParsedCardId = {
  rank: Rank;
  suit: Suit;
};

/**
 * Hand evaluation types for Texas Hold'em poker
 */

import type { Card, Rank, Suit } from './card';

/**
 * Hand rankings from worst (1) to best (10)
 * Royal Flush is treated as a special case of Straight Flush
 */
export const HAND_RANKS = {
  HIGH_CARD: 1,
  ONE_PAIR: 2,
  TWO_PAIR: 3,
  THREE_OF_A_KIND: 4,
  STRAIGHT: 5,
  FLUSH: 6,
  FULL_HOUSE: 7,
  FOUR_OF_A_KIND: 8,
  STRAIGHT_FLUSH: 9,
  ROYAL_FLUSH: 10,
} as const;

export type HandRank = (typeof HAND_RANKS)[keyof typeof HAND_RANKS];

/** Display names for hand rankings */
export const HAND_RANK_NAMES: Record<HandRank, string> = {
  1: 'High Card',
  2: 'One Pair',
  3: 'Two Pair',
  4: 'Three of a Kind',
  5: 'Straight',
  6: 'Flush',
  7: 'Full House',
  8: 'Four of a Kind',
  9: 'Straight Flush',
  10: 'Royal Flush',
} as const;

/**
 * Starting hand categories for pre-flop analysis
 */
export const HAND_CATEGORIES = {
  PAIR: 'pair',
  SUITED: 'suited',
  OFFSUIT: 'offsuit',
  SUITED_CONNECTOR: 'suited_connector',
  SUITED_GAPPER: 'suited_gapper',
  BROADWAY: 'broadway',
  SUITED_ACE: 'suited_ace',
} as const;

export type HandCategory = (typeof HAND_CATEGORIES)[keyof typeof HAND_CATEGORIES];

/**
 * Starting hand strength classifications
 */
export const STARTING_HAND_STRENGTHS = {
  PREMIUM: 'premium',
  STRONG: 'strong',
  PLAYABLE: 'playable',
  MARGINAL: 'marginal',
  WEAK: 'weak',
} as const;

export type StartingHandStrength =
  (typeof STARTING_HAND_STRENGTHS)[keyof typeof STARTING_HAND_STRENGTHS];

/**
 * Exactly two hole cards dealt to a player
 */
export type HoleCards = readonly [Card, Card];

/**
 * Community cards (0-5 cards depending on street)
 */
export type CommunityCards = readonly Card[] & { readonly length: 0 | 1 | 2 | 3 | 4 | 5 };

/**
 * Flexible community cards type for runtime
 */
export type CommunityCardsArray = readonly Card[];

/**
 * The flop - exactly 3 community cards
 */
export type Flop = readonly [Card, Card, Card];

/**
 * A complete 5-card poker hand
 */
export type FiveCardHand = readonly [Card, Card, Card, Card, Card];

/**
 * Result of evaluating a poker hand
 */
export interface EvaluatedHand {
  /** The hand ranking (1-10) */
  readonly rank: HandRank;

  /** The 5 cards that make up the best hand */
  readonly cards: FiveCardHand;

  /** Kicker cards for tiebreaking (in order of importance) */
  readonly kickers: readonly Card[];

  /** Human-readable description (e.g., "Pair of Aces, King kicker") */
  readonly description: string;

  /**
   * Numeric score for comparing hands of the same rank
   * Higher is better
   */
  readonly score: number;
}

/**
 * Analysis of a starting hand (hole cards)
 */
export interface StartingHandAnalysis {
  /** The hole cards being analyzed */
  readonly holeCards: HoleCards;

  /** Whether the cards are suited */
  readonly isSuited: boolean;

  /** Whether the cards are a pocket pair */
  readonly isPair: boolean;

  /** Whether both cards are broadway (10+) */
  readonly isBroadway: boolean;

  /** Whether the cards are connected (adjacent ranks) */
  readonly isConnector: boolean;

  /** Gap between card ranks (0 for connectors, 1 for one-gappers, etc.) */
  readonly gap: number;

  /** Categories this hand belongs to */
  readonly categories: readonly HandCategory[];

  /** Overall strength classification */
  readonly strength: StartingHandStrength;

  /** Canonical notation (e.g., "AKs", "QQ", "87o") */
  readonly notation: string;
}

/**
 * Details about a specific made hand
 */
export interface MadeHandDetails {
  /** Primary cards that make the hand (e.g., the pair, the trips, etc.) */
  readonly primaryCards: readonly Card[];

  /** The rank(s) involved in the primary hand */
  readonly primaryRanks: readonly Rank[];

  /** The suit(s) involved (for flushes) */
  readonly primarySuits?: readonly Suit[];

  /** Whether this uses both hole cards */
  readonly usesBothHoleCards: boolean;

  /** Whether this uses one hole card */
  readonly usesOneHoleCard: boolean;

  /** Whether this is entirely from the board */
  readonly isPlayingTheBoard: boolean;
}

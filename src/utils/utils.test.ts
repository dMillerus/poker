import { describe, it, expect } from 'vitest';
import { generateId, clamp, formatPercentage, formatRatio } from './index';

describe('Utils', () => {
  describe('generateId', () => {
    it('should generate unique IDs', () => {
      const id1 = generateId();
      const id2 = generateId();
      expect(id1).not.toBe(id2);
    });

    it('should return a string', () => {
      const id = generateId();
      expect(typeof id).toBe('string');
    });
  });

  describe('clamp', () => {
    it('should return the value if within range', () => {
      expect(clamp(5, 0, 10)).toBe(5);
    });

    it('should return min if value is below range', () => {
      expect(clamp(-5, 0, 10)).toBe(0);
    });

    it('should return max if value is above range', () => {
      expect(clamp(15, 0, 10)).toBe(10);
    });
  });

  describe('formatPercentage', () => {
    it('should format percentage correctly', () => {
      expect(formatPercentage(0.5)).toBe('50.0%');
      expect(formatPercentage(0.333, 2)).toBe('33.30%');
    });
  });

  describe('formatRatio', () => {
    it('should format ratio correctly', () => {
      expect(formatRatio(4)).toBe('4.0:1');
      expect(formatRatio(0.25)).toBe('1:4.0');
    });
  });
});

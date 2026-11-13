interface RateLimitEntry {
  failures: number;
  lastAttempt: number;
  blockedUntil?: number;
}

const attemptStore = new Map<string, RateLimitEntry>();

// Purge expired entries periodically
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of attemptStore.entries()) {
      if (now - entry.lastAttempt > 15 * 60 * 1000 && (!entry.blockedUntil || now > entry.blockedUntil)) {
        attemptStore.delete(key);
      }
    }
  }, 60 * 1000);
}

export const rateLimiter = {
  check(key: string): {
    isBlocked: boolean;
    requiresTurnstile: boolean;
    failureCount: number;
    retryAfterSec: number;
  } {
    const now = Date.now();
    const entry = attemptStore.get(key);

    if (!entry) {
      return { isBlocked: false, requiresTurnstile: false, failureCount: 0, retryAfterSec: 0 };
    }

    if (entry.blockedUntil && now < entry.blockedUntil) {
      return {
        isBlocked: true,
        requiresTurnstile: true,
        failureCount: entry.failures,
        retryAfterSec: Math.ceil((entry.blockedUntil - now) / 1000),
      };
    }

    return {
      isBlocked: false,
      requiresTurnstile: entry.failures >= 3,
      failureCount: entry.failures,
      retryAfterSec: 0,
    };
  },

  recordFailure(key: string): {
    isBlocked: boolean;
    requiresTurnstile: boolean;
    failureCount: number;
    retryAfterSec: number;
  } {
    const now = Date.now();
    const entry = attemptStore.get(key) || { failures: 0, lastAttempt: now };

    entry.failures += 1;
    entry.lastAttempt = now;

    // After 5 failures within window, block with 60s cooldown (Board 18: 5/min/IP)
    if (entry.failures >= 5) {
      entry.blockedUntil = now + 60 * 1000;
    }

    attemptStore.set(key, entry);
    return this.check(key);
  },

  recordSuccess(key: string) {
    attemptStore.delete(key);
  },
};

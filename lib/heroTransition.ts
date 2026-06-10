type HeroTransition = {
  id: number;
  rect: { x: number; y: number; width: number; height: number };
};

let pending: HeroTransition | null = null;

export function setHeroTransition(t: HeroTransition) {
  pending = t;
}

export function consumeHeroTransition(): HeroTransition | null {
  const t = pending;
  pending = null;
  return t;
}

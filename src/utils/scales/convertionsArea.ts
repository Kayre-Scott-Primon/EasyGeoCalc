export function convertm2ToKm2(meters: number): number {
  return meters / 1_000_000;
}

export function convertKm2ToM2(kilometers: number): number {
  return kilometers * 1_000_000;
}

export function convertAreaIfNeeded(value: number): {
  value: number;
  unit: string;
} {
  if (value > 1_000_000) {
    return {
      value: convertm2ToKm2(value),
      unit: 'km²',
    };
  }
  return {
    value,
    unit: 'm²',
  };
}

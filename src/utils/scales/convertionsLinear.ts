type PropsConvertKilometersOrMeters = {
  value: number;
};

export function convertMetersToKilometers(meters: number): number {
  return meters / 1000;
}

export function convertKilometersToMeters(kilometers: number): number {
  return kilometers * 1000;
}

export function convertKilometerOrMeters({
  value,
}: PropsConvertKilometersOrMeters): { value: number; unit: string } {
  if (value > 1000) {
    return {
      value: convertMetersToKilometers(value),
      unit: 'km',
    };
  }
  return {
    value,
    unit: 'm',
  };
}

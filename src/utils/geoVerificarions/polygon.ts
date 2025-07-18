type Coordenada = { longitude: number; latitude: number };

export function isPolygon(points: Coordenada[]): boolean {
  if (points.length < 4) return false;

  const first = points[0];
  const last = points[points.length - 1];

  const isClosed =
    first.longitude === last.longitude && first.latitude === last.latitude;

  return isClosed;
}

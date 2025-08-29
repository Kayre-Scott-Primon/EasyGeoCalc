import { polygon } from '@turf/helpers';
import area from '@turf/area';

export function calculateArea(
  points: { latitude: number; longitude: number }[],
): number {
  const coords = points.map(p => [p.longitude, p.latitude]);

  const poly = polygon([coords.concat([coords[0]])]);

  const result = area(poly);

  return result;
}

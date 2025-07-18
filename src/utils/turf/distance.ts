import { distance, point } from '@turf/turf';

type Props = {
  pointA: { latitude: number; longitude: number };
  pointB: { latitude: number; longitude: number };
};

export function distanceBetweenPoints({ pointA, pointB }: Props): number {
  const from = point([pointA.longitude, pointA.latitude]);
  const to = point([pointB.longitude, pointB.latitude]);
  return distance(from, to, { units: 'meters' });
}

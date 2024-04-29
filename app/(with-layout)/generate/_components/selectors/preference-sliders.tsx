import React from 'react';
import { RangeSlider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

interface Props {
  onValuesChange: (value: Record<string, number>) => void;
}

const PreferenceSliders: React.FC<Props> = ({ onValuesChange }) => {
  const [preferences, setPreferences] = React.useState<Record<string, number>>({
    min_popularity: 50,
    max_popularity: 100,
  });

  const [featureKeys, setFeatureKeys] = React.useState<string[]>([]);

  React.useEffect(
    () => {
      onValuesChange(preferences);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [preferences]
  );

  return (
    <div>
      <div className="flex flex-col gap-2 mb-4">
        <Label className="text-md text-info font-bold">
          Select features you want to adjust
        </Label>
        <div className="flex flex-wrap gap-1">
          {trackFeatures.map((feature) => (
            <Badge
              key={feature.key}
              className="text-sm font-medium capitalize cursor-pointer"
              variant={
                featureKeys.includes(feature.key) ? 'default' : 'outline'
              }
              onClick={() => {
                if (featureKeys.includes(feature.key)) {
                  setFeatureKeys((prev) =>
                    prev.filter((f) => f !== feature.key)
                  );
                } else {
                  setFeatureKeys((prev) => [...prev, feature.key]);
                }
              }}
            >
              {feature.key}
            </Badge>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Label className="text-md text-info font-bold">
          Adjust to your vibe
        </Label>
        <div key={'popularity'} className="flex flex-col gap-2">
          <Label className="capitalize flex items-center justify-between">
            <span className="text-warning">Popularity:</span>
            <span>
              {preferences.min_popularity ?? 50}{' '}
              <span className="text-foreground/70">-</span>{' '}
              {preferences.max_popularity ?? 100}
            </span>
          </Label>
          <RangeSlider
            {...{
              key: 'popularity',
              defaultValue: [50, 100],
              min: 0,
              max: 100,
              step: 1,
            }}
            size="sm"
            onValueChange={(value) => {
              setPreferences((prev) => ({
                ...prev,
                min_popularity: value[0],
                max_popularity: value[1],
              }));
            }}
          />
        </div>
        {trackFeatures
          .filter((feature) => featureKeys.includes(feature.key))
          .map((feature) => {
            const { key, defaultValue } = feature;
            return (
              <div key={key} className="flex flex-col gap-2">
                <Label className="capitalize flex items-center justify-between">
                  <span className="text-warning">{feature.key}:</span>
                  <span>
                    {preferences[`min_${key}`] ?? defaultValue[0]}{' '}
                    <span className="text-foreground/70">-</span>{' '}
                    {preferences[`max_${key}`] ?? defaultValue[1]}
                  </span>
                </Label>

                <RangeSlider
                  {...feature}
                  size="sm"
                  onValueChange={(value) => {
                    setPreferences((prev) => ({
                      ...prev,
                      [`min_${key}`]: value[0],
                      [`max_${key}`]: value[1],
                    }));
                  }}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default PreferenceSliders;

interface TrackFeatureProps {
  key: string;
  description?: string;
  defaultValue: number[];
  min: number;
  max: number;
  step: number;
  defaultTarget?: number;
}

const trackFeatures: TrackFeatureProps[] = [
  {
    key: 'acousticness',
    defaultValue: [0, 1],
    min: 0,
    max: 1,
    step: 0.001,
  },
  {
    key: 'danceability',
    defaultValue: [0, 1],
    min: 0,
    max: 1,
    step: 0.001,
  },
  {
    key: 'energy',
    defaultValue: [0, 1],
    min: 0,
    max: 1,
    step: 0.001,
  },
  {
    key: 'instrumentalness',
    defaultValue: [0, 1],
    min: 0,
    max: 1,
    step: 0.001,
  },
  {
    key: 'liveness',
    defaultValue: [0, 1],
    min: 0,
    max: 1,
    step: 0.001,
  },
  {
    key: 'loudness',
    defaultValue: [-60, 0],
    min: -60,
    max: 0,
    step: 0.001,
  },
  {
    key: 'speechiness',
    defaultValue: [0, 1],
    min: 0,
    max: 1,
    step: 0.001,
  },
  {
    key: 'valence',
    defaultValue: [0, 1],
    min: 0,
    max: 1,
    step: 0.001,
  },
];

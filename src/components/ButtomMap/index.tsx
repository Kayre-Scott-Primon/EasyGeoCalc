import { Text, TouchableOpacity, View } from 'react-native';
import { stylesCollections } from './styles';
import { Icon } from '@rneui/themed';
import type { MapType } from 'react-native-maps';
import { useRef, useState } from 'react';

type Props = {
  trashAction?: () => void;
  userAction?: () => void;
  layerSelected: (layer: MapType) => void;
};

export default function ButtomMap({
  trashAction = () => {},
  userAction = () => {},
  layerSelected = () => 'satellite',
}: Props) {
  const styles = stylesCollections();
  const [showListLayers, setShowListLayers] = useState(false);
  const listOfLayers = [
    'none',
    'hybrid',
    'mutedStandard',
    'satellite',
    'standard',
    'terrain',
    'satelliteFlyover',
    'hybridFlyover',
  ];
  const layerRef = useRef<MapType>('satellite');

  function changeLayer(layer: MapType) {
    layerRef.current = layer;
    layerSelected(layer);
    setShowListLayers(false);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setShowListLayers(!showListLayers)}
        style={styles.buttonIcons}
      >
        <Icon
          name="layers"
          type="feather"
          color="#008200"
          style={styles.icons}
        />
        {showListLayers && <Text style={styles.optionsOfList}>Layers</Text>}
      </TouchableOpacity>
      {showListLayers ? (
        <View style={styles.listLayers}>
          {showListLayers && (
            <>
              {listOfLayers.map(layer => (
                <TouchableOpacity
                  key={layer}
                  onPress={() => changeLayer(layer as MapType)}
                  style={styles.buttonOptionsOfList}
                >
                  <Text
                    style={[
                      styles.optionsOfList,
                      {
                        color: layer === layerRef.current ? '#008200' : '#fff',
                      },
                    ]}
                  >
                    {layer}
                  </Text>
                </TouchableOpacity>
              ))}
            </>
          )}
        </View>
      ) : (
        <>
          <TouchableOpacity onPress={userAction}>
            <Icon
              name="crosshairs-gps"
              type="material-community"
              color="#008200"
              style={styles.icons}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={trashAction}>
            <Icon
              name="trash-2"
              type="feather"
              color="#008200"
              style={styles.icons}
            />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

import { Text, View } from 'react-native';
import { stylesCollections } from './styles';
import MapView, { Circle, MapType, Marker, Polygon, Polyline } from 'react-native-maps';
import ReturnButton from '../../components/ReturnButtom';
import ButtomMap from '../../components/ButtomMap';
import BottomSheet from '../../components/BottomSheet';
import { Icon } from '@rneui/themed';
import { useRef, useState } from 'react';
import FormsButton from './components/FormsButtons';
import { calculateArea } from '../../utils/turf/area';

interface CoordinateType {
    latitude: number;
    longitude: number;
}

type FormsType = {
    type: 'circle' | 'square' | 'triangle';
    coordinates: CoordinateType[];
    width?: number;
    height?: number;
    radius?: number;
    area: number
}

export default function Forms() {
    const styles = stylesCollections();

    const [distance, setDistance] = useState<string>('');
    const [layer, setLayer] = useState<MapType>('satellite');
    const [userLocation, setUserLocation] = useState<{
        latitude: number;
        longitude: number;
    } | null>(null);
    const [forms, setForms] = useState<FormsType | undefined>(undefined)

    const mapRef = useRef<MapView>(null);

    const [isDraggingMarker, setIsDraggingMarker] = useState(false);

    function clickOnMap(event: any) {
        const { coordinate } = event.nativeEvent;
        switch (forms?.type) {
            case 'circle':
                setForms({
                    type: 'circle',
                    coordinates: [coordinate],
                    radius: 500,
                    area: Math.PI * 500 * 500
                });
                break;
            case 'square':
                setForms({
                    type: 'square',
                    coordinates: [coordinate],
                    width: 500,
                    height: 500,
                    area: 500 * 500
                });
                break;
            case 'triangle':
                setForms({
                    type: 'triangle',
                    coordinates: [
                        { latitude: coordinate.latitude, longitude: coordinate.longitude },
                        { latitude: coordinate.latitude + 0.005, longitude: coordinate.longitude + 0.005 },
                        { latitude: coordinate.latitude + 0.005, longitude: coordinate.longitude - 0.005 }
                    ],
                    area: calculateArea([
                        { latitude: coordinate.latitude, longitude: coordinate.longitude },
                        { latitude: coordinate.latitude + 0.005, longitude: coordinate.longitude + 0.005 },
                        { latitude: coordinate.latitude + 0.005, longitude: coordinate.longitude - 0.005 }
                    ])
                });
                break;
            default:
                break;
        }
    }

    function clearData() {
        setForms(undefined);
    }

    function changeLayer(layer: MapType) {
        setLayer(layer);
    }

    function centerUser() {
        console.log('Centering user location');
        // Implement user centering logic if needed
    }

    function userMoves(event: any) {
        const { coordinate } = event.nativeEvent;
        setUserLocation(coordinate);
    }

    const updateRadius = (edgeCoord: CoordinateType) => {
        console.log('Updating radius');
        const center: CoordinateType = forms?.coordinates[0] as CoordinateType;
        const R = 6371000; // raio da Terra em metros
        const dLat: number = (edgeCoord.latitude - center.latitude) * (Math.PI / 180);
        const dLon: number = (edgeCoord.longitude - center.longitude) * (Math.PI / 180);

        const a: number =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(center.latitude * Math.PI / 180) *
            Math.cos(edgeCoord.latitude * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);

        const c: number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance: number = R * c;

        setForms({ ...forms!, radius: distance, area: Math.PI * distance * distance });
    };

    const updateSquare = (index: number, coord: CoordinateType) => {
        const newWidth = (coord.longitude - forms!.coordinates[0].longitude) * 110100;
        const newHeight = (coord.latitude - forms!.coordinates[0].latitude) * 110100;
        setForms({ ...forms!, width: newWidth, height: newHeight, area: newWidth * newHeight });
    };

    const updateTriangle = (index: number, coord: CoordinateType) => {
        const newVertices = [...forms!.coordinates];
        newVertices[index] = coord;
        setForms({ ...forms!, coordinates: newVertices, area: calculateArea(newVertices) });
    };

    function renderForms() {
        switch (forms?.type) {
            case 'circle':
                return (
                    <>
                        <Circle
                            center={forms.coordinates[0]}
                            radius={forms.radius!}
                            fillColor="rgba(255, 255, 255, 0.3)"
                            strokeColor={isDraggingMarker ? 'rgba(255, 0, 0, 1)' : 'rgba(255, 255, 0, 1)'}
                            strokeWidth={5}
                        />
                        <Marker coordinate={forms.coordinates[0]} anchor={{ x: 0.5, y: 0.5 }}>
                            <Icon name='circle' type='material-community' size={14} color={'#fffb00ff'} />
                        </Marker>
                        <Polyline
                            coordinates={[
                                forms.coordinates[0],
                                { longitude: forms.coordinates[0].longitude + (forms.radius! / 110100), latitude: forms.coordinates[0].latitude }
                            ]}
                            strokeColor={isDraggingMarker ? 'rgba(255, 0, 0, 1)' : 'rgba(255, 255, 0, 1)'}
                            strokeWidth={3}
                            lineDashPattern={[5, 5]}
                        />
                        <Marker
                            coordinate={{ longitude: forms.coordinates[0].longitude + (forms.radius! / 110100) / 2, latitude: forms.coordinates[0].latitude }}>
                            <Text style={{ color: '#fffb00ff', fontWeight: 'bold', backgroundColor: 'rgba(0,0,0,0.5)', padding: 2, borderRadius: 5 }}>{forms.radius!.toFixed(2)} km</Text>
                        </Marker>

                        {/* marcador da borda (ajusta raio) */}
                        <Marker
                            coordinate={{ longitude: forms.coordinates[0].longitude + (forms.radius! / 110100), latitude: forms.coordinates[0].latitude }}
                            draggable
                            anchor={{ x: -0.0, y: 0.85 }}
                            pinColor={isDraggingMarker ? "blue" : "red"}
                            onDragStart={() => setIsDraggingMarker(true)}
                            onDrag={(e) => updateRadius(e.nativeEvent.coordinate)}
                            onDragEnd={(e) => {
                                updateRadius(e.nativeEvent.coordinate);
                                setIsDraggingMarker(false);
                            }}
                            title="Raio"
                        >
                            <Icon name={"pencil"} type='material-community' size={40} color={isDraggingMarker ? "red" : "#ffae00ff"} />
                        </Marker>
                    </>
                );
            case 'square':
                return (
                    <>
                        {/* Quadrado */}
                        <Polygon
                            coordinates={[
                                forms.coordinates[0],
                                { longitude: forms.coordinates[0].longitude + (forms.width! / 110100), latitude: forms.coordinates[0].latitude },
                                { longitude: forms.coordinates[0].longitude + (forms.width! / 110100), latitude: forms.coordinates[0].latitude + (forms.height! / 110100) },
                                { longitude: forms.coordinates[0].longitude, latitude: forms.coordinates[0].latitude + (forms.height! / 110100) },
                            ]}
                            strokeColor={isDraggingMarker ? 'rgba(255, 0, 0, 1)' : 'rgba(255, 255, 0, 1)'}
                            fillColor='rgba(255, 255, 255, 0.25)'
                            strokeWidth={2}
                        />

                        {/* Vértices (arrastáveis) */}
                        <Marker
                            key={'vertex-0'}
                            anchor={{ x: -0.0, y: 0.85 }}
                            coordinate={{ longitude: forms.coordinates[0].longitude + (forms.width! / 110100), latitude: forms.coordinates[0].latitude + (forms.height! / 110100) }}
                            draggable
                            pinColor="blue"
                            onDragStart={() => setIsDraggingMarker(true)}
                            onDrag={(e) => updateSquare(0, e.nativeEvent.coordinate)}
                            onDragEnd={(e) => {
                                updateSquare(0, e.nativeEvent.coordinate);
                                setIsDraggingMarker(false);
                            }}
                        >
                            <Icon name={"pencil"} type='material-community' size={40} color={isDraggingMarker ? "red" : "#ffae00ff"} />
                        </Marker>
                    </>
                );
            case 'triangle':
                return (
                    <>
                        {/* Triângulo */}
                        <Polygon
                            coordinates={forms.coordinates}
                            strokeColor={isDraggingMarker ? 'rgba(255, 0, 0, 1)' : 'rgba(255, 255, 0, 1)'}
                            fillColor='rgba(255, 255, 255, 0.25)'
                            strokeWidth={2}
                        />

                        {/* Vértices arrastáveis */}
                        {forms.coordinates.map((v, i) => (
                            <Marker
                                key={`vertex-${i}`}
                                anchor={{ x: -0.0, y: 0.85 }}
                                coordinate={v}
                                draggable
                                pinColor="blue"
                                onDragStart={() => setIsDraggingMarker(true)}
                                onDrag={(e) => updateTriangle(i, e.nativeEvent.coordinate)}
                                onDragEnd={(e) => {
                                    updateTriangle(i, e.nativeEvent.coordinate)
                                    setIsDraggingMarker(false);
                                }}
                            >
                                <Icon name={"pencil"} type='material-community' size={40} color={isDraggingMarker ? "red" : "#ffae00ff"} />
                            </Marker>
                        ))}
                    </>
                );
            default:
                return null;
        }
    }

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
                mapType={layer}
                onPress={clickOnMap}
                showsUserLocation
                onUserLocationChange={userMoves}
            >
                {forms && forms.coordinates.length > 0 && renderForms()}
            </MapView>
            <ReturnButton />
            <ButtomMap
                userAction={centerUser}
                layerSelected={layer => changeLayer(layer)}
                trashAction={clearData}
            />
            <FormsButton onSelectedForms={(form: 'circle' | 'square' | 'triangle') => setForms({ type: form, coordinates: [], area: 0 })} />
            {forms && forms.area && <BottomSheet title="Área" value={forms.area.toFixed(2).toString() + ' m²'} />}
        </View>
    );
}

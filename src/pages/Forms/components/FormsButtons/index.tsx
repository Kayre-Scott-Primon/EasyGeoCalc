import { Icon } from "@rneui/themed";
import { TouchableOpacity, View } from "react-native";
import { stylesCollections } from "./styles";
import { useState } from "react";

type Props = {
    onSelectedForms: (form: 'circle' | 'square' | 'triangle') => void;
}

export default function FormsButton({ onSelectedForms }: Props) {

    const styles = stylesCollections();

    const [selectedFormsType, setSelectedFormsType] = useState<'circle' | 'square' | 'triangle'>();

    return (
        <View style={styles.containerForms}>
            <TouchableOpacity onPress={() => {
                onSelectedForms('circle');
                setSelectedFormsType('circle');
            }}>
                <Icon
                    name={selectedFormsType === 'circle' ? 'circle' : 'circle-outline'}
                    type='material-community'
                    size={23}
                    color={'#008cffff'}
                    style={{ marginVertical: 8, padding: 5 }}
                    borderRadius={5}
                    backgroundColor={selectedFormsType === 'circle' ? 'rgba(255, 255, 255, 0.25)' : 'transparent'}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                onSelectedForms('square');
                setSelectedFormsType('square');
            }}>
                <Icon
                    name={selectedFormsType === 'square' ? 'square' : 'square-outline'}
                    type='material-community'
                    size={23}
                    color={'#008cffff'}
                    style={{ marginVertical: 8, padding: 5 }}
                    borderRadius={5}
                    backgroundColor={selectedFormsType === 'square' ? 'rgba(255, 255, 255, 0.25)' : 'transparent'}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                onSelectedForms('triangle');
                setSelectedFormsType('triangle');
            }}>
                <Icon
                    name={selectedFormsType === 'triangle' ? 'triangle' : 'triangle-outline'}
                    type='material-community'
                    size={23}
                    color={'#008cffff'}
                    style={{ marginVertical: 8, padding: 5 }}
                    borderRadius={5}
                    backgroundColor={selectedFormsType === 'triangle' ? 'rgba(255, 255, 255, 0.25)' : 'transparent'}
                />
            </TouchableOpacity>
        </View>
    )
}
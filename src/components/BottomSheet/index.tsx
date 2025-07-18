import { Text, View } from 'react-native';
import { stylesCollections } from './styles';

type BottomSheetProps = {
  title: string;
  value?: number;
  unit?: string;
};

export default function BottomSheet({ title, value, unit }: BottomSheetProps) {
  const styles = stylesCollections();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {title}: {value} {unit}
      </Text>
    </View>
  );
}

import { Text, View } from 'react-native';
import { stylesCollections } from './styles';

type BottomSheetProps = {
  title: string;
  value?: string;
  description?: string;
};

export default function BottomSheet({
  title,
  value,
  description,
}: BottomSheetProps) {
  const styles = stylesCollections();
  return (
    <View
      style={[
        styles.container,
        { flexDirection: description ? 'column' : 'row' },
      ]}
    >
      <Text style={styles.title}>
        {title}: {value}
      </Text>
      {description && <Text style={styles.description}>{description}</Text>}
    </View>
  );
}

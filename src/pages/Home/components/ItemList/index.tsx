import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import { stylesCollections } from './styles';

type Props = {
  title: string;
} & TouchableOpacityProps;

export default function ItemList({ title, ...rest }: Props) {
  const styles = stylesCollections();

  return (
    <TouchableOpacity style={styles.container} {...rest}>
      {/* images */}
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

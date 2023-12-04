import { Text, View, Button } from 'react-native';
import { Link, useRouter } from 'expo-router';
import DeleteBtn from './deleteBtn';

interface MyProps {
  festival: {
    _id: string;
    title: string;
    city: string;
  };
  onDelete?: (id?: string) => void;
}

export default function FestivalItem({ festival, onDelete }: MyProps) {
  const router = useRouter();
  return (
    <View>
      <Link
        href={{
          pathname: '/festivals/[id]',
          params: { id: festival._id },
        }}
      >
        {festival.title}
      </Link>
      <Text>{festival.city}</Text>
      <Button
        title="Edit"
        onPress={() => router.push(`/festivals/${festival._id}/edit`)}
      />
      <DeleteBtn
        resource="festivals"
        id={festival._id}
        deleteCallback={onDelete}
      />
      <Text>_____________</Text>
    </View>
  );
}

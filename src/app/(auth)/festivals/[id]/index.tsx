import axios from 'axios';
import { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useSession } from '../../../../contexts/AuthContext';

export default function Page() {
  const { session, isLoading } = useSession();
  const [festival, setFestival] = useState<any>(null);
  const [error, setError] = useState("");
  const { id } = useLocalSearchParams();

  useEffect(() => {
    axios.get(`https://festivals-api.vercel.app/api/festivals/${id}`, {
      headers: {
        Authorization: `Bearer ${session}`
      }
    })
        .then(response => {
          console.log(response.data);
          setFestival(response.data);
        })
        .catch(e => {
            console.error(e);
            setError(e.response.data.message);
        });
  }, []);

  if(isLoading) return <Text>Loading...</Text>;

  if(!festival) return <Text>{error}</Text>;


  return (
    <>
        <Text>{festival.title}</Text>
        <Text>{error}</Text>
    </>
  );
}
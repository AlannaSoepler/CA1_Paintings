import { useEffect, useState } from 'react';
import axios from 'axios';
import { Text, FlatList, Button } from 'react-native';
import { Link, useRouter } from 'expo-router';
import FestivalItem from '../../../components/FestivalItem';

export default function Page() {
  const [festivals, setFestivals] = useState([]);

  useEffect(() => {
    axios
      .get('https://festivals-api.vercel.app/api/festivals')
      .then((response) => {
        console.log(response.data);
        setFestivals(response.data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  const onDelete = (id?: string) => {
    let newFestivals = festivals.filter((festival: any) => festival._id !== id);
    setFestivals(newFestivals);
  };

  let festivalsList = festivals.map((festival: any) => {
    return <FestivalItem key={festival._id} festival={festival} onDelete={onDelete}/>;
  });


  return (
    <>
      {/* <Text>This is the view all festivals page</Text> */}

      {festivalsList}

      {/* <FlatList
        data={festivals}
        renderItem={({item}) => <Item title={item.title} />}
        keyExtractor={item => item.id}
      /> */}
    </>
  );
}

import axios from 'axios';
import { useEffect, useState } from 'react';
import { TextInput, StyleSheet, Button, Text } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSession } from '../../../../contexts/AuthContext';
import { FestivalType } from '../../../../types';

export default function Page() {
  const { session, isLoading } = useSession();
  const [festival, setFestival] = useState<any>(null);
  const [error, setError] = useState("");
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [form, setForm] = useState<FestivalType>({
    title: "",
    description: "",
    city: "",
    start_date: "",
    end_date: ""
  });

  useEffect(() => {
    axios.get(`https://festivals-api.vercel.app/api/festivals/${id}`, {
      headers: {
        Authorization: `Bearer ${session}`
      }
    })
        .then(response => {
          console.log(response.data);
          setFestival(response.data);
          setForm(response.data);
        })
        .catch(e => {
            console.error(e);
            setError(e.response.data.message);
        });
  }, []);

  if(isLoading) return <Text>Loading...</Text>;

  if(!festival) return <Text>{error}</Text>;


  const handleChange = (e: any) => {
        setForm(prevState => ({
            ...prevState,
            [e.target.id]: e.target.value
        }));
    };

    const handleClick = () => {
        console.log(form);

        axios.put(`https://festivals-api.vercel.app/api/festivals/${id}`, form, {
            headers: {
                Authorization: `Bearer ${session}`
            }
        })
             .then(response => {
                console.log(response.data);
                router.push(`/festivals/${id}`);  
             })
             .catch(e => {
                console.error(e);
                setError(e.response.data.message);
             });

        // axios.put(`https://festivals-api.vercel.app/api/festivals/${id}`, form, {
        //     headers: {
        //         Authorization: `Bearer ${session}`
        //     }
        // })
        //     .then(response => {
        //         console.log(response.data);
        //         setFestival(response.data);
        //     })
        //     .catch(e => {
        //         console.error(e);
        //         setError(e.response.data.message);
        //     });
    };

  return (
    <>
        <Text>Title</Text>
        <TextInput 
            style={styles.input}
            placeholder='Title'
            onChange={handleChange}
            value={form.title}
            id="title"
        />

        <Text>Description</Text>
        <TextInput 
            style={styles.input}
            placeholder='Description'
            onChange={handleChange}
            value={form.description}
            id="description"
        />

        <Text>City</Text>
        <TextInput 
            style={styles.input}
            placeholder='City'
            onChange={handleChange}
            value={form.city}
            id="city"
        />

        <Text>Start Date</Text>
        <TextInput 
            style={styles.input}
            placeholder='Start Date'
            onChange={handleChange}
            value={form.start_date}
            id="start_date"
        />

        <Text>End Date</Text>
        <TextInput 
            style={styles.input}
            placeholder='End Date'
            onChange={handleChange}
            value={form.end_date}
            id="end_date"
        />

        <Text>{error}</Text>
        
        <Button
            onPress={handleClick}
            title="Submit"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
        />
    </>
  );
}

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });
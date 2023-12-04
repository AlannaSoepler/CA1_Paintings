import React from 'react';
import axios from 'axios';
import { Button } from 'react-native';
import { useSession } from '../contexts/AuthContext';
import { useState } from 'react';

interface DeleteBtnProps {
  resource: string;
  id: string;
  deleteCallback?: (id?: string) => void;
}
export default function DeleteBtn({
  resource,
  id,
  deleteCallback,
}: DeleteBtnProps) {
  const [deleting, setDeleting] = useState(false);
  const { session } = useSession();
  const handleDelete = () => {
    axios
      .delete(`https://festivals-api.vercel.app/api/${resource}/${id}`, {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        if (deleteCallback) {
          deleteCallback(id);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };
  return (
    <Button
      title={deleting ? 'Deleting...' : 'Delete'}
      onPress={handleDelete}
      color="#ff0000"
    />
  );
}

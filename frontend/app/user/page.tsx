"use client"
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import PatientLayout from '@/components/PatientLayout';

type User = {
  u_id: number;
  u_name: string;
  u_email: string;
  u_role: string;
  status: string;
};

const UserSearchForm: React.FC = () => {
  const { register, watch } = useForm();
  const [userData, setUserData] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(false);

  // Watching values
  const id = watch('id');
  const name = watch('name');

  useEffect(() => {
    const fetchData = async () => {
      if (id && name) {
        setLoading(true);
        try {
          const uuresponse = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/auth/user`, {
            params: { id, name },
            withCredentials: true,
          });
          if (uuresponse.data.length > 0) {
            setUserData(uuresponse.data);
          } else {
            setUserData(null); // No data found
          }
        } catch (error) {
          setUserData(null); // Error or no data
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [id, name]);

  return (
    <PatientLayout>
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">User Search</h2>
      
      <form className="space-y-4">
        <div>
          <label className="block mb-1 font-medium text-gray-700">ID</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register('id')}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register('name')}
          />
        </div>
      </form>

      {loading ? (
        <p className="mt-4 text-center text-gray-500">Loading...</p>
      ) : userData ? (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">User Data</h3>
          {userData.map((user) => (
            <div key={user.u_id} className="p-4 border rounded mb-2">
              <p><strong>ID:</strong> {user.u_id}</p>
              <p><strong>Name:</strong> {user.u_name}</p>
              <p><strong>Email:</strong> {user.u_email}</p>
              <p><strong>Role:</strong> {user.u_role}</p>
              <p><strong>Status:</strong> {user.status}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-4 text-center text-gray-500">No data</p>
      )}
    </div>
    </PatientLayout>
  );
};

export default UserSearchForm;
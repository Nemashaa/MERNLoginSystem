// components/Dashboard.tsx
import React from 'react';
import useAuthStore from "../store/authStore";
import { useFetchData } from '../hooks/useFetchData';

// Define Post type (ensure it matches the one in useFetchData.ts)
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// Define User type
interface User {
  id: string;
  name: string;
  email: string;
}

export default function Dashboard() {
  const { user }: { user: User | null } = useAuthStore();
  const { data: posts, isLoading, isError } = useFetchData();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      {!!user && (<h1>Hi {user.name}!</h1>)}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>
          {posts?.map((post: Post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.body}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

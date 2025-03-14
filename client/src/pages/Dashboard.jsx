import React from 'react';
import useAuthStore from "../store/authStore";
import { useFetchData } from '../hooks/useFetchData';

export default function Dashboard() {
  const { user } = useAuthStore();
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
          {posts.map(post => (
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
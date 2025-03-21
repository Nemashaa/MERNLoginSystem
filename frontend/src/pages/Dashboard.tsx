import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import useAuthStore from "../store/authStore";
import { useFetchData } from '../hooks/useFetchData';
import '../styles/Dashboard.css';

// Define Post type
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export default function Dashboard() {
  const { user } = useAuthStore();
  const { data: posts, isLoading, isError } = useFetchData();
  const navigate = useNavigate();

  // Redirect to login if user is null
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (isLoading) {
    return <MainLayout><div>Loading...</div></MainLayout>;
  }

  if (isError) {
    return <MainLayout><div>Error loading data</div></MainLayout>;
  }

  return (
    <MainLayout>
      <div className="dashboard-page">
        <h1>Dashboard</h1>
        {user && <h2>Hi {user.name}!</h2>} {/* Only render if user exists */}
        <table className="dashboard-table">
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
    </MainLayout>
  );
}

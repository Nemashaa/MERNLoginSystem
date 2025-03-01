// pages/Dashboard.jsx
import useAuthStore from "../store/authStore";


export default function Dashboard() {
  const { user } = useAuthStore();

  return (
    <div>
      <h1>Dashboard</h1>
      {!!user && (<h1>Hi {user.name}!</h1>)}
    </div>
  );
}
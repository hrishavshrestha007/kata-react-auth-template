import { useAuth } from "../context/authContext";

export default function Home() {
    const { logout } = useAuth()
    return (
        <div className="container mt-5">
            <h1>Welcome to the Home Page!</h1>
            <button className="btn btn-primary mt-3" onClick={logout}>Logout</button>
        </div>
    )
}

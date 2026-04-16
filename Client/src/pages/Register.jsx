import { useState } from 'react'
import { useAuth } from '../context/authContext'
import { useNavigate } from 'react-router-dom'

export default function Register() {
    const { register } = useAuth()
    const navigate = useNavigate()

    const [userData, setUserData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [error, setError] = useState(null)

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await register(userData)
            navigate("/login")
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="container mt-5">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" value={userData.email} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={userData.password} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" value={userData.confirmPassword} onChange={handleChange} required />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}

                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    )
}
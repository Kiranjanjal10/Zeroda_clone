import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { register as registerService } from '../services/authService';
import toast from 'react-hot-toast';
import { FiArrowLeft } from 'react-icons/fi';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await registerService(name, email, password);
      login(data.data, data.data.token);
      toast.success('Account created successfully');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-primary-bg px-4 relative">
      <Link to="/" className="absolute top-6 left-6 text-primary-textMuted hover:text-primary-text flex items-center transition-colors">
        <FiArrowLeft className="mr-2" /> Back to Home
      </Link>
      <div className="max-w-md w-full bg-primary-card p-8 rounded-lg shadow-lg border border-primary-border">
        <h2 className="text-3xl font-bold text-center text-primary-text mb-6">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary-textMuted">Full Name</label>
            <input 
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full px-3 py-2 bg-primary-bg border border-primary-border rounded-md text-primary-text focus:outline-none focus:border-trade-green"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-textMuted">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-3 py-2 bg-primary-bg border border-primary-border rounded-md text-primary-text focus:outline-none focus:border-trade-green"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-textMuted">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-3 py-2 bg-primary-bg border border-primary-border rounded-md text-primary-text focus:outline-none focus:border-trade-green"
              placeholder="••••••••"
              minLength="6"
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-trade-green text-white py-2 px-4 rounded-md font-semibold hover:bg-green-600 transition-colors disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-primary-textMuted">
          Already have an account? <Link to="/login" className="text-trade-green hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { UserPlus } from 'lucide-react';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      return setError('Password must be at least 6 characters');
    }

    try {
      await signup(email, password);
      alert("Registration Successful! Please check your email for verification.");
      navigate('/login'); 
    } catch (err) {
      setError(err.message || 'Failed to create an account');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setError('');
      await loginWithGoogle();
    } catch (err) {
      setError('Google signup failed. Please try again.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-neon-purple rounded-2xl shadow-[0_0_20px_rgba(188,19,254,0.4)] mb-6">
            <UserPlus className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-black uppercase italic tracking-tighter dark:text-white">
            Join <span className="text-neon-purple neon-glow-text">ProCV</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Create your account to start building</p>
        </div>

        <div className="bg-white/80 dark:bg-slate-900/50 backdrop-blur-xl p-8 rounded-[32px] border border-slate-200 dark:border-neon-purple/10 shadow-[0_0_40px_rgba(0,0,0,0.1)] dark:shadow-[0_0_40px_rgba(188,19,254,0.05)]">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-widest p-4 rounded-xl mb-6 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input 
              label="Email Address"
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
            <Input 
              label="Password (Min 6 chars)"
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
            
            <Button type="submit" variant="secondary" className="w-full py-4 text-xs" icon={UserPlus}>
              Create Account
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase font-black tracking-widest">
              <span className="px-4 bg-white dark:bg-[#0f172a] text-slate-400">Or sign up with</span>
            </div>
          </div>

          <Button 
            onClick={handleGoogleLogin}
            variant="outline"
            className="w-full py-4 text-xs border-slate-200 dark:border-slate-800"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-4 h-4 mr-3" alt="Google" />
            Google Account
          </Button>

          <p className="mt-8 text-center text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
            Already have an account? <Link to="/login" className="text-neon-purple hover:underline decoration-2 underline-offset-4">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

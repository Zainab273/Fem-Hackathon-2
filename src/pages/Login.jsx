import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { FileText, LogIn } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setError('');
      await login(email, password);
      navigate('/dashboard'); 
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setError('');
      await loginWithGoogle();
    } catch (err) {
      setError('Google login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-neon-cyan rounded-2xl shadow-[0_0_20px_rgba(0,242,255,0.4)] mb-6">
            <FileText className="w-8 h-8 text-slate-950" />
          </div>
          <h2 className="text-3xl font-black uppercase italic tracking-tighter dark:text-white">
            Welcome <span className="text-neon-cyan neon-glow-text">Back</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Log in to continue building your CV</p>
        </div>

        <div className="bg-white/80 dark:bg-slate-900/50 backdrop-blur-xl p-8 rounded-[32px] border border-slate-200 dark:border-neon-cyan/10 shadow-[0_0_40px_rgba(0,0,0,0.1)] dark:shadow-[0_0_40px_rgba(0,242,255,0.05)]">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-widest p-4 rounded-xl mb-6 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <Input 
              label="Email Address"
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
            <Input 
              label="Password"
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
            
            <Button type="submit" variant="primary" className="w-full py-4 text-xs" icon={LogIn}>
              Log In to account
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase font-black tracking-widest">
              <span className="px-4 bg-white dark:bg-[#0f172a] text-slate-400">Or continue with</span>
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
            Don't have an account? <Link to="/signup" className="text-neon-cyan hover:underline decoration-2 underline-offset-4">Create Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', password: '', role: 'USER' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? 'login' : 'signup';
    try {
      const res = await fetch(`http://localhost:8081/api/auth/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        const user = await res.json();
        localStorage.setItem('user', JSON.stringify(user));
        navigate(user.role === 'ADMIN' ? '/admin' : '/');
      } else {
        const err = await res.text();
        alert(`Error: ${err}`);
      }
    } catch (err) {
      alert("Network error connecting to server.");
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 80px)', background: "url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070') center/cover" }}>
      <div className="glass-panel" style={{ width: '400px', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '30px', fontSize: '2rem' }}>{isLogin ? 'Sign In' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input type="text" required value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" required value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
          </div>
          {!isLogin && (
            <div className="form-group">
              <label>Role</label>
              <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
          )}
          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '10px' }}>
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <p className="mt-4" style={{ color: 'var(--text-muted)' }}>
          {isLogin ? "New to CineMax? " : "Already have an account? "}
          <span style={{ color: 'var(--primary)', cursor: 'pointer' }} onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Sign up now." : "Sign in."}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Auth;

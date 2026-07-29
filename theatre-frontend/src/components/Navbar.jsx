import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 50px',
      background: 'rgba(20, 20, 20, 0.8)',
      backdropFilter: 'blur(10px)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{
        fontSize: '1.8rem',
        fontWeight: '800',
        color: 'var(--primary)',
        textTransform: 'uppercase',
        letterSpacing: '2px'
      }}>
        CineMax
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 500 }}>Home</Link>
        
        {user ? (
          <>
            {user.role === 'ADMIN' && (
              <Link to="/admin" style={{ color: 'white', textDecoration: 'none', fontWeight: 500 }}>Admin Dashboard</Link>
            )}
            <span style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <User size={18} /> Welcome, {user.username}
            </span>
            <button className="btn-primary" onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <LogOut size={16} /> Logout
            </button>
          </>
        ) : (
          <Link to="/auth" className="btn-primary" style={{ textDecoration: 'none' }}>Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

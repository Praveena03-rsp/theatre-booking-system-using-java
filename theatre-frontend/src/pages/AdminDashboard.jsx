import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [snacks, setSnacks] = useState([]);
  const [newMovie, setNewMovie] = useState({ title: '', language: '', imageUrl: '', description: '' });
  const [newShowtime, setNewShowtime] = useState({ movieId: '', date: '', time: '' });
  const [newSnack, setNewSnack] = useState({ category: '', name: '', variant: '', price: 0, stockQuantity: 0 });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'ADMIN') {
      alert("Unauthorized Access!");
      navigate('/');
      return;
    }
    fetchData();
  }, [navigate]);

  const fetchData = () => {
    fetch('http://localhost:8081/api/user/movies').then(res => res.json()).then(setMovies);
    fetch('http://localhost:8081/api/user/snacks').then(res => res.json()).then(setSnacks);
  };

  const handleAddMovie = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:8081/api/admin/movie', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newMovie)
    });
    alert("Movie Added!");
    setNewMovie({ title: '', language: '', imageUrl: '', description: '' });
    fetchData();
  };

  const handleAddShowtime = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:8081/api/admin/showtime', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify({ movie: { id: newShowtime.movieId }, date: newShowtime.date, time: newShowtime.time })
    });
    alert("Showtime Added and 50 Seats Generated!");
    setNewShowtime({ movieId: '', date: '', time: '' });
  };

  const handleAddSnack = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:8081/api/admin/snack', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newSnack)
    });
    alert("Snack Added!");
    setNewSnack({ category: '', name: '', variant: '', price: 0, stockQuantity: 0 });
    fetchData();
  };

  const updateStock = async (id, currentVal) => {
    const val = prompt("Enter new stock quantity:", currentVal);
    if (val) {
      await fetch(`http://localhost:8081/api/admin/snack/${id}/stock?quantity=${val}`, { method: 'PUT' });
      fetchData();
    }
  };

  return (
    <div style={{ padding: '50px 10%', maxWidth: '1400px', margin: 'auto' }}>
      <div className="glass-panel mb-2">
        <h2 className="mb-2">Add New Movie</h2>
        <form onSubmit={handleAddMovie} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div className="form-group"><label>Title</label><input type="text" required value={newMovie.title} onChange={e => setNewMovie({...newMovie, title: e.target.value})} /></div>
          <div className="form-group"><label>Language</label><input type="text" required value={newMovie.language} onChange={e => setNewMovie({...newMovie, language: e.target.value})} /></div>
          <div className="form-group"><label>Image URL</label><input type="text" required value={newMovie.imageUrl} onChange={e => setNewMovie({...newMovie, imageUrl: e.target.value})} /></div>
          <div className="form-group"><label>Description</label><input type="text" required value={newMovie.description} onChange={e => setNewMovie({...newMovie, description: e.target.value})} /></div>
          <button type="submit" className="btn-primary" style={{ gridColumn: 'span 2' }}>Add Movie</button>
        </form>
      </div>

      <div className="glass-panel mb-2">
        <h2 className="mb-2">Schedule Showtime</h2>
        <form onSubmit={handleAddShowtime} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div className="form-group">
            <label>Select Movie</label>
            <select required value={newShowtime.movieId} onChange={e => setNewShowtime({...newShowtime, movieId: e.target.value})}>
              <option value="">-- Select --</option>
              {movies.map(m => <option key={m.id} value={m.id}>{m.title}</option>)}
            </select>
          </div>
          <div className="form-group"><label>Date</label><input type="date" required value={newShowtime.date} onChange={e => setNewShowtime({...newShowtime, date: e.target.value})} /></div>
          <div className="form-group"><label>Time</label><input type="time" required value={newShowtime.time} onChange={e => setNewShowtime({...newShowtime, time: e.target.value})} /></div>
          <button type="submit" className="btn-primary" style={{ gridColumn: 'span 2' }}>Add Showtime</button>
        </form>
      </div>

      <div className="glass-panel">
        <h2 className="mb-2">Manage Snacks</h2>
        <form onSubmit={handleAddSnack} style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '15px', marginBottom: '30px', alignItems: 'end' }}>
          <div className="form-group mb-0"><label>Category</label><input type="text" required value={newSnack.category} onChange={e => setNewSnack({...newSnack, category: e.target.value})} /></div>
          <div className="form-group mb-0"><label>Name</label><input type="text" required value={newSnack.name} onChange={e => setNewSnack({...newSnack, name: e.target.value})} /></div>
          <div className="form-group mb-0"><label>Variant</label><input type="text" required value={newSnack.variant} onChange={e => setNewSnack({...newSnack, variant: e.target.value})} /></div>
          <div className="form-group mb-0"><label>Price (₹)</label><input type="number" required value={newSnack.price} onChange={e => setNewSnack({...newSnack, price: Number(e.target.value)})} /></div>
          <div className="form-group mb-0"><label>Stock</label><input type="number" required value={newSnack.stockQuantity} onChange={e => setNewSnack({...newSnack, stockQuantity: Number(e.target.value)})} /></div>
          <button type="submit" className="btn-primary" style={{ gridColumn: 'span 5' }}>Add Snack</button>
        </form>

        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr>
              <th style={{ padding: '15px', background: 'var(--surface-light)', color: 'var(--primary)', textAlign: 'left' }}>Category</th>
              <th style={{ padding: '15px', background: 'var(--surface-light)', color: 'var(--primary)', textAlign: 'left' }}>Name</th>
              <th style={{ padding: '15px', background: 'var(--surface-light)', color: 'var(--primary)', textAlign: 'left' }}>Variant</th>
              <th style={{ padding: '15px', background: 'var(--surface-light)', color: 'var(--primary)', textAlign: 'left' }}>Price</th>
              <th style={{ padding: '15px', background: 'var(--surface-light)', color: 'var(--primary)', textAlign: 'left' }}>Stock</th>
              <th style={{ padding: '15px', background: 'var(--surface-light)', color: 'var(--primary)', textAlign: 'left' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {snacks.map(s => (
              <tr key={s.id} style={{ borderBottom: '1px solid var(--surface-light)' }}>
                <td style={{ padding: '15px' }}>{s.category}</td>
                <td style={{ padding: '15px' }}>{s.name}</td>
                <td style={{ padding: '15px' }}>{s.variant}</td>
                <td style={{ padding: '15px' }}>₹{s.price}</td>
                <td style={{ padding: '15px' }}>{s.stockQuantity}</td>
                <td style={{ padding: '15px' }}>
                  <button className="btn-primary" style={{ padding: '5px 10px', fontSize: '0.8rem' }} onClick={() => updateStock(s.id, s.stockQuantity)}>Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;

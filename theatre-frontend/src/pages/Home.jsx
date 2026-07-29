import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const slides = [
    { title: 'Leo', desc: 'Action packed thriller featuring Vijay.', img: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2025' },
    { title: 'Jailer', desc: 'Superstar Rajinikanth returns in a mass entertainer.', img: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=2070' },
    { title: 'Vikram', desc: 'Kamal Haasan leads an ensemble cast in this high-octane spy thriller.', img: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=2070' }
  ];

  useEffect(() => {
    fetch('http://localhost:8081/api/user/movies')
      .then(res => res.json())
      .then(data => setMovies(data))
      .catch(err => console.error(err));

    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div>
      {/* Hero Section */}
      <header style={{ position: 'relative', height: '70vh', overflow: 'hidden' }}>
        <div style={{
          display: 'flex', width: '100%', height: '100%',
          transform: `translateX(-${currentSlide * 100}%)`,
          transition: 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)'
        }}>
          {slides.map((s, i) => (
            <div key={i} style={{
              minWidth: '100%', height: '100%', backgroundSize: 'cover', backgroundPosition: 'center',
              backgroundImage: `url('${s.img}')`, position: 'relative'
            }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                background: 'linear-gradient(to top, var(--background) 0%, rgba(20, 20, 20, 0.4) 100%)'
              }}></div>
              <div style={{ position: 'absolute', bottom: '20%', left: '10%', zIndex: 10, maxWidth: '600px' }}>
                <h1 style={{ fontSize: '4rem', marginBottom: '15px', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>{s.title}</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '25px' }}>{s.desc}</p>
                <button className="btn-primary" onClick={() => document.getElementById('movies-section').scrollIntoView({behavior: 'smooth'})}>Book Tickets</button>
              </div>
            </div>
          ))}
        </div>
      </header>

      {/* Movies Section */}
      <section id="movies-section" style={{ padding: '50px 10%' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '30px', borderLeft: '5px solid var(--primary)', paddingLeft: '15px' }}>Now Showing</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '30px' }}>
          {movies.map(m => (
            <div key={m.id} style={{ background: 'var(--surface)', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.3s' }}
                 onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                 onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
              <img src={m.imageUrl} alt={m.title} style={{ width: '100%', height: '350px', objectFit: 'cover' }} />
              <div style={{ padding: '20px' }}>
                <h3 style={{ marginBottom: '10px', fontSize: '1.3rem' }}>
                  {m.title} <span style={{ fontSize: '0.8rem', background: 'var(--primary)', padding: '2px 6px', borderRadius: '4px' }}>{m.language}</span>
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '15px' }}>{m.description.substring(0, 100)}...</p>
                <button className="btn-primary" style={{ width: '100%' }} onClick={() => navigate(`/book/${m.id}`)}>Select Options</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;

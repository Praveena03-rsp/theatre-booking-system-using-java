import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Booking = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [showtimes, setShowtimes] = useState([]);
  const [selectedShowtime, setSelectedShowtime] = useState('');
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [snacks, setSnacks] = useState([]);
  const [selectedSnacks, setSelectedSnacks] = useState({});
  const TICKET_PRICE = 200;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      alert("Please login to book tickets.");
      navigate('/auth');
      return;
    }

    fetch(`http://localhost:8081/api/user/showtimes/${movieId}`)
      .then(res => res.json())
      .then(data => setShowtimes(data))
      .catch(console.error);

    fetch('http://localhost:8081/api/user/snacks')
      .then(res => res.json())
      .then(data => {
        setSnacks(data);
        const initSnacks = {};
        data.forEach(s => initSnacks[s.id] = { quantity: 0, price: s.price });
        setSelectedSnacks(initSnacks);
      })
      .catch(console.error);
  }, [movieId, navigate]);

  useEffect(() => {
    if (selectedShowtime) {
      fetch(`http://localhost:8081/api/user/seats/${selectedShowtime}`)
        .then(res => res.json())
        .then(data => {
          setSeats(data);
          setSelectedSeats([]);
        })
        .catch(console.error);
    }
  }, [selectedShowtime]);

  const toggleSeat = (seat) => {
    if (seat.booked) return;
    if (selectedSeats.includes(seat.id)) {
      setSelectedSeats(prev => prev.filter(id => id !== seat.id));
    } else {
      setSelectedSeats(prev => [...prev, seat.id]);
    }
  };

  const updateSnack = (id, change, maxStock) => {
    setSelectedSnacks(prev => {
      const current = prev[id].quantity;
      let newQty = current + change;
      if (newQty < 0) newQty = 0;
      if (newQty > maxStock) {
        alert(`Only ${maxStock} items available in stock.`);
        newQty = maxStock;
      }
      return { ...prev, [id]: { ...prev[id], quantity: newQty } };
    });
  };

  const handleBooking = async () => {
    if (!selectedShowtime || selectedSeats.length === 0) {
      alert("Please select a showtime and at least one seat.");
      return;
    }

    const user = JSON.parse(localStorage.getItem('user'));
    let snacksTotal = 0;
    const snackReqs = [];
    Object.keys(selectedSnacks).forEach(id => {
      const s = selectedSnacks[id];
      if (s.quantity > 0) {
        snacksTotal += s.quantity * s.price;
        snackReqs.push({ snackId: parseInt(id), quantity: s.quantity });
      }
    });

    const total = (selectedSeats.length * TICKET_PRICE) + snacksTotal;

    const payload = {
      userId: user.id,
      showtimeId: parseInt(selectedShowtime),
      seatIds: selectedSeats,
      snacks: snackReqs,
      totalPrice: total
    };

    try {
      const res = await fetch('http://localhost:8081/api/user/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const data = await res.json();
        alert(`Booking Confirmed! Booking ID: ${data.id}`);
        navigate('/');
      } else {
        const err = await res.text();
        alert("Booking Failed: " + err);
      }
    } catch (err) {
      alert("Error submitting booking.");
    }
  };

  const ticketTotal = selectedSeats.length * TICKET_PRICE;
  const snackTotal = Object.values(selectedSnacks).reduce((sum, s) => sum + (s.quantity * s.price), 0);
  const grandTotal = ticketTotal + snackTotal;

  return (
    <div style={{ padding: '50px 10%', display: 'flex', gap: '50px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ flex: 2 }}>
        <h2 className="mb-2">Select Showtime</h2>
        <div className="form-group">
          <select value={selectedShowtime} onChange={e => setSelectedShowtime(e.target.value)}>
            <option value="">-- Choose Showtime --</option>
            {showtimes.map(st => <option key={st.id} value={st.id}>{st.date} at {st.time}</option>)}
          </select>
        </div>

        <h2 className="mt-4 mb-2">Select Seats</h2>
        <div style={{ width: '100%', height: '70px', background: 'linear-gradient(to bottom, #ffffff 0%, transparent 100%)', transform: 'perspective(200px) rotateX(-5deg)', boxShadow: '0 20px 50px rgba(255,255,255,0.2)', marginBottom: '50px', borderRadius: '10px 10px 0 0' }}></div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '10px', justifyContent: 'center' }}>
          {seats.map(seat => (
            <div key={seat.id} onClick={() => toggleSeat(seat)} style={{
              width: '35px', height: '35px', borderRadius: '8px 8px 4px 4px', cursor: seat.booked ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 'bold',
              background: seat.booked ? 'var(--seat-booked)' : selectedSeats.includes(seat.id) ? 'var(--seat-selected)' : 'var(--seat-available)',
              opacity: seat.booked ? 0.5 : 1, transition: 'transform 0.2s, background 0.3s'
            }}>
              {seat.seatNumber}
            </div>
          ))}
        </div>
      </div>

      <div style={{ flex: 1 }}>
        <h2 className="mb-2">Add Snacks</h2>
        <div>
          {snacks.map(snack => (
            <div key={snack.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--surface)', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
              <div>
                <strong>{snack.name} ({snack.variant})</strong>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>₹{snack.price} | Stock: {snack.stockQuantity}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <button style={{ background: 'var(--surface-light)', color: 'white', border: 'none', width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer' }} onClick={() => updateSnack(snack.id, -1, snack.stockQuantity)}>-</button>
                <span>{selectedSnacks[snack.id]?.quantity || 0}</span>
                <button style={{ background: 'var(--surface-light)', color: 'white', border: 'none', width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer' }} onClick={() => updateSnack(snack.id, 1, snack.stockQuantity)}>+</button>
              </div>
            </div>
          ))}
        </div>

        <div className="glass-panel" style={{ marginTop: '30px', position: 'sticky', top: '100px' }}>
          <h3 className="mb-2">Booking Summary</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', color: 'var(--text-muted)' }}>
            <span>Tickets ({selectedSeats.length})</span>
            <span>₹{ticketTotal}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', color: 'var(--text-muted)' }}>
            <span>Snacks</span>
            <span>₹{snackTotal}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.5rem', fontWeight: 'bold', borderTop: '1px solid var(--surface-light)', paddingTop: '20px', marginTop: '20px' }}>
            <span>Total</span>
            <span>₹{grandTotal}</span>
          </div>
          <button className="btn-primary" style={{ width: '100%', marginTop: '20px' }} onClick={handleBooking}>Confirm Booking</button>
        </div>
      </div>
    </div>
  );
};

export default Booking;

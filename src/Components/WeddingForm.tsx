import React, { useState } from 'react';
import './WeddingForm.css';
import { db } from '../../firebase.config'; // import your configured Firestore instance
import { collection, addDoc } from 'firebase/firestore';

const WeddingForm: React.FC = () => {
  const [name, setName] = useState('');
  const [wishes, setWishes] = useState('');
  const [words, setWords] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
 
    // Here you would typically send the form data to a server
    console.log({ name, wishes, words });

      try {
      const docRef = await addDoc(collection(db, 'wedding'), {
        name, wishes, words
      });
      console.log("Document written with ID: ", docRef.id);
      setIsSubmitted(true);
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Error adding wishe.");
    }


  };
  
  const handleAddToCalendar = () => {
    const venue = 'Annaparaja Thirumana Mandapam, Theni';
    const description = 'Wedding and Engagement ceremony of Siva and Dicthya. Your presence would be greatly appreciated!';
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:Engagement of Siva & Dicthya
LOCATION:${venue}
DESCRIPTION:${description}
DTSTART:20250913T133000Z
DTEND:20250913T143000Z
END:VEVENT
BEGIN:VEVENT
SUMMARY:Wedding of Siva & Dicthya
LOCATION:${venue}
DESCRIPTION:${description}
DTSTART:20250914T000000Z
DTEND:20250915T000000Z
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Siva-Dicthya-Wedding.ics';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (isSubmitted) {
    return (
      <div className="form-container submitted-state">
        <div className="thank-you-message">
          <h2>Thank you for your warm wishes for Siva and Dicthya! ✨</h2>
          <p>Your message has been received.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="form-container">
      <div className="sparkle-animation-background"></div>
      <form onSubmit={handleSubmit} className="wedding-form">
        <h1>Wedding Wishes for <br />Siva & Dicthya</h1>
        <div className="form-group">
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="elegant-font"
          />
        </div>
        <div className="form-group">
          <label htmlFor="wishes">Wishes</label>
          <input
            type="text"
            id="wishes"
            value={wishes}
            onChange={(e) => setWishes(e.target.value)}
            placeholder="e.g., Happy Married Life"
            required
            className="elegant-font"
          />
        </div>
        <div className="form-group">
          <label htmlFor="words">Your Words</label>
          <textarea
            id="words"
            value={words}
            onChange={(e) => setWords(e.target.value)}
            rows={5}
            required
            className="elegant-font"
          ></textarea>
        </div>
        <button type="submit" className="submit-button">Send Wishes</button>
      </form>

      {/* Wedding Details Section */}
      <div className="wedding-details">
        <h2>Wedding Details</h2>
        <div className="detail-item">
          <h3>The Engagement</h3>
          <p>🗓️ Saturday, 13 September 2025</p>
          <p>⏰ 7:00 PM - 8:00 PM</p>
        </div>
        <div className="detail-item">
          <h3>The Wedding</h3>
          <p>🗓️ Sunday, 14 September 2025</p>
        </div>
        <div className="detail-item venue-details">
          <h3>Venue</h3>
          <p>📍 ANNAPARAJA THIRUMANA MANDAPAM, THENI</p>
          <p>Allinagaram, NRT Nagar, Theni, Vadaveeranaickenpatty, Tamil Nadu 625531</p>
          
          <div className="map-container">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.0469784380057!2d77.48750629999999!3d10.0129784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0714b72baf5275%3A0x36fac9e700c338f8!2sAnnaparaja%20Thirumana%20Mandapam!5e0!3m2!1sen!2sin!4v1757269519726!5m2!1sen!2sin" width="80%" height="100%" style={{border:0}} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
        
        {/* CTA Button for Calendar */}
        <button onClick={handleAddToCalendar} className="calendar-button">
          Add to my Calendar
        </button>

      </div>
    </div>
  );
};

export default WeddingForm;
import React from 'react';

function Contact() {
  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 text-primary">📬 Contact Us</h2>
      <form action="https://formsubmit.co/youremail@example.com" method="POST" className="mx-auto" style={{ maxWidth: '600px' }}>
        <input type="hidden" name="_captcha" value="false" />
        
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Your Name</label>
          <input type="text" className="form-control" name="name" required />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Your Email</label>
          <input type="email" className="form-control" name="email" required />
        </div>

        <div className="mb-3">
          <label htmlFor="message" className="form-label">Message</label>
          <textarea className="form-control" name="message" rows="4" required></textarea>
        </div>

        <button type="submit" className="btn btn-primary w-100">Send Message</button>
      </form>
    </div>
  );
}

export default Contact;

import React from 'react';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Contact = () => {
  return (
    <div className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-primary-text w-full">
      <h1 className="text-4xl font-bold mb-4 text-center text-primary-text">Support & Contact</h1>
      <p className="text-center text-primary-textMuted mb-12 text-lg">We are here to help you. Get in touch with our support team.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-blue-500/20 p-3 rounded-full text-blue-500">
              <FiPhone size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-bold text-primary-text">Call Us</h3>
              <p className="text-primary-textMuted mt-1">New accounts: 080-4719-2020</p>
              <p className="text-primary-textMuted">Support: 080-4040-2020</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-blue-500/20 p-3 rounded-full text-blue-500">
              <FiMail size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-bold text-primary-text">Email Support</h3>
              <p className="text-primary-textMuted mt-1">support@zerodhaclone.com</p>
              <p className="text-primary-textMuted">complaints@zerodhaclone.com</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 bg-blue-500/20 p-3 rounded-full text-blue-500">
              <FiMapPin size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-bold text-primary-text">Head Office</h3>
              <p className="text-primary-textMuted mt-1">
                Zerodha Clone HQ<br />
                153/154, 4th Cross, J.P Nagar 4th Phase<br />
                Bengaluru - 560078
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-primary-card p-6 rounded-lg shadow-md border border-primary-border">
          <h3 className="text-xl font-bold mb-4 text-primary-text">Send a Message</h3>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium text-primary-textMuted">Full Name</label>
              <input type="text" className="mt-1 block w-full bg-primary-bg border-primary-border rounded-md shadow-sm p-2 border text-primary-text focus:border-blue-500 focus:ring-blue-500" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary-textMuted">Email</label>
              <input type="email" className="mt-1 block w-full bg-primary-bg border-primary-border rounded-md shadow-sm p-2 border text-primary-text focus:border-blue-500 focus:ring-blue-500" placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary-textMuted">Message</label>
              <textarea rows="4" className="mt-1 block w-full bg-primary-bg border-primary-border rounded-md shadow-sm p-2 border text-primary-text focus:border-blue-500 focus:ring-blue-500" placeholder="How can we help?"></textarea>
            </div>
            <button type="button" className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded hover:bg-blue-700 transition-colors">
              Submit Ticket
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;

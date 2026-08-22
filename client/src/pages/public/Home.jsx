import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex-grow flex flex-col items-center">
      
      {/* Hero Section */}
      <section className="w-full pt-20 pb-32 px-4 sm:px-6 lg:px-8 text-center max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-semibold text-primary-text tracking-tight leading-tight mb-6">
            Invest in everything
          </h1>
          <h2 className="text-xl md:text-2xl text-primary-textMuted font-normal mb-10 max-w-2xl mx-auto leading-relaxed">
            Online platform to invest in stocks, derivatives, mutual funds, and more. Join a community of modern traders.
          </h2>
          
          <Link 
            to="/register" 
            className="inline-block bg-blue-600 text-white font-medium text-lg px-8 py-3 rounded hover:bg-blue-700 transition-colors shadow-lg"
          >
            Sign up now
          </Link>
          
          <div className="mt-20">
            <img 
              src="https://zerodha.com/static/images/landing.png" 
              alt="Trading Dashboard Preview" 
              className="w-full max-w-4xl mx-auto pointer-events-none opacity-90"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-primary-card max-w-7xl mx-auto rounded-3xl shadow-sm border border-primary-border mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-semibold text-primary-text mb-8">Trust with confidence</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-medium text-primary-text mb-2">Customer-first always</h3>
                <p className="text-primary-textMuted leading-relaxed">That's why 1.3+ crore customers trust Zerodha with ₹3.5+ lakh crores worth of equity investments.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium text-primary-text mb-2">No spam or gimmicks</h3>
                <p className="text-primary-textMuted leading-relaxed">No gimmicks, spam, "gamification", or annoying push notifications. High quality apps that you use at your pace, the way you like.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium text-primary-text mb-2">The Zerodha universe</h3>
                <p className="text-primary-textMuted leading-relaxed">Not just an app, but a whole ecosystem. Our investments in 30+ fintech startups offer you tailored services specific to your needs.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium text-primary-text mb-2">Do better with money</h3>
                <p className="text-primary-textMuted leading-relaxed">With initiatives like Nudge and Kill Switch, we don't just facilitate transactions, but actively help you do better with your money.</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <img 
              src="https://zerodha.com/static/images/ecosystem.png" 
              alt="Zerodha Ecosystem" 
              className="max-w-full h-auto"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="w-full py-24 px-4 sm:px-6 lg:px-8 mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-semibold text-primary-text mb-4">Unbeatable pricing</h2>
            <p className="text-primary-textMuted text-lg mb-6 leading-relaxed">
              We pioneered the concept of discount broking and price transparency in India. Flat fees and no hidden charges.
            </p>
            <Link to="/about" className="text-blue-500 font-medium hover:underline">See pricing &rarr;</Link>
          </div>
          
          <div className="grid grid-cols-2 gap-8 text-center">
            <div className="bg-primary-card p-8 rounded-lg shadow-sm border border-primary-border">
              <h3 className="text-4xl font-bold text-yellow-500 mb-2">₹0</h3>
              <p className="text-primary-textMuted text-sm">Free equity delivery and<br/>direct mutual funds</p>
            </div>
            <div className="bg-primary-card p-8 rounded-lg shadow-sm border border-primary-border">
              <h3 className="text-4xl font-bold text-blue-500 mb-2">₹20</h3>
              <p className="text-primary-textMuted text-sm">Intraday and F&O</p>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="w-full py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="flex justify-center">
            <img 
              src="https://zerodha.com/static/images/education.svg" 
              alt="Varsity Education" 
              className="max-w-full h-auto"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-primary-text mb-6">Free and open market education</h2>
            
            <p className="text-primary-textMuted text-lg mb-6 leading-relaxed">
              Varsity, the largest online stock market education book in the world covering everything from the basics to advanced trading.
            </p>
            <Link to="/about" className="text-blue-500 font-medium hover:underline mb-8 block">Varsity &rarr;</Link>
            
            <p className="text-primary-textMuted text-lg mb-6 leading-relaxed">
              TradingQ&A, the most active trading and investment community in India for all your market related queries.
            </p>
            <Link to="/about" className="text-blue-500 font-medium hover:underline">TradingQ&A &rarr;</Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full py-20 text-center">
        <h2 className="text-3xl font-semibold text-primary-text mb-8">Open a Zerodha Clone account</h2>
        <Link 
          to="/register" 
          className="inline-block bg-blue-600 text-white font-medium text-lg px-8 py-3 rounded hover:bg-blue-700 transition-colors shadow"
        >
          Sign up now
        </Link>
      </section>
      
    </div>
  );
};

export default Home;

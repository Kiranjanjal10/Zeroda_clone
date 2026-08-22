import React from 'react';

const About = () => {
  return (
    <div className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-primary-text">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary-text">About Zerodha Clone</h1>
      
      <div className="space-y-6 text-lg text-primary-textMuted leading-relaxed">
        <p>
          We kick-started operations with the goal of breaking all barriers that traders and investors face in India in terms of cost, support, and technology.
        </p>
        
        <p>
          Today, our disruptive pricing models and in-house technology have made us one of the biggest stock brokers in India. This platform is a powerful simulation designed to replicate the look, feel, and functionality of modern trading applications.
        </p>
        
        <p>
          Whether you are a beginner looking to understand market dynamics without risking real capital, or an experienced trader exploring UI concepts, this platform provides a zero-risk, high-fidelity environment.
        </p>
        
        <div className="bg-primary-card border-l-4 border-blue-500 p-6 mt-12 rounded shadow">
          <h3 className="text-xl font-bold text-primary-text mb-2">Educational Project</h3>
          <p className="text-primary-textMuted text-base">
            Please note that this is an educational clone and is not affiliated with the real Zerodha. All market data is simulated locally, and no real currency is used.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;

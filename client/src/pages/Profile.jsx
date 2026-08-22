import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FiUser, FiMail, FiClock, FiDollarSign } from 'react-icons/fi';

const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <div className="p-8 text-center text-xl text-primary-textMuted">Loading profile...</div>;
  }

  // Format the date if available
  const joinedDate = user.createdAt 
    ? new Date(user.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })
    : 'Unknown';

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center text-2xl font-bold text-primary-text mb-6">
        <FiUser className="mr-3 text-trade-green" /> User Profile
      </div>

      <div className="bg-primary-card rounded-lg border border-primary-border shadow-lg overflow-hidden">
        <div className="p-8 bg-primary-bg border-b border-primary-border flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-trade-border flex items-center justify-center text-4xl text-trade-green font-bold uppercase">
            {user.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-3xl font-bold text-primary-text">{user.name}</h2>
            <p className="text-primary-textMuted flex items-center mt-2">
              <FiMail className="mr-2" /> {user.email}
            </p>
          </div>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-sm text-primary-textMuted uppercase tracking-wider mb-4">Account Details</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-primary-border pb-3">
                <span className="text-primary-textMuted">Account ID</span>
                <span className="font-mono text-sm text-primary-textMuted">{user._id}</span>
              </div>
              <div className="flex justify-between items-center border-b border-primary-border pb-3">
                <span className="text-primary-textMuted flex items-center"><FiClock className="mr-2 text-trade-green"/> Member Since</span>
                <span className="text-primary-text">{joinedDate}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm text-primary-textMuted uppercase tracking-wider mb-4">Financial Overview</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-primary-border pb-3">
                <span className="text-primary-textMuted flex items-center"><FiDollarSign className="mr-2 text-trade-green"/> Available Balance</span>
                <span className="font-mono text-xl font-bold text-primary-text">₹{user.balance?.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

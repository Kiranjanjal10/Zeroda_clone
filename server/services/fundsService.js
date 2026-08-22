const User = require('../models/User');
const Transaction = require('../models/Transaction');

const depositFunds = async (userId, amount) => {
  const depositAmount = Number(amount);
  if (depositAmount <= 0) {
    throw new Error('Amount must be greater than zero');
  }

  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  user.balance += depositAmount;
  await user.save();

  const transaction = await Transaction.create({
    userId,
    type: 'DEPOSIT',
    amount: depositAmount,
    description: `Deposited virtual funds of ₹${depositAmount}`
  });

  return { balance: user.balance, transaction };
};

const withdrawFunds = async (userId, amount) => {
  const withdrawAmount = Number(amount);
  if (withdrawAmount <= 0) {
    throw new Error('Amount must be greater than zero');
  }

  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  if (user.balance < withdrawAmount) {
    throw new Error('Insufficient virtual funds for withdrawal');
  }

  user.balance -= withdrawAmount;
  await user.save();

  const transaction = await Transaction.create({
    userId,
    type: 'WITHDRAW',
    amount: withdrawAmount,
    description: `Withdrew virtual funds of ₹${withdrawAmount}`
  });

  return { balance: user.balance, transaction };
};

const getTransactions = async (userId) => {
  return await Transaction.find({ userId }).sort({ date: -1 });
};

module.exports = {
  depositFunds,
  withdrawFunds,
  getTransactions
};

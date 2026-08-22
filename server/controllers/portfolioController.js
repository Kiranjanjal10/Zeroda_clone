const portfolioService = require('../services/portfolioService');

const getPortfolio = async (req, res) => {
  try {
    const portfolio = await portfolioService.getPortfolioSummary(req.user.id);
    res.status(200).json({ success: true, data: portfolio });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getPortfolio
};

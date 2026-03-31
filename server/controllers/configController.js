const SiteConfig = require('../models/SiteConfig');

exports.getConfig = async (req, res, next) => {
  try {
    const configs = await SiteConfig.find();
    const configMap = {};
    configs.forEach(c => { configMap[c.key] = c.value; });
    res.json({ success: true, data: configMap });
  } catch (error) { next(error); }
};

exports.getConfigByKey = async (req, res, next) => {
  try {
    const config = await SiteConfig.findOne({ key: req.params.key });
    if (!config) return res.status(404).json({ success: false, message: 'Config not found' });
    res.json({ success: true, data: config });
  } catch (error) { next(error); }
};

exports.updateConfig = async (req, res, next) => {
  try {
    const { key, value, label } = req.body;
    const config = await SiteConfig.findOneAndUpdate(
      { key },
      { value, label: label || key },
      { new: true, upsert: true, runValidators: true }
    );
    res.json({ success: true, data: config });
  } catch (error) { next(error); }
};

exports.updateMultipleConfigs = async (req, res, next) => {
  try {
    const { configs } = req.body;
    const operations = configs.map(c => ({
      updateOne: { filter: { key: c.key }, update: { value: c.value, label: c.label || c.key }, upsert: true }
    }));
    await SiteConfig.bulkWrite(operations);
    const updated = await SiteConfig.find();
    const configMap = {};
    updated.forEach(c => { configMap[c.key] = c.value; });
    res.json({ success: true, data: configMap });
  } catch (error) { next(error); }
};

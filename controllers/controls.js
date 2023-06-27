const db = require('../models/transaction');
const { ObjectId } = require('mongodb');
exports.getTransaction = async (req, res, next) => {
  try {
    const transaction_detail = await db.find();
    res.status(200).json({
      success: true,
      count: transaction_detail.length,
      data: transaction_detail
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Server error"
    });
  }
};

exports.addTransaction = async (req, res, next) => {
  try {
    const { description, amount } = req.body;
    const new_transaction = await db.create({
      description: description,
      amount: amount
    });
    await new_transaction.save();
    res.status(201).json({
      success: true,
      data: new_transaction
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Server error"
    });
  }
};

exports.deleteTransaction = async (req, res, next) => {
  try {
    const objectId = new ObjectId(req.params.id);
    const data = await db.findById(objectId);
    await db.deleteOne( data )
    console.log(data);
    res.json({
        success: true
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Server error"
    });
  }
};

exports.updateTransaction = async (req, res, next) => {
  try {
    const data = await db.findById(req.params.id);
    if (data) {
      const { description, amount } = req.body;
      data.description = description;
      data.amount = amount;
      await data.save();
      res.status(200).json({
        success: true,
        data: data
      });
    } else {
      res.status(404).json({
        success: false,
        error: "No data found"
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Server error"
    });
  }
};

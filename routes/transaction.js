const express=require("express");
const {getTransaction,addTransaction,deleteTransaction,updateTransaction}=require("../controllers/controls");
const router=express.Router();
router.route('/').get(getTransaction);
router.route('/add').post(addTransaction);
router.route('/delete/:id').delete(deleteTransaction);
router.route('/update/:id').put(updateTransaction);
module.exports=router;
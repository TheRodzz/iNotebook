const express = require('express');
const router = express.Router();

router.get('/', (req,res)=>{
    res.json(['note', 'notes']);
})
module.exports = router
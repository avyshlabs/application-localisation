const express = require('express');
const router = express.Router();

const LabelService = require('../services/LabelService');

router.
route('/')
.get(async(req, res)=> {
    try{
        let id = req.query.id;
        let label = await LabelService.getLabel(id);
        if(label.Success)
            res.status(200).json(label);
        else
            res.status(500).json(label);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})
.post(async(req, res)=> {
    try{
        let details = req.body.content;
        let label = await LabelService.createLabel(details);
        if(label.Success)
            res.status(200).json(label);
        else
            res.status(500).json(label);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;


const express = require('express');
const router = express.Router();

const PageLabelService = require('../services/PageLabelService');

router.
route('/')
.get(async(req, res)=> {
    try{
        let name = req.query.name;
        let pageLabel = await PageLabelService.getPageLabel(name);
        if(pageLabel.Success)
            res.status(200).json(pageLabel);
        else
            res.status(500).json(pageLabel);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})
.post(async(req, res)=> {
    try{
        let details = req.body;
        let pageLabel = await PageLabelService.createPageLabel(details);
        if(pageLabel.Success)
            res.status(200).json(pageLabel);
        else
            res.status(500).json(pageLabel);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;


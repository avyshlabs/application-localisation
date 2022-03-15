const express = require('express');
const router = express.Router();

const PageService = require('../services/PageService');

router.
route('/')
.get(async(req, res)=> {
    try{
        let name = req.query.name;
        let page = await PageService.getPage(name);
        if(page.Success)
            res.status(200).json(page);
        else
            res.status(500).json(page);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})
.post(async(req, res)=> {
    try{
        let details = req.body;
        let page = await PageService.createPage(details.name);
        if(page.Success)
            res.status(200).json(page);
        else
            res.status(500).json(page);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;


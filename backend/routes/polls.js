var express = require('express');
var Pusher = require('pusher');

const router = express.Router()
var pusher = new Pusher({
    appId : "1029738",
    key : "ae4e4ae9c1f3e842a401",
    secret : "68e01218a30464d5dcca",
    cluster : "ap2",
});

router.route('/').post((req, res, next) => {
    pusher.trigger('poll','vote', {
        points: 1,
        option: req.body.option
    });
    res.send('Voted');
});
router.route('/timer').post((req,res) => {
    if(req.body.timer === 'start'){
        pusher.trigger('timer','start', {
            timer: 'start'
        });
        res.send('started');
    } else {
        pusher.trigger('timer','start', {
            timer: 'stop'
        });
    }
    
})
module.exports = router;

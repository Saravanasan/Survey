var express = require('express');
var Pusher = require('pusher');

const router = express.Router()
var pusher = new Pusher({
    appId : "API_ID",
    key : "API_KEY",
    secret : "SECRET_KEY",
    cluster : "CLUSTER",
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

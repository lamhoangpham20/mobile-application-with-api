const express = require('express');
const passport = require('passport');
const router = express.Router();

//Middleware function
function isUserAuthenticated(req, res, next) {
    console.log(req.user);
    if (req.user) {
        next();
    } else {
        res.send('You must login!');
    }
}
// google log in
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('/auth');
    // res.redirect('http://localhost:3000');
});

//facebook log in
router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/redirect', passport.authenticate('facebook'), (req, res) => {

    res.redirect('/auth');
});

//github log in
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github/callback', passport.authenticate('github'), (req, res) => {
    res.send(req.user);
});

//twitter log in
router.get('/twitter', passport.authenticate('twitter'));

router.get('/twitter/callback', passport.authenticate('twitter'), (req, res) => {
    res.send(req.user);
});

//instagram log in
router.get('/instagram', passport.authenticate('instagram'));

router.get('/instagram/callback', passport.authenticate('instagram'), (req, res) => {
    res.send(req.user);
});

router.get('/',  isUserAuthenticated, (req, res) => {
    res.json({
        success:true,
        message:"logged in",
        user : req.user
    });
    console.log(req.user);
});
router.get('/logout', (req,res) => {
    req.logout();
    res.redirect("http://localhost:3000");
}); 


module.exports = router;
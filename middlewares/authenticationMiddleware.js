module.exports = function(req, res, next) {
    // Check if the user session exists
    if (!req.session.userId) {
        // If no session exists, redirect to login
        return res.redirect('/login');
    }
    next(); // Proceed to the next middleware or route handler if logged in
};
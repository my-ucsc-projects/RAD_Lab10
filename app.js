const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'pug'); // Set your view engine (pug or ejs)

// Initialize express-session
app.use(session({
    secret: 'your-secret-key', // Change this to a strong secret key
    resave: false,
    saveUninitialized: true
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render('dashboard', { username: req.user.username });
});

// Middleware to check if a user is authenticated
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next(); // If authenticated, proceed to the next middleware or route
    }
    res.redirect('/login'); // If not authenticated, redirect to login
}

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



app.post('/register', (req, res) => {
    // Implement user registration logic using Passport's LocalStrategy
    // Replace this with your actual registration logic
    const { username, password } = req.body;
    // Store the user's credentials securely
    // Example: Create a new user in your database
    res.redirect('/login'); // Redirect to login after successful registration
});

app.post('/login',
    passport.authenticate('local', {
        successRedirect: '/dashboard', // Redirect to dashboard after successful login
        failureRedirect: '/login', // Redirect back to login page on failure
    })
);


// Passport setup
passport.use(new LocalStrategy(
    (username, password, done) => {
        // Replace this with your actual authentication logic
        if (username === 'ravindu' && password === '1234') {
            return done(null, { id: 1, username: 'ravindu' });
        } else {
            return done(null, false);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    // Replace this with your actual user retrieval logic
    done(null, { id: 1, username: 'ravindu' });
});

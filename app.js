import express from "express";
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

// Create an array to store blog posts (since you're not using a database).
const blogPosts = [];


// Routes
app.get('/', (req, res) => {
    res.render('home', { blogPosts });
});

// Add more routes for creating, editing, and deleting posts

app.get('/create', (req, res) => {
    res.render('create');
});

app.post('/create', (req, res) => {
    const { title, content } = req.body;
    const newPost = { id: Date.now(), title, content };
    blogPosts.push(newPost);
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

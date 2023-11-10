import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Create an array to store blog posts (since you're not using a database).
const blogPosts = [];


// Routes

app.get('/', (req, res) => {
    res.render('home' );
});
app.get('/list', (req, res) => {
    res.render('list', { blogPosts });
});




// Add more routes for creating, editing, and deleting posts

// Creating a specific post

app.get('/create', (req, res) => {
    res.render('create');
});


app.post('/create', (req, res) => {
    const { title, content } = req.body;
    const newPost = { id: Date.now(), title, content };
    blogPosts.push(newPost);
    res.redirect('/list');
});



// Edit a specific post
app.get('/posts/:id/edit', (req, res) => {
    const postId = parseInt(req.params.id);
    const postToEdit = blogPosts.find(post => post.id === postId);

    if (!postToEdit) {
        res.redirect('/');
    } else {
        res.render('edit', { post: postToEdit });
    }
});

app.post('/posts/:id/edit', (req, res) => {
    const postId = parseInt(req.params.id);
    const postToEdit = blogPosts.find(post => post.id === postId);

    if (!postToEdit) {
        res.redirect('/');
    } else {
        const { title, content } = req.body;
        // Update the post with the new data
        postToEdit.title = title;
        postToEdit.content = content;
        res.redirect('/');
    }
});

// Delete a specific post
app.get('/posts/:id/delete', (req, res) => {
    const postId = parseInt(req.params.id);
    const postIndex = blogPosts.findIndex(post => post.id === postId);

    if (postIndex === -1) {
        res.redirect('/');
    } else {
        // Remove the post from the array
        blogPosts.splice(postIndex, 1);
        res.redirect('/');
    }
});

// View a specific post
app.get('/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const postToView = blogPosts.find(post => post.id === postId);

    if (!postToView) {
        res.redirect('/');
    } else {
        res.render('view', { post: postToView });
    }
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

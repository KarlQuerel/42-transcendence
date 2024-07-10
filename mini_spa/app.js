document.addEventListener('DOMContentLoaded', () => {
    // Define routes
    const routes = {
        '/': () => {
            document.getElementById('app').innerHTML = '<h1>Welcome to our Pong Game!</h1>';
        },
        '/about': () => {
            document.getElementById('app').innerHTML = '<h1>About Us</h1>';
        }
    };

    // Handle route changes
    window.onpopstate = () => {
        const path = window.location.pathname;
        if (routes[path]) {
            routes[path]();
        } else {
            console.error(`No route handler for ${path}`);
        }
    };

    // Initial route
    routes['/'](); // Default route
});

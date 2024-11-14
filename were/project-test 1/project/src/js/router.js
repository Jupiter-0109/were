const routes = {
    home: () => import('./views/home.js'),
    challenges: () => import('./views/challenges.js'),
    profile: () => import('./views/profile.js')
};

export function initRouter() {
    const navigate = async (page) => {
        const view = await routes[page]();
        document.getElementById('app').innerHTML = view.default();
    };

    document.querySelectorAll('[data-page]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = e.target.dataset.page;
            navigate(page);
        });
    });

    // Initial route
    navigate('home');
}
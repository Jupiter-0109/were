import { initRouter } from './router.js';
import { initAuth } from './auth.js';
import { loadChallenges } from './challenges.js';

document.addEventListener('DOMContentLoaded', () => {
    initRouter();
    initAuth();
    loadChallenges();
});
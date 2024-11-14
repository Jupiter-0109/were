import { 
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    signOut,
    sendPasswordResetEmail,
    updateProfile
} from 'firebase/auth';
import { auth, googleProvider } from './firebase.js';

export function initAuth() {
    const authButton = document.getElementById('auth-button');
    const authModal = document.getElementById('auth-modal');
    const closeBtn = document.querySelector('.close');
    const authForms = document.getElementById('auth-forms');
    let currentUser = null;

    const showAuthModal = () => {
        authModal.style.display = 'block';
        renderAuthForm('signin');
    };

    const hideAuthModal = () => {
        authModal.style.display = 'none';
        clearErrors();
    };

    const showLoading = (form) => {
        const button = form.querySelector('button[type="submit"]');
        button.disabled = true;
        button.innerHTML = '<span class="loading"></span> Processing...';
    };

    const hideLoading = (form) => {
        const button = form.querySelector('button[type="submit"]');
        button.disabled = false;
        button.innerHTML = form.id === 'signin-form' ? 'Sign In' : 'Sign Up';
    };

    const showError = (message) => {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        authForms.insertBefore(errorDiv, authForms.firstChild);
    };

    const clearErrors = () => {
        const errors = authForms.querySelectorAll('.error-message');
        errors.forEach(error => error.remove());
    };

    const renderAuthForm = (type) => {
        const isSignIn = type === 'signin';
        authForms.innerHTML = `
            <form class="auth-form" id="${type}-form">
                <h2>${isSignIn ? 'Sign In' : 'Sign Up'}</h2>
                ${!isSignIn ? `
                    <div class="form-group">
                        <label for="name">Full Name</label>
                        <input type="text" id="name" required>
                    </div>
                ` : ''}
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" required>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" required minlength="6">
                </div>
                <button type="submit" class="btn">${isSignIn ? 'Sign In' : 'Sign Up'}</button>
                <button type="button" class="btn btn-google">
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google">
                    Continue with Google
                </button>
                ${isSignIn ? `
                    <button type="button" class="btn-link" id="forgot-password">
                        Forgot Password?
                    </button>
                ` : ''}
                <div class="auth-toggle">
                    <button type="button" id="toggle-auth">
                        ${isSignIn ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
                    </button>
                </div>
            </form>
        `;

        const form = document.getElementById(`${type}-form`);
        const googleBtn = form.querySelector('.btn-google');
        const forgotBtn = document.getElementById('forgot-password');
        const toggleBtn = document.getElementById('toggle-auth');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            clearErrors();
            showLoading(form);

            const email = form.email.value;
            const password = form.password.value;

            try {
                if (isSignIn) {
                    await signInWithEmailAndPassword(auth, email, password);
                } else {
                    const name = form.name.value;
                    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                    await updateProfile(userCredential.user, {
                        displayName: name
                    });
                }
                hideAuthModal();
            } catch (error) {
                showError(error.message);
            } finally {
                hideLoading(form);
            }
        });

        googleBtn.addEventListener('click', async () => {
            clearErrors();
            try {
                await signInWithPopup(auth, googleProvider);
                hideAuthModal();
            } catch (error) {
                showError(error.message);
            }
        });

        if (forgotBtn) {
            forgotBtn.addEventListener('click', async () => {
                const email = form.email.value;
                if (!email) {
                    showError('Please enter your email address');
                    return;
                }

                clearErrors();
                showLoading(form);
                try {
                    await sendPasswordResetEmail(auth, email);
                    showError('Password reset email sent!');
                } catch (error) {
                    showError(error.message);
                } finally {
                    hideLoading(form);
                }
            });
        }

        toggleBtn.addEventListener('click', () => {
            renderAuthForm(isSignIn ? 'signup' : 'signin');
        });
    };

    auth.onAuthStateChanged((user) => {
        currentUser = user;
        if (user) {
            authButton.textContent = 'Sign Out';
            document.querySelectorAll('.auth-required').forEach(el => {
                el.style.display = 'block';
            });
        } else {
            authButton.textContent = 'Sign In';
            document.querySelectorAll('.auth-required').forEach(el => {
                el.style.display = 'none';
            });
        }
    });

    authButton.addEventListener('click', () => {
        if (currentUser) {
            signOut(auth);
        } else {
            showAuthModal();
        }
    });

    closeBtn.addEventListener('click', hideAuthModal);

    window.addEventListener('click', (e) => {
        if (e.target === authModal) {
            hideAuthModal();
        }
    });
}
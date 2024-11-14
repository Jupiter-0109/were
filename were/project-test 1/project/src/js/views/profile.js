/*import { auth } from '../firebase.js';

export default function renderProfile() {
    const user = auth.currentUser;
    if (!user) return '<div>Please sign in to view your profile</div>';

    const initials = user.displayName
        ? user.displayName.split(' ').map(n => n[0]).join('').toUpperCase()
        : user.email[0].toUpperCase();

    const joinDate = new Date(user.metadata.creationTime).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long'
    });

    return `
        <div class="profile-section">
            <div class="profile-header">
                <div class="profile-avatar">
                    <span>${initials}</span>
                </div>
                <div class="profile-info">
                    <h2>${user.displayName || 'User'}</h2>
                    <p>Joined: ${joinDate}</p>
                    <p>Email: ${user.email}</p>
                </div>
            </div>
            <div class="profile-stats">
                <h3>Statistics</h3>
                <ul>
                    <li>Challenges Completed: 15</li>
                    <li>Win Rate: 75%</li>
                    <li>Total Points: 1,250</li>
                </ul>
            </div>
        </div>
    `;
}
*/
import { auth } from '../firebase.js';

export default function renderProfile() {
    const user = auth.currentUser;
    if (!user) {
        return `
            <div class="auth-required-message">
                <h2>Authentication Required</h2>
                <p>Please sign in to view your profile</p>
                <button class="btn" onclick="document.getElementById('auth-button').click()">Sign In</button>
            </div>
        `;
    }

    const initials = user.displayName
        ? user.displayName.split(' ').map(n => n[0]).join('').toUpperCase()
        : user.email[0].toUpperCase();

    const joinDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return `
        <div class="profile-container">
            <div class="profile-header">
                <div class="profile-avatar">
                    ${user.photoURL 
                        ? `<img src="${user.photoURL}" alt="Profile" />`
                        : `<span class="initials">${initials}</span>`
                    }
                </div>
                <div class="profile-info">
                    <h2>${user.displayName || 'Anonymous User'}</h2>
                    <p class="join-date">Member since ${joinDate}</p>
                    <p class="email">${user.email}</p>
                    <div class="profile-badges">
                        <span class="badge">Pro Coder</span>
                        <span class="badge">Early Adopter</span>
                    </div>
                </div>
            </div>

            <div class="profile-content">
                <div class="stats-card">
                    <h3>Statistics</h3>
                    <div class="stats-grid">
                        <div class="stat-item">
                            <span class="stat-value">15</span>
                            <span class="stat-label">Challenges Completed</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value">75%</span>
                            <span class="stat-label">Win Rate</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value">1,250</span>
                            <span class="stat-label">Total Points</span>
                        </div>
                    </div>
                </div>

                <div class="recent-activity">
                    <h3>Recent Activity</h3>
                    <div class="activity-list">
                        <div class="activity-item">
                            <span class="activity-icon">🏆</span>
                            <div class="activity-details">
                                <p>Completed "Array Sum Finder" challenge</p>
                                <span class="activity-time">2 hours ago</span>
                            </div>
                        </div>
                        <div class="activity-item">
                            <span class="activity-icon">⭐</span>
                            <div class="activity-details">
                                <p>Earned "Speed Demon" badge</p>
                                <span class="activity-time">1 day ago</span>
                            </div>
                        </div>
                        <div class="activity-item">
                            <span class="activity-icon">💪</span>
                            <div class="activity-details">
                                <p>Won duel against @challenger</p>
                                <span class="activity-time">2 days ago</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}
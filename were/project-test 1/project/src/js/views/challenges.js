export default function renderChallenges() {
    const challenges = window.challenges || [];
    
    return `
        <h2>Available Challenges</h2>
        <div class="challenges-grid">
            ${challenges.map(challenge => `
                <div class="challenge-card">
                    <div class="challenge-header">
                        <h3>${challenge.title}</h3>
                    </div>
                    <div class="challenge-content">
                        <p>${challenge.description}</p>
                    </div>
                    <div class="challenge-footer">
                        <span class="difficulty ${challenge.difficulty}">${challenge.difficulty}</span>
                        <div class="challenge-stats">
                            <span>${challenge.points} points</span>
                            <span>${challenge.participants} participants</span>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}
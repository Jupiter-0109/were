const mockChallenges = [
    {
        id: 1,
        title: "Array Sum Finder",
        description: "Find two numbers in an array that sum up to a target value",
        difficulty: "easy",
        points: 100,
        participants: 245
    },
    {
        id: 2,
        title: "Binary Tree Balancer",
        description: "Balance a binary search tree while maintaining its properties",
        difficulty: "medium",
        points: 250,
        participants: 142
    },
    {
        id: 3,
        title: "Dynamic Programming Master",
        description: "Solve the knapsack problem using dynamic programming",
        difficulty: "hard",
        points: 500,
        participants: 73
    }
];

export function loadChallenges() {
    window.challenges = mockChallenges;
}
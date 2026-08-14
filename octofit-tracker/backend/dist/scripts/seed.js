import mongoose from 'mongoose';
import { User, Team, Activity, Leaderboard, Workout } from '../models/index.js';
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([
            User.deleteMany({}),
            Team.deleteMany({}),
            Activity.deleteMany({}),
            Leaderboard.deleteMany({}),
            Workout.deleteMany({})
        ]);
        const users = await User.insertMany([
            { name: 'Maya Patel', email: 'maya.patel@octofit.com', team: 'Blue Falcons', streak: 14, points: 1280 },
            { name: 'Ethan Brooks', email: 'ethan.brooks@octofit.com', team: 'Red Runners', streak: 9, points: 1145 },
            { name: 'Sofia Nguyen', email: 'sofia.nguyen@octofit.com', team: 'Blue Falcons', streak: 17, points: 1360 },
            { name: 'Liam Carter', email: 'liam.carter@octofit.com', team: 'Green Cyclists', streak: 11, points: 1188 },
            { name: 'Ava Lopez', email: 'ava.lopez@octofit.com', team: 'Green Cyclists', streak: 13, points: 1215 }
        ]);
        await Team.insertMany([
            { name: 'Blue Falcons', captain: 'Maya Patel', members: 12, totalPoints: 4120 },
            { name: 'Red Runners', captain: 'Ethan Brooks', members: 10, totalPoints: 3895 },
            { name: 'Green Cyclists', captain: 'Ava Lopez', members: 9, totalPoints: 3710 }
        ]);
        await Activity.insertMany([
            { user: 'Maya Patel', type: 'Running', durationMinutes: 35, calories: 420, date: new Date('2026-08-10') },
            { user: 'Ethan Brooks', type: 'Strength', durationMinutes: 50, calories: 390, date: new Date('2026-08-11') },
            { user: 'Sofia Nguyen', type: 'Cycling', durationMinutes: 42, calories: 480, date: new Date('2026-08-12') },
            { user: 'Liam Carter', type: 'Swimming', durationMinutes: 30, calories: 340, date: new Date('2026-08-13') },
            { user: 'Ava Lopez', type: 'Yoga', durationMinutes: 28, calories: 220, date: new Date('2026-08-13') }
        ]);
        await Leaderboard.insertMany([
            { rank: 1, name: 'Sofia Nguyen', score: 1360, team: 'Blue Falcons' },
            { rank: 2, name: 'Maya Patel', score: 1280, team: 'Blue Falcons' },
            { rank: 3, name: 'Ethan Brooks', score: 1145, team: 'Red Runners' },
            { rank: 4, name: 'Ava Lopez', score: 1215, team: 'Green Cyclists' },
            { rank: 5, name: 'Liam Carter', score: 1188, team: 'Green Cyclists' }
        ]);
        await Workout.insertMany([
            { name: 'Morning HIIT', durationMinutes: 25, difficulty: 'Intermediate', focus: 'Cardio' },
            { name: 'Core Circuit', durationMinutes: 30, difficulty: 'Beginner', focus: 'Core' },
            { name: 'Bike Sprint', durationMinutes: 40, difficulty: 'Advanced', focus: 'Endurance' },
            { name: 'Mobility Flow', durationMinutes: 20, difficulty: 'Beginner', focus: 'Recovery' },
            { name: 'Power Ladder', durationMinutes: 35, difficulty: 'Advanced', focus: 'Strength' }
        ]);
        console.log('Database seeded with users, teams, activities, leaderboard, and workouts');
        console.log(`Created ${users.length} users`);
        console.log('Seed the octofit_db database with test data');
        await mongoose.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
//# sourceMappingURL=seed.js.map
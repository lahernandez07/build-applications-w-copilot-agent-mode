import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  team: { type: String, required: true, trim: true },
  streak: { type: Number, default: 0 },
  points: { type: Number, default: 0 }
});

const teamSchema = new Schema({
  name: { type: String, required: true, unique: true, trim: true },
  captain: { type: String, required: true, trim: true },
  members: { type: Number, default: 0 },
  totalPoints: { type: Number, default: 0 }
});

const activitySchema = new Schema({
  user: { type: String, required: true, trim: true },
  type: { type: String, required: true, trim: true },
  durationMinutes: { type: Number, required: true },
  calories: { type: Number, required: true },
  date: { type: Date, required: true }
});

const leaderboardSchema = new Schema({
  rank: { type: Number, required: true },
  name: { type: String, required: true, trim: true },
  score: { type: Number, required: true },
  team: { type: String, required: true, trim: true }
});

const workoutSchema = new Schema({
  name: { type: String, required: true, trim: true },
  durationMinutes: { type: Number, required: true },
  difficulty: { type: String, required: true, enum: ['Beginner', 'Intermediate', 'Advanced'] },
  focus: { type: String, required: true, trim: true }
});

export const User = (mongoose.models.User as mongoose.Model<any>) || mongoose.model<any>('User', userSchema, 'users');
export const Team = (mongoose.models.Team as mongoose.Model<any>) || mongoose.model<any>('Team', teamSchema, 'teams');
export const Activity = (mongoose.models.Activity as mongoose.Model<any>) || mongoose.model<any>('Activity', activitySchema, 'activities');
export const Leaderboard = (mongoose.models.Leaderboard as mongoose.Model<any>) || mongoose.model<any>('Leaderboard', leaderboardSchema, 'leaderboard');
export const Workout = (mongoose.models.Workout as mongoose.Model<any>) || mongoose.model<any>('Workout', workoutSchema, 'workouts');

export default {
  User,
  Team,
  Activity,
  Leaderboard,
  Workout
};

from django.test import TestCase
from .models import User, Team, Activity, Leaderboard, Workout

class UserModelTest(TestCase):
    def test_create_user(self):
        user = User.objects.create(email='test@example.com', username='testuser')
        self.assertEqual(user.username, 'testuser')

class TeamModelTest(TestCase):
    def test_create_team(self):
        team = Team.objects.create(name='Test Team')
        self.assertEqual(team.name, 'Test Team')

class ActivityModelTest(TestCase):
    def test_create_activity(self):
        user = User.objects.create(email='test2@example.com', username='testuser2')
        team = Team.objects.create(name='Test Team 2')
        activity = Activity.objects.create(user=user, team=team, activity_type='running', duration_minutes=30)
        self.assertEqual(activity.activity_type, 'running')

class LeaderboardModelTest(TestCase):
    def test_create_leaderboard(self):
        user = User.objects.create(email='test3@example.com', username='testuser3')
        team = Team.objects.create(name='Test Team 3')
        leaderboard = Leaderboard.objects.create(user=user, team=team, rank=1)
        self.assertEqual(leaderboard.rank, 1)

class WorkoutModelTest(TestCase):
    def test_create_workout(self):
        user = User.objects.create(email='test4@example.com', username='testuser4')
        workout = Workout.objects.create(user=user, title='Test Workout', workout_type='cardio', difficulty_level='beginner', duration_minutes=20)
        self.assertEqual(workout.title, 'Test Workout')

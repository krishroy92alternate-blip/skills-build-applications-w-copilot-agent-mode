from django.db import models
from django.contrib.auth.models import User as DjangoUser


class User(models.Model):
    """User model for OctoFit tracker"""
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=100, unique=True)
    first_name = models.CharField(max_length=100, blank=True)
    last_name = models.CharField(max_length=100, blank=True)
    avatar_url = models.URLField(blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'users'

    def __str__(self):
        return self.username


class Team(models.Model):
    """Team model for competitive leaderboard"""
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True, null=True)
    logo_url = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'teams'

    def __str__(self):
        return self.name


class Activity(models.Model):
    """Activity logging model"""
    ACTIVITY_TYPES = [
        ('running', 'Running'),
        ('cycling', 'Cycling'),
        ('swimming', 'Swimming'),
        ('weightlifting', 'Weightlifting'),
        ('yoga', 'Yoga'),
        ('cardio', 'Cardio'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='activities')
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='activities', blank=True, null=True)
    activity_type = models.CharField(max_length=50, choices=ACTIVITY_TYPES)
    duration_minutes = models.IntegerField()
    distance_km = models.FloatField(blank=True, null=True)
    calories_burned = models.IntegerField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'activities'

    def __str__(self):
        return f"{self.user.username} - {self.activity_type}"


class Leaderboard(models.Model):
    """Leaderboard model for team and user rankings"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='leaderboard_entries')
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='leaderboard_entries')
    total_activities = models.IntegerField(default=0)
    total_duration_hours = models.FloatField(default=0)
    total_distance_km = models.FloatField(default=0)
    total_calories_burned = models.IntegerField(default=0)
    rank = models.IntegerField()
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'leaderboard'
        unique_together = ('user', 'team')

    def __str__(self):
        return f"{self.user.username} - Rank {self.rank}"


class Workout(models.Model):
    """Personalized workout suggestions model"""
    DIFFICULTY_LEVELS = [
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='workouts')
    title = models.CharField(max_length=255)
    description = models.TextField()
    workout_type = models.CharField(max_length=50)
    difficulty_level = models.CharField(max_length=20, choices=DIFFICULTY_LEVELS)
    duration_minutes = models.IntegerField()
    calories_estimate = models.IntegerField(blank=True, null=True)
    exercises = models.JSONField(default=list, blank=True)
    recommended_for = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'workouts'

    def __str__(self):
        return self.title

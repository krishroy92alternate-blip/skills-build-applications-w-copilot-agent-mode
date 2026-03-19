from django.core.management.base import BaseCommand
from tracker.models import User, Team, Activity, Leaderboard, Workout


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Starting database population...'))

        # Delete existing data
        self.stdout.write('Deleting existing data...')
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Create teams
        self.stdout.write('Creating teams...')
        team_marvel, _ = Team.objects.get_or_create(
            name='Team Marvel',
            defaults={
                'description': 'Marvel superheroes team',
                'logo_url': 'https://example.com/marvel-logo.png'
            }
        )
        team_dc, _ = Team.objects.get_or_create(
            name='Team DC',
            defaults={
                'description': 'DC superheroes team',
                'logo_url': 'https://example.com/dc-logo.png'
            }
        )

        # Create Marvel users (superheroes)
        self.stdout.write('Creating Marvel superheroes...')
        marvel_heroes = [
            {'username': 'ironman', 'email': 'tony.stark@marvel.com', 'first_name': 'Tony', 'last_name': 'Stark'},
            {'username': 'captainamerica', 'email': 'steve.rogers@marvel.com', 'first_name': 'Steve', 'last_name': 'Rogers'},
            {'username': 'thor', 'email': 'thor.odinson@marvel.com', 'first_name': 'Thor', 'last_name': 'Odinson'},
            {'username': 'hulk', 'email': 'bruce.banner@marvel.com', 'first_name': 'Bruce', 'last_name': 'Banner'},
            {'username': 'blackwidow', 'email': 'natasha.romanoff@marvel.com', 'first_name': 'Natasha', 'last_name': 'Romanoff'},
        ]

        marvel_users = []
        for hero in marvel_heroes:
            user, _ = User.objects.get_or_create(
                username=hero['username'],
                defaults={
                    'email': hero['email'],
                    'first_name': hero['first_name'],
                    'last_name': hero['last_name'],
                    'avatar_url': f"https://example.com/avatars/{hero['username']}.png"
                }
            )
            marvel_users.append(user)

        # Create DC users (superheroes)
        self.stdout.write('Creating DC superheroes...')
        dc_heroes = [
            {'username': 'batman', 'email': 'bruce.wayne@dc.com', 'first_name': 'Bruce', 'last_name': 'Wayne'},
            {'username': 'superman', 'email': 'clark.kent@dc.com', 'first_name': 'Clark', 'last_name': 'Kent'},
            {'username': 'wonderwoman', 'email': 'diana.prince@dc.com', 'first_name': 'Diana', 'last_name': 'Prince'},
            {'username': 'flash', 'email': 'barry.allen@dc.com', 'first_name': 'Barry', 'last_name': 'Allen'},
            {'username': 'greenlantern', 'email': 'hal.jordan@dc.com', 'first_name': 'Hal', 'last_name': 'Jordan'},
        ]

        dc_users = []
        for hero in dc_heroes:
            user, _ = User.objects.get_or_create(
                username=hero['username'],
                defaults={
                    'email': hero['email'],
                    'first_name': hero['first_name'],
                    'last_name': hero['last_name'],
                    'avatar_url': f"https://example.com/avatars/{hero['username']}.png"
                }
            )
            dc_users.append(user)

        # Create activities for Marvel heroes
        self.stdout.write('Creating activities for Marvel heroes...')
        marvel_activity_data = [
            (marvel_users[0], 'running', 45, 8.5, 520),  # Iron Man running
            (marvel_users[0], 'cardio', 60, None, 600),  # Iron Man cardio
            (marvel_users[1], 'weightlifting', 90, None, 800),  # Captain America
            (marvel_users[1], 'cycling', 75, 25.0, 650),  # Captain America cycling
            (marvel_users[2], 'swimming', 60, 2.5, 550),  # Thor swimming
            (marvel_users[2], 'weightlifting', 120, None, 950),  # Thor weightlifting
            (marvel_users[3], 'yoga', 45, None, 280),  # Hulk yoga
            (marvel_users[3], 'running', 30, 5.0, 450),  # Hulk running
            (marvel_users[4], 'cardio', 50, None, 500),  # Black Widow cardio
            (marvel_users[4], 'cycling', 60, 18.0, 550),  # Black Widow cycling
        ]

        for user, activity_type, duration, distance, calories in marvel_activity_data:
            Activity.objects.get_or_create(
                user=user,
                activity_type=activity_type,
                defaults={
                    'team': team_marvel,
                    'duration_minutes': duration,
                    'distance_km': distance,
                    'calories_burned': calories,
                    'description': f'{user.first_name} completed a {activity_type} session'
                }
            )

        # Create activities for DC heroes
        self.stdout.write('Creating activities for DC heroes...')
        dc_activity_data = [
            (dc_users[0], 'running', 50, 10.0, 600),  # Batman running
            (dc_users[0], 'weightlifting', 120, None, 900),  # Batman weightlifting
            (dc_users[1], 'cardio', 45, None, 500),  # Superman cardio
            (dc_users[1], 'swimming', 90, 5.0, 700),  # Superman swimming
            (dc_users[2], 'yoga', 60, None, 350),  # Wonder Woman yoga
            (dc_users[2], 'cycling', 75, 22.0, 650),  # Wonder Woman cycling
            (dc_users[3], 'running', 60, 12.0, 650),  # Flash running
            (dc_users[3], 'cardio', 90, None, 800),  # Flash cardio
            (dc_users[4], 'cycling', 120, 40.0, 950),  # Green Lantern cycling
            (dc_users[4], 'weightlifting', 100, None, 850),  # Green Lantern weightlifting
        ]

        for user, activity_type, duration, distance, calories in dc_activity_data:
            Activity.objects.get_or_create(
                user=user,
                activity_type=activity_type,
                defaults={
                    'team': team_dc,
                    'duration_minutes': duration,
                    'distance_km': distance,
                    'calories_burned': calories,
                    'description': f'{user.first_name} completed a {activity_type} session'
                }
            )

        # Create leaderboard entries
        self.stdout.write('Creating leaderboard entries...')
        
        # Calculate stats for Marvel users
        marvel_leaderboard_data = [
            (marvel_users[0], 2, 1.75, 8.5, 1120),  # Iron Man
            (marvel_users[1], 2, 2.75, 25.0, 1450),  # Captain America
            (marvel_users[2], 2, 3.0, 2.5, 1500),  # Thor
            (marvel_users[3], 2, 1.25, 5.0, 730),  # Hulk
            (marvel_users[4], 2, 1.67, 18.0, 1050),  # Black Widow
        ]

        for rank, (user, activities_count, hours, distance, calories) in enumerate(marvel_leaderboard_data, 1):
            Leaderboard.objects.get_or_create(
                user=user,
                team=team_marvel,
                defaults={
                    'total_activities': activities_count,
                    'total_duration_hours': hours,
                    'total_distance_km': distance,
                    'total_calories_burned': calories,
                    'rank': rank
                }
            )

        # Calculate stats for DC users
        dc_leaderboard_data = [
            (dc_users[0], 2, 2.83, 10.0, 1500),  # Batman
            (dc_users[1], 2, 2.25, 5.0, 1200),  # Superman
            (dc_users[2], 2, 2.0, 22.0, 1000),  # Wonder Woman
            (dc_users[3], 2, 2.5, 12.0, 1450),  # Flash
            (dc_users[4], 2, 3.67, 40.0, 1800),  # Green Lantern
        ]

        for rank, (user, activities_count, hours, distance, calories) in enumerate(dc_leaderboard_data, 1):
            Leaderboard.objects.get_or_create(
                user=user,
                team=team_dc,
                defaults={
                    'total_activities': activities_count,
                    'total_duration_hours': hours,
                    'total_distance_km': distance,
                    'total_calories_burned': calories,
                    'rank': rank
                }
            )

        # Create personalized workouts
        self.stdout.write('Creating personalized workouts...')
        
        workout_data = [
            {
                'user': marvel_users[0],
                'title': 'Iron Suit Maintenance Cardio',
                'description': 'High-intensity cardio to maintain peak performance',
                'workout_type': 'cardio',
                'difficulty_level': 'advanced',
                'duration_minutes': 60,
                'calories_estimate': 600,
                'exercises': ['sprinting', 'high knees', 'burpees', 'mountain climbers']
            },
            {
                'user': marvel_users[1],
                'title': 'Super Soldier Strength Training',
                'description': 'Building ultimate strength and endurance',
                'workout_type': 'weightlifting',
                'difficulty_level': 'advanced',
                'duration_minutes': 90,
                'calories_estimate': 800,
                'exercises': ['deadlifts', 'bench press', 'squats', 'pull-ups']
            },
            {
                'user': dc_users[0],
                'title': 'Gotham City Ninja Training',
                'description': 'Agility and combat fitness workout',
                'workout_type': 'cardio',
                'difficulty_level': 'advanced',
                'duration_minutes': 75,
                'calories_estimate': 700,
                'exercises': ['ladder drills', 'rope skipping', 'parkour basics', 'shadowboxing']
            },
            {
                'user': dc_users[1],
                'title': 'Kryptonian Power Build',
                'description': 'Maximum strength and endurance',
                'workout_type': 'weightlifting',
                'difficulty_level': 'advanced',
                'duration_minutes': 120,
                'calories_estimate': 1000,
                'exercises': ['weighted squats', 'deadlifts', 'overhead press', 'barbell rows']
            },
            {
                'user': marvel_users[2],
                'title': 'Thunder God Training',
                'description': 'Legendary strength and power build',
                'workout_type': 'weightlifting',
                'difficulty_level': 'advanced',
                'duration_minutes': 100,
                'calories_estimate': 900,
                'exercises': ['Thor curls', 'hammer throws', 'power cleans', 'weighted lunges']
            },
            {
                'user': dc_users[2],
                'title': 'Amazonian Warrior Fitness',
                'description': 'Balance, strength and warrior conditioning',
                'workout_type': 'yoga',
                'difficulty_level': 'intermediate',
                'duration_minutes': 60,
                'calories_estimate': 400,
                'exercises': ['warrior poses', 'strength flows', 'balance training', 'meditation']
            },
        ]

        for data in workout_data:
            user = data.pop('user')
            Workout.objects.get_or_create(
                user=user,
                title=data['title'],
                defaults=data
            )

        self.stdout.write(self.style.SUCCESS('Database population completed successfully!'))
        self.stdout.write(self.style.SUCCESS(f'Created {len(marvel_users) + len(dc_users)} users'))
        self.stdout.write(self.style.SUCCESS(f'Created 2 teams'))
        self.stdout.write(self.style.SUCCESS(f'Created 20 activities'))
        self.stdout.write(self.style.SUCCESS(f'Created 10 leaderboard entries'))
        self.stdout.write(self.style.SUCCESS(f'Created 6 personalized workouts'))

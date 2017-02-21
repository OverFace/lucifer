from django.core.management import BaseCommand

from faker import Faker
from users.models import User
from game.characters.models import Character, Status


class Command(BaseCommand):

    def handle(self, **options):

        fake = Faker('ko_KR')

        self.stdout.write("Fake Characters Creating...")

        User.objects.all().delete()

        Character.objects.all().delete()
        Status.objects.all().delete()

        for _ in range(1, 20):

            fake_name = fake.name()
            fake_user = User.objects.create(
                    username=fake_name,
                    password='123',
                    )
            fake_user.character_set.create(
                    nickname=fake_name,
                    job='야만전사'
                    )

        self.stdout.write("Complete")

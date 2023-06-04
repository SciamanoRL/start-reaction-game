from django.db import models


class Player(models.Model):
    ip_address = models.CharField(max_length=255, null=True)
    player_name = models.CharField(max_length=255, null=True)
    phone_number = models.CharField(max_length=255, null=True)
    attempts = models.IntegerField(default=10, blank=True)


class TimeCount(models.Model):
    name_id = models.ForeignKey(Player, related_name="times", on_delete=models.PROTECT, null=True)
    time = models.CharField(max_length=255, null=True)
    date = models.DateField(null=True)

# Create your models here.

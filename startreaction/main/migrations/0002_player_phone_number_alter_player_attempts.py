# Generated by Django 4.1.6 on 2023-06-02 15:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='player',
            name='phone_number',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='player',
            name='attempts',
            field=models.IntegerField(blank=True, default=10),
        ),
    ]

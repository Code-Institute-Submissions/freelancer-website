# Generated by Django 3.0.6 on 2020-05-24 12:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('services', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='services',
            name='image',
            field=models.ImageField(blank=True, upload_to='images'),
        ),
    ]

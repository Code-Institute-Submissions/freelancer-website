# Generated by Django 3.0.6 on 2020-05-24 22:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0008_auto_20200513_1016'),
    ]

    operations = [
        migrations.AlterField(
            model_name='projectmodel',
            name='image1',
            field=models.FileField(blank=True, null=True, upload_to='media'),
        ),
    ]

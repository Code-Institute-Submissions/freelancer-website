# Generated by Django 3.0.6 on 2020-06-08 16:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0015_auto_20200607_2129'),
    ]

    operations = [
        migrations.AlterField(
            model_name='projectmodel',
            name='deadline_date',
            field=models.DateField(null=True),
        ),
    ]

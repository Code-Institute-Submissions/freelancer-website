# Generated by Django 3.0.6 on 2020-06-07 21:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0014_projectchangesmodel'),
    ]

    operations = [
        migrations.AlterField(
            model_name='publicprojectmodel',
            name='image_url',
            field=models.CharField(max_length=90, null=True),
        ),
    ]

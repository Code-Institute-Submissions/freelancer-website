# Generated by Django 3.0.4 on 2020-05-13 10:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0007_projectmodel_image3'),
    ]

    operations = [
        migrations.AlterField(
            model_name='projectmodel',
            name='image2',
            field=models.FileField(blank=True, null=True, upload_to='media'),
        ),
        migrations.AlterField(
            model_name='projectmodel',
            name='image3',
            field=models.FileField(blank=True, null=True, upload_to='media'),
        ),
    ]

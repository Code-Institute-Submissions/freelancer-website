# Generated by Django 3.0.4 on 2020-05-12 14:28

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('projects', '0002_auto_20200510_1341'),
    ]

    operations = [
        migrations.AddField(
            model_name='projectmodel',
            name='project_name',
            field=models.CharField(max_length=40, null=True),
        ),
        migrations.AlterField(
            model_name='projectmodel',
            name='owner',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='projects', to=settings.AUTH_USER_MODEL),
        ),
    ]
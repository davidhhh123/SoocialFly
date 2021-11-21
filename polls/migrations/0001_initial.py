# Generated by Django 3.1.6 on 2021-02-13 15:56

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='arts',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('times', models.DateTimeField(auto_now_add=True)),
                ('avatar_p', models.FileField(default='', upload_to='')),
                ('file_type', models.CharField(default='', max_length=255)),
                ('description', models.CharField(default='', max_length=255)),
                ('city_pr', models.CharField(default='', max_length=255)),
                ('comment_count', models.PositiveIntegerField(default='0')),
                ('prise', models.FloatField(default='0')),
            ],
            options={
                'ordering': ('-times',),
            },
        ),
        migrations.CreateModel(
            name='category_choeses',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200, null=True)),
                ('email', models.CharField(max_length=200)),
                ('user', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='history',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('avatar_a', models.FileField(default='', upload_to='')),
                ('view_count', models.PositiveIntegerField(default='0')),
                ('file_type', models.CharField(default='', max_length=255)),
                ('thubnail_storie', models.ImageField(default='', upload_to='')),
                ('duration', models.FloatField(default='0')),
                ('timea', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'ordering': ('timea',),
            },
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_ordered', models.DateTimeField(auto_now_add=True)),
                ('complete', models.BooleanField(default=False)),
                ('transaction_id', models.CharField(max_length=100, null=True)),
                ('customer', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='polls.customer')),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('price', models.FloatField()),
                ('digital', models.BooleanField(blank=True, default=False, null=True)),
                ('image', models.ImageField(blank=True, null=True, upload_to='')),
            ],
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('avatar', models.ImageField(blank=True, default='', null=True, upload_to='')),
                ('view_ads', models.CharField(choices=[('content', 'content'), ('$', '$')], default='content', max_length=10)),
                ('first_name', models.CharField(default='', max_length=255)),
                ('last_name', models.CharField(default='', max_length=255)),
                ('email', models.EmailField(default='none@email.com', max_length=254)),
                ('birth_date', models.DateField(default='1999-12-31')),
                ('bio', models.TextField(default='')),
                ('city', models.CharField(default='', max_length=255)),
                ('state', models.CharField(default='', max_length=255)),
                ('country', models.CharField(default='', max_length=255)),
                ('podpiski', models.PositiveIntegerField(default='0')),
                ('podpishiki', models.PositiveIntegerField(default='0')),
                ('user_msg', models.TextField(default='')),
                ('user_msg_id', models.TextField(default='')),
                ('boole', models.BooleanField(default=False)),
                ('sponsor', models.BooleanField(default=False)),
                ('mymoney', models.FloatField(default='0', null=True)),
                ('lavel', models.PositiveIntegerField(default='0')),
                ('lavel_dr', models.PositiveIntegerField(default='0')),
                ('lavel_dr_s', models.PositiveIntegerField(default='0')),
                ('total_lavel', models.PositiveIntegerField(default='100')),
                ('total_lavel_b', models.PositiveIntegerField(default='1')),
                ('likes_profile', models.PositiveIntegerField(default='0')),
                ('axmes', models.ManyToManyField(related_name='axmes', to=settings.AUTH_USER_MODEL)),
                ('msgt', models.ManyToManyField(related_name='msgt', to=settings.AUTH_USER_MODEL)),
                ('msgt2', models.ManyToManyField(related_name='msgt1', to=settings.AUTH_USER_MODEL)),
                ('notsubscribe', models.ManyToManyField(related_name='notsubscribe', to=settings.AUTH_USER_MODEL)),
                ('subscribe', models.ManyToManyField(related_name='subscribe', to=settings.AUTH_USER_MODEL)),
                ('subscribe1', models.ManyToManyField(related_name='subscribe1', to=settings.AUTH_USER_MODEL)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('user2', models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='user2', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='profile_catgory',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('categories', models.ManyToManyField(related_name='categoriesp', to='polls.category_choeses')),
                ('profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='profilecategor', to='polls.profile')),
            ],
        ),
        migrations.CreateModel(
            name='shop',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='', max_length=30)),
                ('logo', models.ImageField(default='', upload_to='')),
                ('pr', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='pr', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='shop_create',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Category1d', models.CharField(choices=[('footwear', 'footwear'), ('books', 'books'), ('accessories', 'accessories'), ('toys', 'toys')], default='footwear', max_length=29)),
                ('name_pr', models.CharField(default='', max_length=30)),
                ('brand', models.CharField(default='', max_length=15)),
                ('descruption', models.TextField(default='', max_length=255, null=True)),
                ('prise', models.FloatField(default='0')),
                ('logo_pr', models.ImageField(default='', upload_to='')),
                ('shop_pr', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='pr_sh', to='polls.shop')),
            ],
        ),
        migrations.CreateModel(
            name='watch',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('times', models.DateTimeField(auto_now_add=True)),
                ('avatar_p', models.FileField(default='', upload_to='')),
                ('file_type', models.CharField(default='', max_length=255)),
                ('description', models.CharField(default='', max_length=255)),
                ('city_pr', models.CharField(default='', max_length=255)),
                ('comment_count', models.PositiveIntegerField(default='0')),
                ('likes', models.ManyToManyField(related_name='blog_post_watch', to=settings.AUTH_USER_MODEL)),
                ('profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='profile_watch', to='polls.profile')),
                ('subscribe_post', models.ManyToManyField(related_name='subscribe_post_watch', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ('-times',),
            },
        ),
        migrations.CreateModel(
            name='storie',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('new_storie', models.BooleanField(default=False)),
                ('storie_view_count', models.PositiveIntegerField(default='0')),
                ('historys', models.ManyToManyField(related_name='history', to='polls.history')),
                ('my_view', models.ManyToManyField(related_name='my_view', to='polls.Profile')),
                ('new_storie_profiles', models.ManyToManyField(blank=True, related_name='new_storie_profiles', to='polls.Profile')),
                ('profile_his', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='pr_st', to='polls.profile')),
                ('stories', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='polls.history')),
                ('view_users', models.ManyToManyField(blank=True, related_name='view_users1', to='polls.Profile')),
            ],
        ),
        migrations.CreateModel(
            name='shop_product_images',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(default='', upload_to='')),
                ('shop_create', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='shop_create', to='polls.shop_create')),
            ],
        ),
        migrations.CreateModel(
            name='shop_cart',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('shop_cr', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='s_c', to='polls.shop_create')),
                ('user_profile', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='user_sh', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='ShippingAddress',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('address', models.CharField(max_length=200)),
                ('city', models.CharField(max_length=200)),
                ('state', models.CharField(max_length=200)),
                ('zipcode', models.CharField(max_length=200)),
                ('date_added', models.DateTimeField(auto_now_add=True)),
                ('customer', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='polls.customer')),
                ('order', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='polls.order')),
            ],
        ),
        migrations.CreateModel(
            name='profile_images',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('times', models.DateTimeField(auto_now_add=True)),
                ('avatar_p', models.FileField(default='', upload_to='')),
                ('file_type', models.CharField(default='', max_length=255)),
                ('description', models.CharField(blank=True, default='', max_length=255)),
                ('city_pr', models.CharField(default='', max_length=255)),
                ('comment_count', models.PositiveIntegerField(default='0')),
                ('likes', models.ManyToManyField(related_name='blog_post', to=settings.AUTH_USER_MODEL)),
                ('profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='profile_l', to='polls.profile')),
                ('profile_catgory', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='profile_catgory', to='polls.profile_catgory')),
                ('subscribe_post', models.ManyToManyField(to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ('-times',),
            },
        ),
        migrations.CreateModel(
            name='pr_time',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time_post', models.DateTimeField(auto_now_add=True)),
                ('hh_o', models.ManyToManyField(blank=True, null=True, related_name='hh_o', to=settings.AUTH_USER_MODEL)),
                ('profile_post', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='polls.profile_images')),
            ],
        ),
        migrations.CreateModel(
            name='postimage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('avatar_e', models.FileField(default='', upload_to='')),
                ('file_type', models.CharField(default='', max_length=255)),
                ('post', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='postimage', to='polls.profile_images')),
            ],
        ),
        migrations.CreateModel(
            name='OrderItem',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.IntegerField(blank=True, default=0, null=True)),
                ('date_added', models.DateTimeField(auto_now_add=True)),
                ('order', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='polls.order')),
                ('product', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='polls.product')),
            ],
        ),
        migrations.CreateModel(
            name='musics_album',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('description', models.CharField(default='', max_length=500)),
                ('album_logo', models.ImageField(upload_to='')),
                ('profile', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='music_profie_album', to='polls.profile')),
            ],
        ),
        migrations.CreateModel(
            name='musics',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('description', models.CharField(default='', max_length=500)),
                ('music', models.FileField(upload_to='')),
                ('profile', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='music_profie', to='polls.profile')),
            ],
        ),
        migrations.CreateModel(
            name='Msg_query',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('profile_query_sender', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='profile_query_sender', to='polls.profile')),
            ],
        ),
        migrations.CreateModel(
            name='Msg',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestam', models.DateTimeField(auto_now_add=True)),
                ('chat', models.TextField()),
                ('file', models.FileField(default='', upload_to='')),
                ('file_type', models.CharField(default='', max_length=7)),
                ('onread', models.BooleanField(default=False)),
                ('receiverr', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='receiverr', to=settings.AUTH_USER_MODEL)),
                ('senderr', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='senderr', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ('timestam',),
            },
        ),
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('message', models.CharField(max_length=1200)),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('is_read', models.BooleanField(default=False)),
                ('suma', models.PositiveIntegerField(default='0')),
                ('receiver', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='receiver', to=settings.AUTH_USER_MODEL)),
                ('sender', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sender', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ('timestamp',),
            },
        ),
        migrations.CreateModel(
            name='massage_q_apple',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('customer', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='be', to='polls.profile')),
                ('customer1', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='be1', to='polls.profile')),
            ],
        ),
        migrations.CreateModel(
            name='massage_q',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('customer', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='aaa', to='polls.profile')),
                ('customer1', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='bbb', to='polls.profile')),
            ],
        ),
        migrations.AddField(
            model_name='history',
            name='profile_his',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='polls.profile'),
        ),
        migrations.AddField(
            model_name='history',
            name='users',
            field=models.ManyToManyField(related_name='users', to=settings.AUTH_USER_MODEL),
        ),
        migrations.CreateModel(
            name='heshteg',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('heshtegs', models.CharField(default='', max_length=255)),
                ('image_pr', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='pl', to='polls.profile_images')),
            ],
        ),
        migrations.CreateModel(
            name='donates',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.CharField(default='', max_length=255)),
                ('prise', models.FloatField(default='0')),
                ('profile', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='donates_profile', to='polls.profile')),
                ('profile_me', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='donates_profile_me', to='polls.profile')),
            ],
        ),
        migrations.CreateModel(
            name='comments',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('comment_title', models.TextField(default='', max_length=255, null=True)),
                ('likes_comments_sum', models.PositiveIntegerField(default='0')),
                ('image_comment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='polls.profile_images')),
                ('likes_comments', models.ManyToManyField(related_name='blog_postss', to=settings.AUTH_USER_MODEL)),
                ('profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='polls.profile')),
            ],
            options={
                'ordering': ('-likes_comments_sum',),
            },
        ),
        migrations.CreateModel(
            name='comment_like',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('comment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='commentsi', to='polls.comments')),
                ('likes_comment', models.ManyToManyField(related_name='blog_postss1', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='cg_ppp',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('times', models.DateTimeField(auto_now_add=True)),
                ('avatar_pp', models.ImageField(default='', upload_to='')),
                ('first_namep', models.CharField(default='', max_length=255)),
                ('city_prp', models.CharField(default='', max_length=255)),
                ('city_pp', models.CharField(default='', max_length=255)),
                ('comment_countp', models.PositiveIntegerField(default='0')),
                ('ggol', models.ManyToManyField(null=True, related_name='ggol', to='polls.profile_images')),
                ('likesp', models.ManyToManyField(related_name='blog_postp', to=settings.AUTH_USER_MODEL)),
                ('profile', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='Profilell', to='polls.profile')),
                ('profilep', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='profile_lp', to='polls.profile_images')),
                ('subscribe_postp', models.ManyToManyField(related_name='subscribe_postp', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='category_choeses',
            name='profile',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='profilecho', to='polls.profile'),
        ),
        migrations.CreateModel(
            name='books',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('description', models.CharField(default='', max_length=500)),
                ('books', models.FileField(upload_to='')),
                ('profile', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='books_profie', to='polls.profile')),
            ],
        ),
        migrations.CreateModel(
            name='assignment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Category', models.CharField(choices=[('Likes', 'Likes'), ('comments', 'comments'), ('followers', 'followers')], default='Likes', max_length=9)),
                ('descruption', models.TextField(default='', max_length=255, null=True)),
                ('Count', models.IntegerField(default='0')),
                ('prise', models.FloatField(default='0')),
                ('profile', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='polls.profile')),
                ('users_task_success', models.ManyToManyField(null=True, related_name='users_task_success', to='polls.Profile')),
            ],
        ),
        migrations.CreateModel(
            name='arts_images',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('avatar_p', models.FileField(default='', upload_to='')),
                ('art', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='arts_po', to='polls.arts')),
                ('profile', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='arts_profile', to='polls.profile')),
            ],
        ),
        migrations.CreateModel(
            name='arts_collection',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('collection_name', models.CharField(default='', max_length=20)),
                ('picture_count', models.PositiveIntegerField(default='0')),
                ('avatar_p', models.FileField(default='', upload_to='')),
                ('collection_likes', models.ManyToManyField(related_name='collection_likes', to=settings.AUTH_USER_MODEL)),
                ('profile', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='profile_arts_collection_sl', to='polls.profile')),
            ],
        ),
        migrations.AddField(
            model_name='arts',
            name='art',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='collection_arts_sl', to='polls.arts_collection'),
        ),
        migrations.AddField(
            model_name='arts',
            name='likes',
            field=models.ManyToManyField(related_name='blog_arts_post', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='arts',
            name='profile',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='profile_arts_sl', to='polls.profile'),
        ),
        migrations.AddField(
            model_name='arts',
            name='subscribe_post',
            field=models.ManyToManyField(related_name='subscribe_arts_post', to=settings.AUTH_USER_MODEL),
        ),
        migrations.CreateModel(
            name='all_us',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timesa', models.DateTimeField(auto_now_add=True)),
                ('avatar_a', models.ImageField(default='', upload_to='')),
                ('first_namea', models.CharField(default='', max_length=255)),
                ('commentus', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='polls.comments')),
                ('imagecomment_us', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='polls.profile_images')),
                ('likesa', models.ManyToManyField(related_name='blog_po', to=settings.AUTH_USER_MODEL)),
                ('profileus', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='polls.profile')),
            ],
            options={
                'ordering': ('timesa',),
            },
        ),
        migrations.CreateModel(
            name='ads',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ads_file', models.FileField(upload_to='')),
                ('name', models.CharField(default='', max_length=50)),
                ('Category', models.CharField(choices=[('Sport', 'Sport'), ('Travel', 'Travel'), ('Games', 'Games'), ('Download_App', 'Download App')], default='Sport', max_length=39)),
                ('budget', models.FloatField(default='0', null=True, validators=[django.core.validators.MinValueValidator(2)])),
                ('money', models.FloatField(default='0', null=True, validators=[django.core.validators.MinValueValidator(0.9), django.core.validators.MaxValueValidator(58)])),
                ('categories', models.ManyToManyField(related_name='profile_catgory_p', to='polls.profile_catgory')),
                ('profile', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='Profile_ads', to='polls.profile')),
            ],
        ),
    ]

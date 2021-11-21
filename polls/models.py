from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.signals import request_finished
from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.utils import timezone

from django.core.validators import MinValueValidator, MaxValueValidator

import math
from time import strftime, gmtime

from django.db import models
from django.template.defaultfilters import slugify
from django.utils import timezone
import datetime


from .song_utils import generate_file_name


from django.shortcuts import render, redirect, get_object_or_404
from django import template

register = template.Library()



# Create your models here.
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    user2 = models.OneToOneField(User, on_delete=models.CASCADE, related_name="user2", null=True)
    avatar = models.ImageField(

       
        default = '',
        blank = True,
        null = True

        
    )
    FRESHMAN = 'content'
    SOPHOMORE = '$'
    ads_view = (
        (FRESHMAN, 'content'),
        (SOPHOMORE, '$'),)
       
    view_ads = models.CharField(max_length=10,
                                      choices=ads_view,
                                      default=FRESHMAN)
    first_name = models.CharField(max_length=255, default='')
    last_name = models.CharField(max_length=255, default='')
    email = models.EmailField(default='none@email.com')
    birth_date = models.DateField(default='1999-12-31')
    bio = models.TextField(default='')
    city = models.CharField(max_length=255, default='')
    state = models.CharField(max_length=255, default='')
    country = models.CharField(max_length=255, default='')
   
   
    subscribe = models.ManyToManyField(User, related_name = 'subscribe')
    notsubscribe = models.ManyToManyField(User, related_name = 'notsubscribe')
    subscribe1 = models.ManyToManyField(User, related_name = 'subscribe1')
    msgt = models.ManyToManyField(User, related_name = 'msgt')
    msgt2 = models.ManyToManyField(User, related_name = 'msgt1')
    axmes = models.ManyToManyField(User, related_name = 'axmes')
    podpiski = models.PositiveIntegerField(default = '0')
    podpishiki = models.PositiveIntegerField(default = '0')
    user_msg = models.TextField(default='')
    user_msg_id = models.TextField(default='')
    boole = models.BooleanField(default=False)
    sponsor = models.BooleanField(default=False)
    mymoney = models.FloatField(default = '0',null=True)
    lavel = models.PositiveIntegerField(default = '0')
    lavel_dr = models.PositiveIntegerField(default = '0')
    lavel_dr_s = models.FloatField(default = '0', validators=[MinValueValidator(0)])
    total_lavel = models.PositiveIntegerField(default = '100')
    total_lavel_b = models.PositiveIntegerField(default = '1')
    likes_profile = models.PositiveIntegerField(default = '0')
    apple_mes_users = models.ManyToManyField(User, related_name = 'apple_mes_users')
    my_frank = models.ManyToManyField('profile_images', related_name = 'profile_images_rank')
    likes_count_pr = models.PositiveIntegerField(default = '0')
    ads_count_day =  models.PositiveIntegerField(default = 10)
    ads_count_day_q =  models.PositiveIntegerField(default = 0)
    points = models.FloatField(default = 0, validators=[MinValueValidator(0)])
    cloud_size_my_profile = models.FloatField(default = 0, validators=[MinValueValidator(0)])
    cloud_size_max_value_my_plan = models.PositiveIntegerField(default = 1)
    myresiver =  models.ManyToManyField('Profile', related_name = 'profile_res_my')
    mes_time =  models.DateTimeField(auto_now_add=True)


    

    
    

    def __str__(self):
        return self.user.username

   





   



      




def create_profile(sender, **kwargs):
    
    
    if kwargs['created']:
        profile = Profile.objects.create(user=kwargs['instance'], user2 = kwargs['instance'])
        profile.total_lavel=100
        profile.total_lavel_b=1
        profile.lavel=0
        profile.lavel_dr=0
        profile.lavel_dr_s=0
        profile.likes_profile=0
        profile.likes_count_pr=0
        profile.points = 0

        playlist_defoult = Playlist_init.objects.create(profile = profile, name = "My Playlist", defoult_playlist=True)

       



        


       


post_save.connect(create_profile, sender=User)



class category_choeses(models.Model):
    
    name = models.CharField(max_length=50)
    def __str__(self):
        return self.name




class profile_catgory(models.Model):
    profile =  models.ForeignKey(Profile , on_delete = models.CASCADE, related_name = 'profilecategor')
    categories = models.ManyToManyField(category_choeses, related_name="categoriesp")


class profile_images(models.Model):
    profile = models.ForeignKey(Profile , on_delete = models.CASCADE, related_name = 'profile_l')
    profile_catgory = models.ForeignKey(profile_catgory , on_delete = models.CASCADE, related_name = 'profile_catgory',null=True)
    subscribe_post = models.ManyToManyField(User)
    times = models.DateTimeField(auto_now_add=True)
    avatar_p = models.FileField(
        
        default = '',
        
    )
    file_type = models.CharField(max_length=255, default='')
    description = models.CharField(max_length=255, default='', blank=True)
    likes = models.ManyToManyField(User, related_name = 'blog_post')
    
    city_pr = models.CharField(max_length=255, default='')
    comment_count = models.PositiveIntegerField(default = '0')
    visible = models.BooleanField(default=True)
    monetization_boole = models.BooleanField(default=False)
    #heshteg_name = models.ManyToManyField(profile_images, related_name = 'hesh')
    



    


    @property
    def total_likes(self):
        return self.likes.count()    

    def get_random(self):
        #ft = get_object_or_404(models.profile_catgory, profile = request.user.profile)

       
        print("movie")
        #categor = ft.categories.all()
        

       
        ads_p = ads_tasks_executor_post.objects.filter().order_by('?')[:1]
        
        ads_m = get_object_or_404(ads_tasks_executor_post, pk = ads_p[0].pk)
        
        
       
        


        
        print("movie",ads_p)
       
        
        return ads_p

    @register.filter(name='cut')
    def cut(customer):

        return customer
        
    class Meta:
        ordering = ('-times',) 



class comments(models.Model):
    
    profile = models.ForeignKey(Profile , on_delete = models.CASCADE)
    image_comment = models.ForeignKey(profile_images , on_delete = models.CASCADE, related_name = 'comments')
    comment_title = models.TextField(max_length=255, default='' ,null = True)
    likes_comments = models.ManyToManyField(User, related_name = 'blog_postss')
    likes_comments_sum = models.PositiveIntegerField(default = '0')
    


    def __str__(self):
        return self.comment_title

    def total_likes(self):
        return self.likes_comments.count()   


    class Meta:
        ordering = ('-likes_comments_sum',)        

    
class comment_like(models.Model):
    comment = models.ForeignKey(comments , on_delete = models.CASCADE, related_name = 'commentsi')
    likes_comment = models.ManyToManyField(User, related_name = 'blog_postss1')


    

# Create your models here.

class Msg(models.Model):
    senderr=models.ForeignKey(User,on_delete=models.CASCADE,related_name='senderr')
    receiverr=models.ForeignKey(User,on_delete=models.CASCADE,related_name='receiverr')
    timestam = models.DateTimeField(auto_now_add=True)

    chat=models.TextField()
    file = models.FileField(default='')
    file_type = models.CharField(max_length=7, default='')
    onread = models.BooleanField(default=False)
    
    def __str__(self):
        return str(self.senderr)+' to '+str(self.receiverr)



    class Meta:
        ordering = ('timestam',)    



class Msg_query(models.Model):
    profile_query_sender = models.ForeignKey(Profile, on_delete=models.CASCADE,related_name = 'profile_query_sender', null=True)
    



class Message(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sender')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='receiver')
    message = models.CharField(max_length=1200)
    timestamp = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)
    suma = models.PositiveIntegerField(default = '0')

    def __str__(self):
        return self.message

    class Meta:
        ordering = ('timestamp',)

class all_us(models.Model):
    profileus = models.ForeignKey(Profile , on_delete = models.CASCADE, null = True)
    imagecomment_us = models.ForeignKey(profile_images , on_delete = models.CASCADE, null = True)
    commentus = models.ForeignKey(comments , on_delete = models.CASCADE, null = True)
    timesa = models.DateTimeField(auto_now_add=True)
    avatar_a = models.ImageField(
        
        default = '',
        
    )
    first_namea = models.CharField(max_length=255, default='')
    #commen_title = models.TextField(max_length=255, default='')
    likesa = models.ManyToManyField(User, related_name = 'blog_po')
    
    



    def __str__(self):
        return self.first_namea


    @property
    def total_likes(self):
        return self.likesa.count()    


    class Meta:
        ordering = ('timesa',) 


class history(models.Model):
    profile_his = models.ForeignKey(Profile , on_delete = models.CASCADE, null = True)
   
    avatar_a = models.FileField(
        
        default = '',
        
    )
    users = models.ManyToManyField(User, related_name = 'users')
    view_count = models.PositiveIntegerField(default = '0')
    file_type = models.CharField(max_length=255, default='')
    thubnail_storie = models.ImageField(
        
        default = '',
        
    )
    duration = models.FloatField(default="0")

    timea = models.DateTimeField(auto_now_add=True)
    
    
    

    
    

    def __str__(self):
        return self.avatar_a.url


    


    class Meta:
        ordering = ('timea',) 



class pr_time(models.Model):
    profile_post = models.ForeignKey(profile_images, on_delete=models.CASCADE, null=True)
    times = models.DateTimeField(auto_now_add=True)
    hh_o = models.ManyToManyField(User,related_name = 'hh_o', null=True, blank=True)

    def __int__(self):
        return self.profile_post.id


    def get_random(self):
       
        movie = ads.objects.all().order_by('?')[:1]
        return movie

class pr_time_pr_images(models.Model):

    pr_time = models.ForeignKey(pr_time, on_delete=models.CASCADE, null=True)
    profile_post = models.ForeignKey(profile_images, on_delete=models.CASCADE, null=True)
    times = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.profile_post.profile.first_name

class postimage(models.Model):
     post = models.ForeignKey(profile_images , on_delete = models.CASCADE , null=True, related_name="postimage")
# post1 = models.ForeignKey(pr_time , on_delete = models.CASCADE , null=True, related_name="postimage1")
     avatar_e = models.FileField(
        
        default = '',
        
    )
     file_type = models.CharField(max_length=255, default='')
     def __str__(self):
        return self.post.description


class storie(models.Model):
    profile_his = models.ForeignKey(Profile , on_delete = models.CASCADE, null = True, related_name="pr_st")
    stories = models.ForeignKey(history , on_delete = models.CASCADE, null = True)
    new_storie = models.BooleanField(default=False)
    storie_view_count = models.PositiveIntegerField(default = '0')
    view_users = models.ManyToManyField(Profile, related_name="view_users1", blank=True,)
    new_storie_profiles = models.ManyToManyField(Profile, related_name="new_storie_profiles", blank=True,)
    my_view = models.ManyToManyField(Profile, related_name="my_view")
  
    
    historys = models.ManyToManyField(history, related_name="history")

    

   
    
    
    
    



    def __str__(self):
        return self.profile_his.user.username

    
    
     








class heshteg(models.Model):
    image_pr = models.ForeignKey(profile_images , on_delete = models.CASCADE, null = True, related_name = 'pl')
    heshtegs  = models.CharField(max_length=255, default='')



    def __str__(self):
        return self.heshtegs
     

class cg_ppp(models.Model):

    profilep = models.ForeignKey(profile_images , on_delete = models.CASCADE, related_name = 'profile_lp')

    profile = models.ForeignKey(Profile , on_delete = models.CASCADE, related_name = 'Profilell', null=True)

    

    times = models.DateTimeField(auto_now_add=True)
    avatar_pp = models.ImageField(
        
        default = '',
        
    )
    first_namep = models.CharField(max_length=255, default='')
    likesp = models.ManyToManyField(User, related_name = 'blog_postp')
    subscribe_postp = models.ManyToManyField(User, related_name = 'subscribe_postp')
    city_prp = models.CharField(max_length=255, default='')
    ggol = models.ManyToManyField(profile_images, related_name='ggol', null=True)
    city_pp = models.CharField(max_length=255, default='')
    comment_countp = models.PositiveIntegerField(default = '0')



    def __str__(self):
        return self.first_namep
  


class ads(models.Model):
    profile = models.ForeignKey(Profile , on_delete = models.CASCADE, related_name = 'Profile_ads', null=True)

    ads_file = models.FileField()
    name = models.CharField(default='', max_length=50)
    Sport = 'Sport'
    Travel = 'Travel'
    Games = 'Games'
    Download_App = 'Download_App'
    YEAR_IN_SCHOOL_CHOICES = (
        (Sport, 'Sport'),
        (Travel, 'Travel'),
        (Games, 'Games'),
        (Download_App, 'Download App'),
    )
    categories = models.ManyToManyField(profile_catgory, related_name="profile_catgory_p")
    Category = models.CharField(max_length=39,
                                      choices=YEAR_IN_SCHOOL_CHOICES,
                                      default=Sport)

    budget = models.FloatField(default = '0', validators=[MinValueValidator(2)],null=True)

    money  = models.FloatField(default = '0', validators=[MinValueValidator(0.9), MaxValueValidator(58)],null=True)


    
 

class shop(models.Model):
    pr = models.ForeignKey(User , on_delete = models.CASCADE, related_name = 'pr')
    name  = models.CharField(max_length=30, default='')
    logo = models.ImageField(
        
        default = '',
        
    )
    def __str__(self):
        return self.name


class shop_create(models.Model):

    shop_pr = models.ForeignKey(shop, on_delete = models.CASCADE, related_name = 'pr_sh')
    footwear = 'footwear'
    books = 'books'
    accessories = 'accessories'
    toys = 'toys'
    YEAR_IN_SCHOOL_CHOICES = (
        (footwear, 'footwear'),
        (books, 'books'),
        (accessories, 'accessories'),
        (toys, 'toys'),
    )
    Category1d = models.CharField(max_length=29,
                                      choices=YEAR_IN_SCHOOL_CHOICES,
                                      default=footwear)
    
    name_pr  = models.CharField(max_length=30, default='')
    brand = models.CharField(max_length=15, default='')
    descruption = models.TextField(max_length=255, default='' ,null = True)

    prise = models.FloatField(default = '0')



    logo_pr = models.ImageField(
        
        default = '',
        
    )
    def __str__(self):
        return self.name_pr




class shop_product_images(models.Model):
    shop_create = models.ForeignKey(shop_create, on_delete = models.CASCADE, related_name = 'shop_create')
    image = models.ImageField(
        
        default = '',
        
    )
    def __str__(self):
        return self.shop_create.name_pr

class shop_cart(models.Model):


    shop_cr = models.ForeignKey(shop_create, on_delete = models.CASCADE, related_name = 's_c')
    user_profile = models.ForeignKey(User, on_delete = models.CASCADE, related_name = 'user_sh', null=True)

class Customer(models.Model):
    user = models.OneToOneField(User, null=True, blank=True, on_delete=models.CASCADE)
    name = models.CharField(max_length=200, null=True)
    email = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=200)
    price = models.FloatField()
    digital = models.BooleanField(default=False,null=True, blank=True)
    image = models.ImageField(null=True, blank=True)

    def __str__(self):
        return self.name

    @property
    def imageURL(self):
        try:
            url = self.image.url
        except:
            url = ''
        return url

class Order(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.SET_NULL, null=True, blank=True)
    date_ordered = models.DateTimeField(auto_now_add=True)
    complete = models.BooleanField(default=False)
    transaction_id = models.CharField(max_length=100, null=True)

    def __str__(self):
        return str(self.id)
        
    @property
    def shipping(self):
        shipping = False
        orderitems = self.orderitem_set.all()
        for i in orderitems:
            if i.product.digital == False:
                shipping = True
        return shipping

    @property
    def get_cart_total(self):
        orderitems = self.orderitem_set.all()
        total = sum([item.get_total for item in orderitems])
        return total 

    @property
    def get_cart_items(self):
        orderitems = self.orderitem_set.all()
        total = sum([item.quantity for item in orderitems])
        return total 

class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    quantity = models.IntegerField(default=0, null=True, blank=True)
    date_added = models.DateTimeField(auto_now_add=True)

    @property
    def get_total(self):
        total = self.product.price * self.quantity
        return total

class ShippingAddress(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    address = models.CharField(max_length=200, null=False)
    city = models.CharField(max_length=200, null=False)
    state = models.CharField(max_length=200, null=False)
    zipcode = models.CharField(max_length=200, null=False)
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.address
#class subscribe_users(models.Model):
#    sender_sub=models.ForeignKey(Profile,on_delete=models.CASCADE,related_name='sender')
#    receiver_sub=models.ForeignKey(Profile,on_delete=models.CASCADE,related_name='receiver')
#    sender_sum = models.PositiveIntegerField(default = '0')
#    receiver_sum = models.PositiveIntegerField(default = '0')


#class history(models.Model):
#    profile = models.ForeignKey(Profile , on_delete = models.CASCADE, null = True)
#
#    image = models.ImageField(
#
#       
#        default = '',
#        blank = True
#
#        
#    )
#   
        

class massage_q(models.Model):
    customer = models.ForeignKey(Profile, on_delete=models.CASCADE, null=True, related_name="aaa")
    customer1 = models.ForeignKey(Profile, on_delete=models.CASCADE, null=True, related_name="bbb")
    

class massage_q_apple(models.Model):
    customer = models.ForeignKey(Profile, on_delete=models.CASCADE, null=True, related_name="be")
    customer1 = models.ForeignKey(Profile, on_delete=models.CASCADE, null=True, related_name="be1")
    
    def __str__(self):
        return self.customer.first_name


class assignment(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, null=True)
    Likes = 'Likes'
    comments = 'comments'
    followers = 'followers'
    
    YEAR_IN_SCHOOL_CHOICE = (
        (Likes, 'Likes'),
        (comments, 'comments'),
        (followers, 'followers'),
        
    )
    Category = models.CharField(max_length=9,
                                      choices=YEAR_IN_SCHOOL_CHOICE,
                                      default=Likes)


    descruption = models.TextField(max_length=255, default='' ,null = True)
    users_task_success = models.ManyToManyField(Profile, related_name='users_task_success', null=True)
    Count = models.IntegerField(default = '0') 
    prise = models.FloatField(default = '0') 


#class profile_tasks(models.Model):

#    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, null=True, related_name="profiletask")
#    assignment1 = models.ForeignKey(assignment, on_delete=models.CASCADE, null=True, related_name="assignment")
#    tasks = models.ManyToManyField(assignment, related_name = 'tasks')



#watch


class watch(models.Model):
    profile = models.ForeignKey(Profile , on_delete = models.CASCADE, related_name = 'profile_watch')

    times = models.DateTimeField(auto_now_add=True)
    avatar_p = models.FileField(
        
        default = '',
        
    )
    file_type = models.CharField(max_length=255, default='')
    description = models.CharField(max_length=255, default='')
    likes = models.ManyToManyField(User, related_name = 'blog_post_watch')
    subscribe_post = models.ManyToManyField(User, related_name = 'subscribe_post_watch')
    city_pr = models.CharField(max_length=255, default='')
    comment_count = models.PositiveIntegerField(default = '0')
    #heshteg_name = models.ManyToManyField(profile_images, related_name = 'hesh')
    



    def __str__(self):
        return self.description


    @property
    def total_likes(self):
        return self.likes.count()    


    class Meta:
        ordering = ('-times',) 




#arts

class arts_collection(models.Model):
    profile = models.ForeignKey(Profile , on_delete = models.CASCADE, related_name = 'profile_arts_collection_sl' ,null=True)
    #art = models.ForeignKey(arts, on_delete = models.CASCADE, related_name = 'collection_arts_sl' ,null=True)
    collection_name = models.CharField(max_length=20, default="")
    picture_count = models.PositiveIntegerField(default="0")
    collection_likes = models.ManyToManyField(User, related_name = 'collection_likes')
    
    avatar_p = models.FileField(
        
        default = '',
        
    )
    

    def __str__(self):
        return self.collection_name

class arts(models.Model):
    profile = models.ForeignKey(Profile , on_delete = models.CASCADE, related_name = 'profile_arts_sl' ,null=True)
    art = models.ForeignKey(arts_collection, on_delete = models.CASCADE, related_name = 'collection_arts_sl' ,null=True)
    times = models.DateTimeField(auto_now_add=True)
    avatar_p = models.FileField(
        
        default = '',
        
    )
    profile_image=models.FileField(
        
        default = '',
        
    )
    profile_name =  models.CharField(max_length=255, default='')
    file_type = models.CharField(max_length=255, default='')
    description = models.CharField(max_length=255, default='')
    likes = models.ManyToManyField(User, related_name = 'blog_arts_post')
    subscribe_post = models.ManyToManyField(User, related_name = 'subscribe_arts_post')
    city_pr = models.CharField(max_length=255, default='')
    comment_count = models.PositiveIntegerField(default = '0')
    prise = models.FloatField(default = '0')
    #heshteg_name = models.ManyToManyField(profile_images, related_name = 'hesh')
    



    def __str__(self):
        return self.profile.first_name

    

        


    @property
    def total_likes(self):
        return self.likes.count()   




    class Meta:
        ordering = ('-times',) 




class arts_images(models.Model):
    profile = models.ForeignKey(Profile , on_delete = models.CASCADE, related_name = 'arts_profile' ,null=True)
    art = models.ForeignKey(arts, on_delete = models.CASCADE, related_name = 'arts_po' ,null=True)
    avatar_p = models.FileField(
        
        default = '',
        
    )





    def __str__(self):
        return self.art.description


class donates(models.Model):
    profile_me = models.ForeignKey(Profile , on_delete = models.CASCADE, related_name = 'donates_profile_me' ,null=True)
    profile = models.ForeignKey(Profile , on_delete = models.CASCADE, related_name = 'donates_profile' ,null=True)
    description = models.CharField(max_length=255, default='')
    prise = models.FloatField(default = '0')


    def __str__(self):
        return self.description



class musics_album(models.Model):
    profile = models.ForeignKey(Profile , on_delete = models.CASCADE, related_name = 'music_profie_album' ,null=True)
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=500, default='')
    album_logo = models.ImageField()



    def __str__(self):
        return self.name

class musics(models.Model):
    profile = models.ForeignKey(Profile , on_delete = models.CASCADE, related_name = 'music_profie' ,null=True)
    
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=500, default='')
    music = models.FileField()
    likes = models.ManyToManyField(User, related_name = 'music_post')



    def __str__(self):
        return self.name


class books(models.Model):
    profile = models.ForeignKey(Profile , on_delete = models.CASCADE, related_name = 'books_profie' ,null=True)
    
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=500, default='')
    books = models.FileField()
    likes = models.ManyToManyField(User, related_name = 'books_post')
    status_x = models.CharField(max_length=6, default="True")
    created_at = models.DateTimeField(verbose_name='Created_At', default=timezone.now)



    def __str__(self):
        return self.name        
class books_res(models.Model):
    
    
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=500, default='')
    books = models.CharField(max_length=200, default='')
    likes = models.ManyToManyField(User, related_name = 'books_post_likes')
    status_x = models.CharField(max_length=6, default="False")
    
    
    
    created_at = models.DateTimeField(verbose_name='Created_At', default=timezone.now)



    def __str__(self):
        return self.name        


class cloud(models.Model):
    profile = models.ForeignKey(Profile , on_delete = models.CASCADE, related_name = 'cloud_profile' ,null=True)
    times = models.DateTimeField(auto_now_add=True, null=True)
    file_type = models.CharField(max_length=10, default="")
    file =models.FileField()
    size = models.FloatField(default=0)
    

    def __str__(self):
        return self.profile.first_name    


class cloud_posts(models.Model):
    profile = models.ForeignKey(Profile , on_delete = models.CASCADE, related_name = 'cloud_post_profile' ,null=True)
    profile_post = models.ForeignKey(profile_images , on_delete = models.CASCADE, related_name = 'post_cloud' ,null=True)
    times = models.DateTimeField(auto_now_add=True, null=True)
    def __str__(self):
        return self.profile.first_name 



class Artist(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField()

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super(Artist, self).save(*args, **kwargs)


class Genre(models.Model):
    name = models.CharField(max_length=50)
    thumbnail = models.ImageField(upload_to="genres", default="default.jpeg")


class Favorite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    song = models.ForeignKey('Song', on_delete=models.CASCADE)
    song1 = models.ForeignKey('Song_res', on_delete=models.CASCADE, related_name="song_res_is_fav", null=True)


def song_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    return 'songs/{0}/{1}'.format(strftime('%Y/%m/%d'), generate_file_name() + '.' + filename.split('.')[-1])


class Song(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    audio_id = models.TextField()
    title = models.CharField(max_length=200, verbose_name="Song name")
    description = models.TextField()
    thumbnail = models.ImageField(upload_to="thumbnails", blank=False, default='')
    song = models.FileField(upload_to=song_directory_path)
    status_x = models.CharField(max_length=6, default="True")
    # audio_location = models.CharField(max_length=255)
    #genre = models.ForeignKey(Genre, on_delete=models.DO_NOTHING)
    artists = models.ManyToManyField(Artist, related_name='songs')
    size = models.IntegerField(default=0)
    playtime = models.CharField(max_length=10, default="0.00")
    type = models.CharField(max_length=10)
    price = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)
    featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(verbose_name='Created At', default=timezone.now)
    likes = models.ManyToManyField(User, related_name = 'Song_post')

    @property
    def duration(self):
        return str(strftime('%H:%M:%S', gmtime(float(self.playtime))))

    @property
    def file_size(self):
        if self.size == 0:
            return "0B"
        size_name = ("B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB")
        i = int(math.floor(math.log(self.size, 1024)))
        p = math.pow(1024, i)
        s = round(self.size / p, 2)
        return "%s %s" % (s, size_name[i])

class Song_res(models.Model):
    
    audio_id = models.TextField()
    title = models.CharField(max_length=200, verbose_name="Song_name")
    description = models.TextField()
    
    song = models.CharField(max_length=1000)
    status_x = models.CharField(max_length=6, default="False")
    # audio_location = models.CharField(max_length=255)
    #genre = models.ForeignKey(Genre, on_delete=models.DO_NOTHING)
    
    
    created_at = models.DateTimeField(verbose_name='Created_At', default=timezone.now)
    likes = models.ManyToManyField(User, related_name = 'Song_kpost')

    def __str__(self):
        return self.title  

    

class Playlist_init(models.Model):
    profile = models.ForeignKey(Profile , on_delete = models.CASCADE, related_name = 'playlist_post_i_profile' ,null=True)
    name = models.CharField(max_length=20 , default="")
    description = models.CharField(max_length=200 , default="")
    defoult_playlist = models.BooleanField(default=False)
    poster = models.FileField(default="now")
    song = models.ManyToManyField(Song, related_name='songs')
    song_res = models.ManyToManyField(Song_res, related_name='songs_res')
    

    def __str__(self):
        return self.profile.first_name   
        

class Playlist(models.Model):
    profile = models.ForeignKey(Profile , on_delete = models.CASCADE, related_name = 'playlist_post_profile' ,null=True)
    playlist = models.ForeignKey(Playlist_init , on_delete = models.CASCADE, related_name = 'Playlist_init_profile' ,null=True)
    
    

    def __str__(self):
        return self.profile.first_name 

class my_channel(models.Model):
    profile = models.ForeignKey(Profile , on_delete = models.CASCADE, related_name = 'ch_post_profile' ,null=True)
    name = models.CharField(max_length=30, default='')
    description = models.CharField(max_length=400, default='')
    subscribe = models.ManyToManyField(Profile)
    poster = models.FileField()
    main_poster =  models.FileField(null=True)


    

    




class courses_profile(models.Model):
    profile = models.ForeignKey(Profile , on_delete = models.CASCADE, related_name = 'c_post_profile' ,null=True)
    my_channel = models.ForeignKey(my_channel , on_delete = models.CASCADE, related_name = 'my_channel_post_profile' ,null=True)
    name = models.CharField(max_length=30, default='')
    description = models.CharField(max_length=400, default='')
    likes = models.ManyToManyField(Profile, related_name='likes_videos')


    video = models.FileField()
    
    def __str__(self):
        return self.profile.first_name 



class comments_courses(models.Model):
    profile_com = models.ForeignKey(Profile , on_delete = models.CASCADE, related_name = 'profile_com' ,null=True)
    courses_profile_v = models.ForeignKey(courses_profile , on_delete = models.CASCADE, related_name = 'courses_profile_v' ,null=True)
    
    description = models.CharField(max_length=400, default='')
    likes = models.ManyToManyField(Profile, related_name='likes_videos_com')


    
    
    def __str__(self):
        return self.courses_profile_v.name

class ads_manager(models.Model):
    profile_ads_m = models.ForeignKey(Profile , on_delete = models.CASCADE, related_name = 'profile_ads_m' ,null=True)
    executor  = models.ForeignKey(Profile , on_delete = models.CASCADE, related_name = 'profile_executor' ,null=True)
    price = models.FloatField(default = 0, validators=[MinValueValidator(0)])
    description = models.CharField(max_length=400, default='')
    views = models.ManyToManyField(Profile, related_name='views_ads')
    min_auditory = models.PositiveIntegerField(default = 0, validators=[MinValueValidator(0)])
    name = models.CharField(max_length=50, default='')
    likes =   models.ManyToManyField(Profile, related_name='likes_ads')

    max_auditory = models.PositiveIntegerField(default = 0, validators=[MinValueValidator(0)])
    file =  models.FileField(null=True)
    file_name = models.CharField(max_length=50, default='')

    


    Music = 'Music'
    Profile = 'Profile'
    Product = 'Product'
    Download_App = 'Download_App'
    YEAR_IN_SCHOOL_CHOICES = (
        (Music, 'Music'),
        (Profile, 'Profile'),
        (Product, 'Product'),
        (Download_App, 'Download App'),
    )
    categories = models.ManyToManyField(profile_catgory, related_name="profile_catgory_p_two")
    Category = models.CharField(max_length=39,
                                      choices=YEAR_IN_SCHOOL_CHOICES,
                                      default=Music)
    budget = models.PositiveIntegerField(default = 0,  validators=[MinValueValidator(2)],null=True)





    
    
    def __str__(self):
        return self.profile_ads_m.first_name



class ads_tasks(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, null=True)
    ads_manager = models.ForeignKey(ads_manager, on_delete=models.CASCADE, null=True)
    executor  = models.ForeignKey(Profile , on_delete = models.CASCADE, related_name = 'profile_executor_p' ,null=True)
   


    def __str__(self):
        return self.ads_manager.name




class ads_tasks_executor_post(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, null=True)
    ads_tasks = models.ForeignKey(ads_tasks, on_delete=models.CASCADE, null=True)
    description = models.CharField(max_length=400, default='')
    times = models.DateTimeField(auto_now_add=True)
    
   


    def __str__(self):
        return self.ads_tasks.ads_manager.name
class invite_users(models.Model):
    user_n = models.OneToOneField(User, on_delete=models.CASCADE, related_name="user_invaite", null=True, blank=True)
    user =  models.CharField(max_length=50)
    invite_key = models.CharField(max_length=50)


    def __str__(self):
        return self.user
class my_recommendations_post(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, null=True)
    user =  models.CharField(max_length=50)
    posts = models.ManyToManyField(pr_time_pr_images, related_name="reco_postss")


    def __str__(self):
        return self.profile.first_name



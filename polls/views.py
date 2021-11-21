from django.contrib import messages
from django.contrib.auth import (authenticate, login, logout,
                                 update_session_auth_hash)
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import (AuthenticationForm, UserCreationForm,
                                       PasswordChangeForm, User)
from django.urls import reverse
from django.http import HttpResponseRedirect, HttpResponse, JsonResponse 
from django.shortcuts import render, redirect, get_object_or_404

from . import models
from . import forms
from django.db.models import Q, F, Avg
from .forms import UserRegistrationForm,profile_imagesforms,musics_form, hitoryform, donate_form,heshtegforms, shopforms, shopcreateforms,file,ads, task,artssw,arts_collection_forms

from .models import  Profile, profile_images, comments
from django.views.decorators.csrf import csrf_protect

from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from .models import Message
from .serializers import MessageSerializer, UserSerializer
from django.core import serializers
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.shortcuts import render, redirect
from django.views.generic.list import ListView
from django.db.models import Count
from django.http import QueryDict




from random import seed
from random import sample, choice
IMAGE_FILE_TYPES = ['png', 'jpg', 'jpeg','mp4','mpeg','gif']
noimages_FILE_TYPES = ['mp4','mpeg','gif']
ADS_FILE_TYPES = ['png', 'jpg', 'jpeg','mp4','mpeg','gif']
import json

from django.http import JsonResponse
from django.shortcuts import render
from itertools import chain
from operator import attrgetter
from django.shortcuts import render
from django.http import JsonResponse
import json
from datetime import datetime
import subprocess
from moviepy.editor import *
from PIL import Image

from .utils import cookieCart, cartData, guestOrder
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.shortcuts import render
from django.urls import reverse_lazy
from django.utils.decorators import method_decorator
from django.views.generic import CreateView, DetailView, DeleteView, ListView

from .song_utils import generate_key
from .forms import *
from tinytag import TinyTag

from numpy import random
import numpy as np
from operator import attrgetter
import asyncio
from time import sleep
import httpx
from asgiref.sync import sync_to_async
import math, requests



# Create your views here.
##########################################

#       1. invait all  views  verjum 169, 226 279
#       2 . dnel comment ayn texer@ vortex invaint ka



#################################################
def autocomplete(request):
    
    qs = models.Profile.objects.filter(first_name=request.GET.get('sum')).exclude(first_name=request.user.profile.first_name)
    print(request.POST.get('sum'))
    data = list()
    for product in qs:
        data.append(product.first_name)
        
    #data = [product.first_name for product in qs]
    print(data)
    gh = {
    'f':qs,
    }
    return JsonResponse(data, safe=False)
    

def search_status(request):

    if request.method == "POST":
        search_text = request.POST.get('search_text')
        if search_text is not None and search_text != u"":

            search_text = request.POST.get('search_text')
            statuss = Profile.objects.filter(first_name__icontains = search_text).exclude().order_by()
            data = list()
            
            print(statuss)
        else:
            data = list()
            
            print(search_text)
            

        return JsonResponse(serializers.serialize('json', statuss),safe=False)
       


def search_status_music(request):

    if request.method == "POST":
        search_text = request.POST.get('search_text')
        if search_text is not None and search_text != u"":

            search_text = request.POST.get('search_text')
            statuss = models.Song.objects.filter(title__icontains = search_text)
            data = list()
            
            print(statuss)
        else:
            data = list()
            
            print(search_text)
            

        return JsonResponse(serializers.serialize('json', statuss),safe=False)
       
def se(request):
    return render(request, 'accounts/k.html')

@csrf_protect
def sign_in(request):
    if not request.user.is_authenticated:
        form = AuthenticationForm()
        if request.method == 'POST':
            form = AuthenticationForm(data=request.POST)
            print("l")
            if form.is_valid():
                print("l")
                if form.user_cache is not None:
                    user = form.user_cache
                    if user.is_active:
                        login(request, user)
                        return HttpResponseRedirect(
                            reverse('home')  # TODO: go to profile
                        )
                    else:
                        messages.error(
                            request,
                            "That user account has been disabled."
                        )
                else:
                    messages.error(
                        request,
                        "Username or password is incorrect."
                    )
                    print("aaa")
        return render(request, 'accounts/index_log_in_l.html', {'form': form, 'sign_in':"sign_in"})
    else:
        return redirect("accounts:post_home")


@csrf_protect
def sign_up(request):
    if not request.user.is_authenticated:


        form = UserRegistrationForm()
        #invite karox enq heto jnjel

        
        
        if request.method == 'POST':
            form = UserRegistrationForm(data = request.POST)
            if form.is_valid():
                print("aaa")
                form.save()
                user = authenticate(
                    username=form.cleaned_data['username'],
                    password=form.cleaned_data['password1']
                )
                login(request, user)
                messages.success(
                    request,
                    "You're now a user! You've been signed in, too."
                )
                return HttpResponseRedirect(reverse('accounts:edit_profile'))
            else:
                print("aa")
                      # TODO: go to profile


                 
                
        return render(request, 'accounts/index_log_in.html', {'form': form})
    else:
        return redirect("accounts:post_home")
        


@csrf_protect
def sign_up_facebook(request):
    social = request.user.social_auth.get(provider='facebook')

    first_name = social.extra_data['first_name']
    last_name = social.extra_data['last_name']
    email = social.extra_data['email']
    avatar = social.extra_data['picture']
    
    profile = request.user.profile
    if len(profile.first_name)!=0:
        print("pr")
        return redirect("accounts:post_home")
    else:
        pass
    


    form = UserRegistrationForm()
        #invite karox enq heto jnjel

        
        
    if request.method == 'POST':
        form = UserRegistrationForm(data = request.POST)
        if form.is_valid():
            print("aaa")
            form.save()
            user = authenticate(
                username=form.cleaned_data['username'],
                password=form.cleaned_data['password1']
            )
            login(request, user)
            messages.success(
                request,
                "You're now a user! You've been signed in, too."
            )
            return HttpResponseRedirect(reverse('accounts:edit_profile'))
        else:
            print("aa")
                  # TODO: go to profile


                 
                
    return render(request, 'accounts/login_facebook_profile.html', {'form': form, 'last_name':last_name, 'first_name':first_name, 'avatar':avatar, 'email':email})
    
        


@csrf_protect
def sign_up_invite(request, username_u,invite_code):
    form = UserRegistrationForm()
    #invite karox enq heto jnjel

    invite_code = invite_code
    
    if request.method == 'POST':
        form = UserRegistrationForm(data = request.POST)
        if form.is_valid():
            print("aaa")
            form.save()
            user = authenticate(
                username=form.cleaned_data['username'],
                password=form.cleaned_data['password1']
            )
            login(request, user)
            messages.success(
                request,
                "You're now a user! You've been signed in, too."
            )
            return HttpResponseRedirect(reverse('accounts:edit_profile'))
        else:
            print("aa")
                  # TODO: go to profile


              
            
    return render(request, 'accounts/index_log_in.html', {'form': form, "invite_code":invite_code, "username_u":username_u})
               
@csrf_protect
def sign_out(request):
    logout(request)
    messages.success(request, "You've been signed out. Come back soon!")
    return HttpResponseRedirect(reverse('home'))



def registration_user_exists(request):
    username = request.POST.get("username")
    if User.objects.filter(username=username).exists():
        message = 0

    else:
        message = 1


    return JsonResponse(message,safe = False)    



        
def registration(request):

    username = request.POST.get('username')
    password  = request.POST.get('password')
    email  = request.POST.get('email')
    first_name  = request.POST.get('first_name')
    description  = request.POST.get('description')
    pre =  request.POST.getlist('pre[]')
    file =  request.FILES.get(f'images{0}')
    sponsor = 1

    length =  request.POST.get('length')
    #invite karox enq heto jnjel
    invite_code =  request.POST.get('invite_code')
    user_name_l = request.POST.get('user_name')
   

    
    
    user = User.objects.create_user(username,  password=password)
    profile = get_object_or_404(models.Profile, user = user)
    if not invite_code!=None and user_name_l!=None:

        user_add_n = get_object_or_404(models.invite_users, invite_key = invite_code)

        
    


    profile.email = email
    profile.first_name=first_name
    profile.bio=description
    if int(sponsor)==1:
        profile.sponsor=True

    else:
        profile.sponsor=False

    if file==None:
        pass

    else:
        profile.avatar=file
        
    if models.profile_catgory.objects.filter(profile=profile).exists():
        pass

    else:
        models.profile_catgory.objects.create(profile=profile)
    t = get_object_or_404(models.profile_catgory, profile = profile)       
    print(t)

    for file_num in range(0, int(length)):
        name_var = request.POST.get(f'Category{file_num}')
        if  not models.category_choeses.objects.filter(name = name_var).exists():
            cat_g = models.category_choeses.objects.create(name = name_var)


        
        Category = get_object_or_404(models.category_choeses, name=name_var)
        if t.categories.filter(id=Category.id).exists():
            print(Category)
            print("Category1")
        else:
            t.categories.add(Category)
            print(Category)
            print("Category2")

    profile.save()
    #user_add_n.save()
    print(user)
    user = authenticate(request, username=username,
                    password=password)
    login(request, user)
    data = "data"
    if not invite_code!=None and user_name_l!=None:
    #invite karox enq heto jnjel
        user_k = models.invite_users.objects.filter(invite_key=invite_code, user=user_name_l)

        if len(user_k)>0:
            if user_k[0].user_n != None:
                return redirect("accounts:courses")

            else:
                print("success")
                user_add_n.user_n = user
                user_add_n.save()
                #return redirect("accounts:sign_up")
                return JsonResponse(data,safe=False)



        else:
            return redirect("accounts:courses")

    else:
        return JsonResponse(data,safe=False)


    return redirect("accounts:courses")    
    

def registration_facebook(request):

    
    email  = request.POST.get('email')
    first_name  = request.POST.get('first_name')
    description  = request.POST.get('description')
    pre =  request.POST.getlist('pre[]')
    file =  request.FILES.get(f'images{0}')
    sponsor = request.POST.get("sponsor")

    length =  request.POST.get('length')
    #invite karox enq heto jnjel
    invite_code =  request.POST.get('invite_code')
    user_name_l = request.POST.get('user_name')
   

    
    
    user = request.user
    profile = get_object_or_404(models.Profile, user = user)
    if not invite_code!=None and user_name_l!=None:

        user_add_n = get_object_or_404(models.invite_users, invite_key = invite_code)

        
    


    profile.email = email
    profile.first_name=first_name
    profile.bio=description
    if int(sponsor)==1:
        profile.sponsor=True

    else:
        profile.sponsor=False

    if file==None:
        pass

    else:
        profile.avatar=file
        
    if models.profile_catgory.objects.filter(profile=profile).exists():
        pass

    else:
        models.profile_catgory.objects.create(profile=profile)
    t = get_object_or_404(models.profile_catgory, profile = profile)       
    print(t)

    for file_num in range(0, int(length)):
        name_var = request.POST.get(f'Category{file_num}')
        if  not models.category_choeses.objects.filter(name = name_var).exists():
            cat_g = models.category_choeses.objects.create(name = name_var)


        
        Category = get_object_or_404(models.category_choeses, name=name_var)
        if t.categories.filter(id=Category.id).exists():
            print(Category)
            print("Category1")
        else:
            t.categories.add(Category)
            print(Category)
            print("Category2")

    profile.save()
    #user_add_n.save()
    
    data = "data"
    if not invite_code!=None and user_name_l!=None:
    #invite karox enq heto jnjel
        user_k = models.invite_users.objects.filter(invite_key=invite_code, user=user_name_l)

        if len(user_k)>0:
            if user_k[0].user_n != None:
                return redirect("accounts:courses")

            else:
                print("success")
                user_add_n.user_n = user
                user_add_n.save()
                #return redirect("accounts:sign_up")
                return JsonResponse(data,safe=False)



        else:
            return redirect("accounts:courses")

    else:
        return JsonResponse(data,safe=False)


    return redirect("accounts:courses")    
    

    
def login_o(request):
    username = request.POST.get("username")
    password = request.POST.get("password")
    user = authenticate(username=username, password=password)
    if user is not None:
        login(request, user)
        data = 1
    else:
        data = -1
        # No backend authenticated the credentials


    return JsonResponse(data,safe=False)    



@login_required
def profile(request, album_id):

    if  request.user.is_authenticated:
        profile = request.user.profile
      

    
        
    else:
        pass
        
    """Display User Profile"""
    

    album = get_object_or_404(models.Profile, pk=album_id)
    album1 = models.massage_q.objects.filter(customer=album)
    albums = models.profile_images.objects.filter(profile =album).order_by("-times")
    albums1 = models.arts.objects.filter(profile =album)
    shop_products= models.shop_create.objects.filter(shop_pr__pr=album.user)
    if  request.user.is_authenticated:
        a = models.Msg.objects.filter(receiverr = request.user, onread=False)
      

    
        
    else:
        pass
    
    ads_post = models.ads_tasks_executor_post.objects.filter(profile =album)
    
    result_list = sorted(
    chain(ads_post, albums),
    key=attrgetter('times'), reverse=True)

    if models.storie.objects.filter(profile_his=album).exists():
        storie = models.storie.objects.filter(profile_his=album)[0]

    else:
        storie = "no_storie"

    l = album.subscribe.count()
    l1 = album.subscribe1.count()
    print(album.subscribe.all())
    if  request.user.is_authenticated:
        if request.user == album.user:

            my_profile =album
            print('200')
            context = {
                'profile': profile,
                'album': album,
                'album1': album1,
                'albums_posts':albums,
                "albums1":albums1,
                
                'albums': albums,
                "shop_products":shop_products,
                'storie': storie,
                'l':request.user,
                'l1':l1,
                'l2':l,
                'user':album_id, 
                'my_profile':my_profile,
                'mes_len':len(a), "result_list":result_list

            }
        else:
            e = ''

            


            print('400')
            print(e)
            context = {
                'profile': profile,
                'album': album,
                'album1':album1,
                'albums_posts':albums,
                "shop_products":shop_products,
                'storie': storie,
                "albums1":albums1,
                
                'albums': albums,
                'l':request.user,
                'user':album_id, 
                'l1':l1,
                'l2':l,
                'e':e,
                'mes_len':len(a), "result_list":result_list
                

            }
           
            print('404')
      

    
        
    else:
        context = {
                'profile_status': "no_profile",
                'album': album,
                'album1':album1,
                'albums_posts':albums,
                "shop_products":shop_products,
                'storie': storie,
                "albums1":albums1,
                
                'albums': albums,
                
                'user':album_id, 
                'l1':l1,
                'l2':l,
                'e':e,
                "result_list":result_list
                

            }

    

        

   

    
    return render(request, 'accounts/profile.html', context)

def my_profile(request):
    """Display User Profile"""
    profile = request.user.profile
    album = get_object_or_404(models.Profile, pk=profile.pk)
    albums1 = models.arts.objects.filter(profile =album)
    albums = models.profile_images.objects.filter(Q(profile =album)).exclude(visible=False)
    shop_products= models.shop_create.objects.filter(shop_pr__pr=request.user)
    ads_post = models.ads_tasks_executor_post.objects.filter(profile =profile)
    
    result_list = sorted(
    chain(ads_post, albums),
    key=attrgetter('times'), reverse=True)

    

    a = models.Msg.objects.filter(receiverr = request.user, onread=False)
    if models.storie.objects.filter(profile_his=album).exists():
        storie = models.storie.objects.filter(profile_his=album)[0]

    else:
        storie = "no_storie"
    l = album.subscribe.count()
    l1 = album.subscribe1.count()
    my_profile = album
    data = {
        'al': album
    }
    page = request.GET.get('page', 1)

    paginator = Paginator(albums, 16)
    try:
        numbers = paginator.page(page)
    except PageNotAnInteger:
        numbers = paginator.page(1)
    except EmptyPage:
        numbers = paginator.page(paginator.num_pages)  

    return render(request, 'accounts/profile.html', {
        'profile': profile,
        'album': album,
        'my_profile': my_profile,
        'albums': numbers,
        'albums_posts':albums,
        'albums1': albums1,
        'storie':storie,
        "shop_products":shop_products,
        'l':request.user,
        'l1':l1,
        'l2':l,
        'mes_len':len(a),"ads_post":ads_post, "result_list":result_list
    })    

def profile_imagese(request):
    pk = request.POST.get("pk")
    files = models.postimage.objects.filter(post_id=pk)
    print(files)

    return JsonResponse(serializers.serialize('json', files),safe=False)


def arts_images_profile(request):
    pk = request.POST.get("pk")
    files = models.arts_images.objects.filter(art_id=pk)
    print(files)

    return JsonResponse(serializers.serialize('json', files),safe=False)


def profile_users(request):
    """Display User Profile"""

    albums = models.Profile.objects.filter(subscribe = request.user)


    
    return render(request, 'accounts/profile_users.html', {
        
        'albums': albums
    })

def profile_search(request, album_id):
    """Display User Profile"""
    if  request.user.is_authenticated:
        profile = request.user.profile
        user=Profile.objects.filter( Q(subscribe = request.user) & Q(subscribe1 = request.user)  )
        a = models.Msg.objects.filter(receiverr = request.user, onread=False)
      

    
        
    else:
        pass
    
    album = get_object_or_404(models.Profile, pk=album_id)
    albums = models.profile_images.objects.filter(profile =album)
    albums1 = models.arts.objects.filter(profile =album)
    shop_products= models.shop_create.objects.filter(shop_pr__pr=album.user)
    l = album.subscribe.count()
    l1 = album.subscribe1.count()
    
    
    form = donate_form(request.POST or None, request.GET or None)
    
    ads_post = models.ads_tasks_executor_post.objects.filter(profile =album)
    
    result_list = sorted(
    chain(ads_post, albums),
    key=attrgetter('times'), reverse=True)
    


    if models.storie.objects.filter(profile_his=album).exists():
        storie = models.storie.objects.filter(profile_his=album)[0]

    else:
        storie = "no_storie"
    print(albums)
    if  request.user.is_authenticated:
        if request.user == album.user:

            my_profile =album
            print('200')
            context = {
                'profile': profile,
                'album': album,
                'albums_posts':albums,
                'storie':storie,
                'form':form,
                'albums': albums,
                'albums1':albums1,
                "shop_products":shop_products,
                'l':request.user,
                'l1':l1,
                'l2':l,
                
                'user':album_id, 
                'my_profile':my_profile,
                'mes_len':len(a), "result_list":result_list

            }
        else:
            e = ''
            print("490")

            

            
            context = {
                'profile': profile,
                'album': album,
                
                'albums': albums,
                'albums_posts':albums,
                'albums1':albums1,
                'form':form,
                "shop_products":shop_products,
                'storie':storie,
                'l':request.user,
                'l1':l1,
               
                'l2':l,
                'e':e,
                'user':album_id, 
                "mes_len":len(a), "result_list":result_list
                

            }
      

    
        
    else:
        e = ''
        context = {
                'profile_status': "no_profile",
                'album': album,
                
                'albums': albums,
                'albums_posts':albums,
                'albums1':albums1,
                'form':form,
                "shop_products":shop_products,
                'storie':storie,
                
                'l1':l1,
               
                'l2':l,
                'e':e,
                'user':album_id, 
                "result_list":result_list
                

            }
    
        




    return render(request, 'accounts/profile.html', context)

def create_song(request, album_id):
    
   
   

    album = get_object_or_404(Profile, pk=album_id)

    if album.pk == request.user.profile.pk:  
        print(album_id,  request.user.profile.id)




        
            
        return render(request, 'accounts/create_song.html', {'albumid': album_id})

    else:
        context = {
        'album': album,
        
        
        }
        print(album.id)
        return render(request, 'accounts/create_song.html', context)
   
def images_post(request):
    length = request.POST.get('length')
    album_id = request.POST.get('pk')
    description = request.POST.get('description')
    user = request.user
    
    profile_catgory = get_object_or_404(models.profile_catgory, profile=user.profile) 
    file_type_file =  request.FILES.get(f'images{0}')
    print(file_type_file)
    file_type = str(file_type_file).split('.')[-1]
    file_type = file_type.lower()
    description_heshteg =  description.split()
    heshtegs = []
    des = []
    for i in range(len(description_heshteg)):
        if description_heshteg[i][0]=="#":
            print(description_heshteg[i])
            heshtegs.append(description_heshteg[i])


        else:
            des.append(description_heshteg[i])



    description_p = ''.join(des)   
    heshtegs_p = ''.join(heshtegs)  

    album = models.profile_images.objects.create(profile=user.profile, profile_catgory = profile_catgory, avatar_p = file_type_file, file_type=file_type, description=description_p)

    for i in range(len(heshtegs)):
        hesh = models.heshteg.objects.create(image_pr = album, heshtegs = heshtegs[i])


    for file_num in range(1, int(length)):
            avatar_ppp = request.FILES.get(f'images{file_num}')
            print(avatar_ppp)
            file_type1= str(avatar_ppp).split('.')[-1]
            file_type1 = file_type1.lower()

            models.postimage.objects.create(
                post=album,
                avatar_e=request.FILES.get(f'images{file_num}'),
                file_type=file_type1
                
            )


    album3 = models.profile_images.objects.filter(pk=album.pk)        



    for i in album3:
                    g = models.pr_time.objects.create(profile_post=i)
                    for hg in i.profile.subscribe.all():
                        if g.hh_o.filter(id=hg.id).exists():

                            pass
                        else:
                            g.hh_o.add(hg)


                        g.save() 
                        print(g.hh_o)        


    data = "d"  

    models.pr_time_pr_images.objects.create(pr_time=g, profile_post=album)      



    
    return JsonResponse(data,safe=False)        
        






def cccc_song(request):
    length = request.POST.get('length')
    album_id = request.POST.get('pk')
    print(album_id)



    album1 = get_object_or_404(models.Profile, pk=album_id)
    form = profile_imagesforms(request.POST or None, request.FILES or None, request.GET or None)
    
    form1 = heshtegforms(request.POST or None, request.GET or None)
    if request.method == 'POST':
        print(form)
        if form.is_valid():
             album = form.save(commit=False)
             album.profile = models.Profile.objects.get(pk=album_id)
             album.avatar_p = request.FILES.get(f'images{0}')

             file_type = album.avatar_p.url.split('.')[-1]
             file_type = file_type.lower()
             
    
             pr_categor = get_object_or_404(models.profile_catgory, profile=album1)
             album.profile_catgory = pr_categor
             album.file_type = file_type
             if file_type == "mp4":
                pass
                
             
            
            
            
                

            
        



        if album1 == request.user.profile:    
                album.save()
                

                album10 = get_object_or_404(models.profile_images, pk=album.id)
                album3 = models.profile_images.objects.filter(pk=album.pk)
                
            
                
                
                


                k = models.cg_ppp.objects.create(profile = album10.profile,profilep = album10, avatar_pp=album10.avatar_p, first_namep = album10.description, city_prp = album10.city_pr, comment_countp = album10.comment_count)
                for lj in album10.likes.all():
                    alm = get_object_or_404(models.cg_ppp, avatar_pp=album10.avatar_p)
                    alm.likesp.add(lj)
                    alm.save()
                    

                k.ggol.add(album10)

                if  form1.is_valid():
                    alf = form1.save(commit = False)
                    alf.image_pr = album10
                    lst = alf.heshtegs.split()
                    
                    k = 0
                    for k in range(len(lst)):
                        models.heshteg.objects.create(image_pr = album10, heshtegs = lst[k])

                        
                        
                        k =+ 1 



                    
                for i in album1.subscribe.all():
                    
                    album10.subscribe_post.add(i)
                    album10.save()

    
    for file_num in range(1, int(length)):
            avatar_ppp = request.FILES.get(f'images{file_num}')
            print(avatar_ppp)
            file_type1= str(avatar_ppp).split('.')[-1]
            file_type1 = file_type1.lower()

            models.postimage.objects.create(
                post=album,
                avatar_e=request.FILES.get(f'images{file_num}'),
                file_type=file_type1
                
            )
    album3i = models.profile_images.objects.filter(pk=album.pk) 
    print(album3i)       

    for i in album3:
                    g = models.pr_time.objects.create(profile_post=i)
                    for hg in i.profile.subscribe.all():
                        if g.hh_o.filter(id=hg.id).exists():

                            pass
                        else:
                            g.hh_o.add(hg)


                        g.save() 
                        print(g.hh_o)       

    return JsonResponse("data", safe=False)       


            
def crf_song(request):
    length = request.POST.get('length')
    title = request.POST.get('title')
    description = request.POST.get('description')
    album_id= request.POST.get('pk')
    image= request.POST.get('image')
    print(image)

    album1 = get_object_or_404(models.Profile, pk=album_id)

    k = models.profile_images.objects.create(profile = request.user.profile, avatar_p=image, first_name=title )




    album10 = get_object_or_404(models.profile_images, pk=k.id)

    album3 = models.profile_images.objects.filter(pk=k.pk)
    print(album3)
    for i in album3:

        g = models.pr_time.objects.create(profile_post=i)
        for hg in i.profile.subscribe.all():
            g.hh_o=hg
            g.save()

    
    lst = description.split()
                    
    inn = 0
    for inn in range(len(lst)):
        models.heshteg.objects.create(image_pr = album10, name = lst[inn])

                        
                        
        inn =+ 1 
    for i in album1.subscribe.all():
                    
                    album10.subscribe_post.add(i)
                    album10.save()
    for file_num in range(0, int(length)):
            models.postimage.objects.create(
                post=k,
                avatar_e=request.FILES.get(f'images{file_num}'),post1=g
            )
    return render(request, 'accounts/create_song.html')       




def delete_post(request, post_id):

    post_total = models.profile_images.objects.filter(pk=post_id)
    post = get_object_or_404(models.profile_images, pk=post_id)
    if (int(post.profile.id) == int(request.user.profile.id)):
        post_total.delete()


        return redirect("accounts:my_profile")

    else:    
        return redirect("accounts:my_profile")

def delete_cloud(request, pk):

    
    post = get_object_or_404(models.cloud, pk=pk)
    if (int(post.profile.id) == int(request.user.profile.id)):
        post_total = models.cloud.objects.filter(pk=pk).delete()


        return redirect("accounts:my_profile")

    else:    
        return redirect("accounts:my_profile")
def create_song2(request, album_id):
        album1 = get_object_or_404(models.Profile, pk=album_id)
        print("sss1")


        


        
        form = profile_imagesforms(request.POST or None, request.FILES or None, request.GET or None)
        form1 = heshtegforms(request.POST or None, request.GET or None)
        if form.is_valid():
            

            album = form.save(commit=False)
            album.profile = models.Profile.objects.get(pk=album_id)
            
            


            
            album.avatar_p = request.FILES['avatar_p']
            file_type = album.avatar_p.url.split('.')[-1]
            file_type = file_type.lower()
            

            if file_type not in IMAGE_FILE_TYPES:
                context = {
                    'album': album,
                    'form': form,
                    'error_message': 'Image file must be PNG, JPG, or JPEG',
                }
                return render(request, 'accounts/create_song.html', context)
            if album1 == request.user.profile:    
                album.save()
                

                album10 = get_object_or_404(models.profile_images, pk=album.id)
                album3 = models.profile_images.objects.filter(pk=album.pk)
                print(album3)
            
                for i in album3:
                    g = models.pr_time.objects.create(profile_post=i)
                    for hg in i.profile.subscribe.all():
                        g.hh_o=hg
                        g.save()
                
                


                k = models.cg_ppp.objects.create(profile = album10.profile,profilep = album10, avatar_pp=album10.avatar_p, first_namep = album10.first_name, city_prp = album10.city_pr, comment_countp = album10.comment_count)
                for lj in album10.likes.all():
                    alm = get_object_or_404(models.cg_ppp, avatar_pp=album10.avatar_p)
                    alm.likesp.add(lj)
                    alm.save()
                    

                k.ggol.add(album10)

                if  form1.is_valid():
                    alf = form1.save(commit = False)
                    alf.image_pr = album10
                    lst = alf.name.split()
                    
                    k = 0
                    for k in range(len(lst)):
                        models.heshteg.objects.create(image_pr = album10, name = lst[k])

                        
                        
                        k =+ 1 



                    
                for i in album1.subscribe.all():
                    
                    album10.subscribe_post.add(i)
                    album10.save()


               



            else:
                return render(request, 'accounts/create_song.html', {
                    'album': album,
                    'form': form,
                    "form1":form1,
                    'error_message': 'Image file must be PNG, JPG, or JPEG',
                })

            
            print(request.user.profile)

            albums = profile_images.objects.filter(profile =album1)
            return redirect('accounts:my_profile')
        if album1 == request.user.profile:
            context = {
                "form": form,
                "form1":form1,
            }
            return render(request, 'accounts/create_song.html', context)
        else:  
            return render(request, 'accounts/a.html')  

def create_song3(request, album_id):
        album1 = get_object_or_404(models.Profile, pk=album_id)
        print("sss1")


        


        
        form = profile_imagesforms(request.POST or None, request.FILES or None, request.GET or None)
        form2=file(request.POST or None, request.FILES or None, request.GET or None)
        form1 = heshtegforms(request.POST or None, request.GET or None)
        
            
        if album1.pk == request.user.profile.pk:
            context = {
                "form": form,
                "form1":form1,
                "form2":form2,
                "albumid":album1.id
            }
            return render(request, 'accounts/create_song.html', context)
        else:  
            return render(request, 'accounts/a.html')  

def cloud_upload(request):
    files = request.FILES.get(f'images{0}')
    
    
    file_type = str(files).split('.')[-1]
    file_type = file_type.lower()
    my_profile = get_object_or_404(Profile, pk = request.user.profile.pk)
    if my_profile.cloud_size_my_profile<=1:
        my_profile.cloud_size_my_profile+=files.size/(1024*1024*1024)
        print(my_profile.cloud_size_my_profile)
        if float(my_profile.cloud_size_my_profile+files.size/(1024*1024*1024))<=float(my_profile.cloud_size_max_value_my_plan):
           
            print("tr")
            my_profile.save()
        else:
            my_profile.save()

    else:
        print("error")
    if float(my_profile.cloud_size_my_profile+files.size/(1024*1024*1024))<=float(my_profile.cloud_size_max_value_my_plan):

        file_upload = models.cloud.objects.create(profile=request.user.profile, file=files, file_type=file_type, size=files.size)
        data="f"
    else:
        data = "error"

    return JsonResponse(data,safe=False)


def ajaxcloud_upload(request):
    
    if request.method == 'POST': 
        counter1 = request.POST.get("counter")
        objs = models.cloud.objects.filter(profile=request.user.profile)


        
        
        counter = int(counter1)
        
       
        obj = models.cloud.objects.filter(profile=request.user.profile).order_by('-times')[counter:][:15]
    
       
        
    return JsonResponse(serializers.serialize('json', obj),safe=False)

def ajax_cloud_files_get(request):
    name = request.POST.get("pk")
    #obj = get_object_or_404(models.cloud, pk=name)
    obj = models.cloud.objects.filter(pk=name)

   
    return JsonResponse(serializers.serialize('json', obj),safe=False)

def cloud_pricing_plan(request):




    return render(request, "accounts/index_cloud_pricing_plan.html", {"profile":request.user.profile})
def cloud_my_limit_add(request):
    this_point = request.POST.get("tarif_pay")
    size = request.POST.get("size")
    type_server_request = request.POST.get("type_server_request")

    profile = get_object_or_404(Profile, pk=request.user.profile.pk)
    if type_server_request=="money":

        indicator = 1

    else:
        indicator = 0
    
    
    if profile.cloud_size_max_value_my_plan<20 and indicator==1 and profile.mymoney>=float(this_point):
        
        profile.cloud_size_max_value_my_plan=int(size)
        profile.mymoney-=float(this_point)
        profile.save()
        data = {
        "res":"success"
        }

    elif profile.points>=float(this_point) and indicator==0:
        print(size)
        profile.cloud_size_max_value_my_plan=int(size)
        print(profile.cloud_size_max_value_my_plan)
        profile.points-=float(this_point)
        profile.save()
        print(profile.cloud_size_max_value_my_plan)

        data = {
        "res":"success_point"
        }
    else:
        data = {
        "res":"error"
        }


    return JsonResponse(data, safe=False)    



def edit_favorites(request):
    if request.is_ajax():
        message = "Yes, AJAX!"
    else:
        message = "Not Ajax"
    return HttpResponse(message)
def my_archive(request):
    archive_post = models.cloud_posts.objects.all()
    a = models.Msg.objects.filter(receiverr = request.user, onread=False)
    return render(request, "accounts/archive.html", {"archive_post":archive_post, "l":request.user, "profile":request.user.profile, "mes_len":len(a)})

def archive_post(request, pk):
   
    album = get_object_or_404(models.profile_images, pk=pk)
    album.visible= False
    album.save()
    
    if (int(album.profile.id) == int(request.user.profile.id)):
        models.cloud_posts.objects.create(profile=request.user.profile, profile_post=album)
        


        return redirect("accounts:my_archive")

    else:    
        return redirect("accounts:my_archive")


def unarchive_post(request, pk):
   
    album = get_object_or_404(models.profile_images, pk=pk)
    album.visible= True
    album.save()
    
    if (int(album.profile.id) == int(request.user.profile.id)):
        models.cloud_posts.objects.filter(profile=request.user.profile, profile_post=album).delete()
        


        return redirect("accounts:my_profile")

    else:    
        return redirect("accounts:my_profile")        
def hello(request):





    
    data = request.POST.get('name')
    data1 = request.POST.get('name1')
    s = data1.split('\\')
    print(s)

    user=request.user.profile.pk
    user1=request.user
    form = SongForm(request.POST or None)
    album = get_object_or_404(Profile, pk=user)

    
    album1 = Profile.objects.get(pk = user)
    song  = Song()
    song.album = album1
    song.song_title = data
    song.save()
    


   


    
    





    
    print(song, data)
    print(list(Song.objects.all()))









    
   
   
    return JsonResponse(data,safe=False)


def homes(request):
    
    
    
    
   
    return render_to_response('accounts/create_song.html')




def post_detail(request, song_id, album_id):
    album1 = get_object_or_404(models.Profile, pk=album_id)
    print(album1)
    
    
    profile = request.user.profile
    album = get_object_or_404(models.profile_images, pk=song_id, profile = album1)
    l = album.likes.count()
    numbers_list = models.all_us.objects.filter(imagecomment_us_id = song_id)


    


    comments  = models.comments.objects.filter(image_comment = album).order_by('-likes_comments_sum')  
    
    

    
    

    
    
    return render(request, 'accounts/detail.html', {'album':album,'l':l, 'comments':comments, 'profile':album1, 'numbers_list':numbers_list})
    

def comments_url(request):
    name = request.POST.get('name', None)
    id_post =  request.POST.get('id', None)
    print(name)
    album1 = get_object_or_404(models.Profile, pk=id_post)
    album = get_object_or_404(models.profile_images, pk=name, profile = album1)
    comments  = models.comments.objects.filter(image_comment = album).order_by('-likes_comments_sum')
    print(comments) 
    data = {
        

        'comments':comments, 
        


    }
    return JsonResponse(serializers.serialize('json', comments),safe=False)

    

def post_like(request):
    
    user = request.user
    id_user = request.POST.get('pk', None)
    my_profile = get_object_or_404(models.Profile, pk = request.user.profile.pk)
    
    album = get_object_or_404(models.profile_images, pk=id_user)
    profile_you =  get_object_or_404(models.Profile, pk=album.profile.pk)
    profile_you.likes_profile +=1

    a = str(id_user)
    
    print(profile_you.total_lavel_b)

    maximum = int(profile_you.lavel_dr)


    
    step = 1
    max_lavel = 2000000
    
    print(a)

    if album.likes.filter(id=user.id).exists():

            album.likes.remove(user)
            album.save()
            
            f = album.likes.count()
            my_profile.likes_count_pr-=1
            my_profile.my_frank.remove(album)
            my_profile.save()
            print(album.likes.filter())
            data = {
            'f':f,
            'a':a,
            'status':'False'

                    }
            
    else:
            album.likes.add(user)
            album.save()
            my_profile.likes_count_pr+=1
            my_profile.my_frank.add(album)
            my_profile.save()

            if int(profile_you.lavel_dr_s) >= profile_you.total_lavel:
                profile_you.lavel_dr_s = 0
                profile_you.lavel +=1


                if profile_you.total_lavel == max_lavel:
                    pass
                else:
                    profile_you.total_lavel *= 2 
                    profile_you.total_lavel_b *= 2 
              
            


            else:
                profile_you.lavel_dr_s += step

            print(profile_you.total_lavel, profile_you.lavel_dr_s)    





            profile_you.save()

            
            f = album.likes.count()
            print(album.likes.filter())
            data = {
            'f':f,
            'a':a,
            'status':'True'

                    }       

        

    return JsonResponse(data,safe=False)        

def arts_like(request):
    
    user = request.user
    id_user = request.POST.get('pk', None)
    
    album = get_object_or_404(models.arts, pk=id_user)
    profile_you =  get_object_or_404(models.Profile, pk=album.profile.pk)
    profile_you.likes_profile +=1

    a = str(id_user)
    
    print(profile_you.total_lavel_b)

    maximum = int(profile_you.lavel_dr)


    
    step = 1
    max_lavel = 2000000
    
    print(a)

    if album.likes.filter(id=user.id).exists():

            album.likes.remove(user)
            
            f = album.likes.count()
            print(album.likes.filter())
            data = {
            'f':f,
            'a':a,
            'status':'False'

                    }
            
    else:
            album.likes.add(user)
            if int(profile_you.lavel_dr_s) >= profile_you.total_lavel:
                profile_you.lavel_dr_s = 0
                profile_you.lavel +=1

                if profile_you.total_lavel == max_lavel:
                    pass
                else:
                    profile_you.total_lavel *= 2 
                    profile_you.total_lavel_b *= 2 
              
            


            else:
                profile_you.lavel_dr_s += step

            print(profile_you.total_lavel, profile_you.lavel_dr_s)    





            profile_you.save()
            
            f = album.likes.count()
            print(album.likes.filter())
            data = {
            'f':f,
            'a':a,
            'status':'True'

                    }       

        

    return JsonResponse(data,safe=False)        


    


    


def subscribe(request):
    userr = request.user
    id_user = request.POST.get('pk', None)
    album = get_object_or_404(models.Profile, pk=id_user)
    print(id_user)
    album1 = get_object_or_404(models.Profile, pk=userr.profile.pk)

    #album2 = get_object_or_404(models.profile_images, profile=album)
    sum_likes = album.subscribe.count()
    sum_likes1 = album1.subscribe1.count()
    
    if album.subscribe.filter(id=userr.profile.pk).exists():
            album1.podpiski = int(sum_likes1) - 1
            album.podpishiki = int(sum_likes) - 1
            album2 = models.profile_images.objects.filter(profile=album)[:2]
            album3 = models.profile_images.objects.filter(profile=album)
            print(album3)
            dfg = models.pr_time.objects.filter(profile_post__profile=album,hh_o=request.user)
            print(dfg)



            dfg.delete()
            
            
               
            

            
            
            
                
                
               
            
            
            
            #for i in album2:
            #    print(i.id)
            #    album3 = get_object_or_404(models.profile_images, id=i.id)
            #    album3.subscribe_post.remove(userr)
            #    print(album3.subscribe_post)    

                

            


            album.subscribe.remove(userr)
            #album2.subscribe_post.remove(userr)
            album.notsubscribe.add(userr)
            album1.subscribe1.remove(album.user)

            j = 'Follow'

            album1.save()
            album.save()
            
            f = album.subscribe.count()
            f1 = album1.subscribe1.count()
            
            
            
            
    else:
            album1.podpiski = int(sum_likes1) + 1
            album.podpishiki = int(sum_likes) + 1
            #album2 = models.profile_images.objects.filter(profile=album)
            album2 = models.profile_images.objects.filter(profile=album).order_by("-times")[:2][::-1]
            print(album2)
            
            for i in album2:
                k = models.pr_time.objects.create(profile_post=i)

                if k.hh_o.filter(id=request.user.id).exists():
                    pass
                else:
                    k.hh_o.add(request.user)
                    
                
                

                
                

                


            #for i in album2:
            #    print(i.id)
            #    album3 = get_object_or_404(models.profile_images, id=i.id)
            #    album3.subscribe_post.add(userr)
            #    print(album3)

            
            album.subscribe.add(userr)
           
            album1.subscribe1.add(album.user)
            album.notsubscribe.remove(userr)
            j = 'UnFollow'

            
            album1.save()
            album.save()
    #        
            f1 = album1.subscribe1.count()

            
            f = album.subscribe.count()
            
           


    #if album1.subscribe1.filter(id=user.id).exists():
#
    #        album1.subscribe1.remove(user)
    #        
    #        f1 = album1.subscribe1.count()
    #        print(album1.subscribe1.filter())
    #        
    #        
    #else:
    #        album1.subscribe1.add(user)
    #        
    #        f1 = album1.subscribe1.count()
    #        print(album1.subscribe1.filter())
    #                           

    data = {
            'f':f,
            'f1':f1,
            'j':j,

            }

    return JsonResponse(data,safe=False)   


def subscribe_view(request, album_id):
    album1 = get_object_or_404(models.Profile, pk=album_id)
    view = album1.subscribe.filter()
    a = models.Msg.objects.filter(receiverr = request.user, onread=False)
   
    return render(request, 'accounts/followers_view.html', {'view':view, 'profile':album1, "mes_len":len(a), "l":request.user})

def subscribe1_view(request, album_id):
    album1 = get_object_or_404(models.Profile, pk=album_id)
    view = album1.subscribe1.filter()
    a = models.Msg.objects.filter(receiverr = request.user, onread=False)
    
    return render(request, 'accounts/followers_view.html', {'view':view, 'fol':'fol', 'profile':album1,"mes_len":len(a), "l":request.user})    

def like_post(request):
    post_id = None
    if request.method == 'GET':
        post_id = request.GET.get('post_id')
    likes = 0
    if post_id:
        post = models.profile_images.objects.get(id=int(post_id))
        if post:
            post.likes += 1
            post.save()
            likes = post.likes
    return HttpResponse(likes)


def camera(request):
    return render(request, "accounts/cam_filter.html")



def comments(request):
    user = request.user
    id_user = request.POST.get('pk', None)
    name = request.POST.get('name', None)
    
    album = get_object_or_404(models.profile_images, pk=id_user)

    comments  = models.comments.objects.create(image_comment = album, comment_title= name, profile = request.user.profile)
    print(comments)
    album.comment_count = album.comment_count + 1
    album.save()
    comments.save()
    #numbers_list = models.all_us.objects.filter(imagecomment_us = album)
    
    #l = get_object_or_404(models.all_us, imagecomment_us_id = album.id)
   # h = get_object_or_404(models.comments, comment_title=commentse.comment_title)
    #print(h)

    #l.commentus = commentse
    #print(l.commentus)
    #l.save()
    

    g = comments.comment_title
    e = comments.profile
    print(e)
    
    a = 'dddd'


   #if album.usaer_comment.filter(id=user.id).exists():

   #        album.usaer_comment.remove(user)
   #        
   #        f = album.usaer_comment.count()
   #        print(album.usaer_comment.filter())
   #        data = {
   #        'f':f,

   #                }
   #        
   #else:
   #        album.usaer_comment.add(user)
   #        
   #        f = album.usaer_comment.count()
   #        print(album.usaer_comment.filter())
    data = {
            
        'f':g,
        'e':str(e)
        

            }       
    print(JsonResponse(data,safe=False))
        

    return JsonResponse(data,safe=False)



def comments_like(request):
    user = request.user
    id_user = request.POST.get('pk', None)
    
    album = get_object_or_404(models.comments, pk=id_user)
    sum_likes = album.likes_comments.count()

    if album.likes_comments.filter(id=user.id).exists():
           album.likes_comments_sum = int(sum_likes) - 1


           album.likes_comments.remove(user)
           
           f = album.likes_comments.count()
           album.save()
           
           data = {
           'f':f,
           'like_status':'False'
                   }
           
    else:
           album.likes_comments.add(user)
           album.likes_comments_sum = int(sum_likes) + 1
           
           f = album.likes_comments.count()
           album.save()
           print(album.likes_comments_sum)
           data = {
            
        'f':f,
        'like_status':'True'

            }       
    
        

    return JsonResponse(data,safe=False)       


def edit_prof(request):

    user  = request.user
    profile = get_object_or_404(models.Profile, user=user)
    f_name = request.POST.get("first_name")
    des = request.POST.get("description")

    

    email = request.POST.get("email")
    file = request.FILES.get(f'images{0}')
    
    
    
        
        
    profile.first_name = f_name
    profile.email=email
    profile.bio = des
    if (file==None):
        pass

    else:    
        profile.avatar=file
    profile.save()
    data="data"
    return JsonResponse(data, safe=False)





def saveprof(request):
    user = request.user
    profile = get_object_or_404(models.Profile, user=user)
   
        
    
    form = forms.ProfileForm(instance=profile)
    length = request.POST.get("length")
    length1 = request.POST.get("length1")
    print(length1)
    if models.profile_catgory.objects.filter(profile=profile).exists():
        pass

    else:
        models.profile_catgory.objects.create(profile=profile)  


    t = get_object_or_404(models.profile_catgory, profile = profile)       



    


    for file_num in range(0, int(length)):
        
        Category = get_object_or_404(models.category_choeses, name=request.POST.get(f'Category{file_num}'))
        if t.categories.filter(id=Category.id).exists():
            print(Category)
            print("Category1")
        else:
            t.categories.add(Category)
            print(Category)
            print("Category2")

            
            
    for file_num1 in range(0, int(length1)):

        Category1 = get_object_or_404(models.category_choeses, name=request.POST.get(f'noCategory{file_num1}'))
        if t.categories.filter(id=Category1.id).exists():

            t.categories.remove(Category1)
            print(Category1)
            print("Category3")
        else:
            print("Category")
    if request.method == 'POST':
        form = forms.ProfileForm(request.POST ,request.FILES or None ,request.GET or None, instance=profile)

        if form.is_valid():
            album = form.save(commit=False)
           


            

            
            
            
                

            form.save()
           
            messages.success(request, "Updated the Profile Successfully!")
        else:
            print("error")
    return render(request, 'accounts/edit_profile.html', {
        'form': form
    })
        
            
           

   

def home(request ,album_id):
    
    
    
   
    return render_to_response('accounts/create_song.html')



@login_required

def edit_profile(request):
    user = request.user
    profile = get_object_or_404(models.Profile, user=user)
    form = ProfileForm(instance=profile)
    if models.profile_catgory.objects.filter( profile=profile).exists():
        my_category = get_object_or_404(models.profile_catgory, profile=profile)
        
    else:
        my_category = models.profile_catgory.objects.create( profile=profile)


    l = models.category_choeses.objects.all()    

        

    if request.method == 'POST':
        form = forms.ProfileForm(request.POST ,request.FILES or None , instance=profile)
        if form.is_valid():
            album = form.save(commit=False)
            
            
            if not album.avatar:
                print(album.album_logo)
            else:
                pass
            form.save()
            messages.success(request, "Updated the Profile Successfully!")
            
            return render(request, 'accounts/profile.html', {
        'album': album
    })

    return render(request, 'accounts/iedit_profile.html', {
        'form': form, 
        'my_category':my_category, 
        'category':l,
        'profile':profile
    })


@login_required
def change_password(request):
    if request.method == 'POST':
        form = PasswordChangeForm(request.user, request.POST)
        if form.is_valid():
            user = form.save()
            update_session_auth_hash(request, user)
            messages.success(request, 'Your password was successfully updated!')
            return HttpResponseRedirect(reverse('accounts:profile'))
    else:
        form = PasswordChangeForm(request.user)
    return render(request, 'accounts/change_password.html', {
        'form': form
    })








def chat(request,id):
    user=request.user
    receiver=User.objects.get(id=id)
    album = get_object_or_404(models.Profile, pk=id)
    a1 = models.Msg.objects.filter(receiverr = request.user, onread=False)
    print(album, id)
    a = models.Msg.objects.filter(receiverr = request.user, onread=False).exclude(senderr=receiver)

    print(a)
    
    
    chat_sender=models.Msg.objects.filter(senderr=user,receiverr=receiver) | models.Msg.objects.filter(senderr=receiver,receiverr=user)


    
    

    
    data={
    'receiver':User.objects.get(id=id),
    'sender':request.user,
    'albumi':album
    }
    return render(request,'accounts/chat.html',{'data':data,'chat_sender':chat_sender, 'profile':user.profile, "mes_len":len(a1), "l":request.user})

def query_s(request):
    pk_s = request.POST.get("pk")
    pk_s1 = request.POST.get("pk1")
    profile_p = get_object_or_404(models.Profile, pk=pk_s)
    profile_p1 = get_object_or_404(models.Profile, pk=pk_s1)
    pre = models.Msg_query.objects.get(profile_query_sender=profile_p)
    pre1 = models.Msg_query.objects.get(profile_query_sender=profile_p1)
    if pre:
        print("aaaaa")

    else:
        pass

    if pre1:
        print("bbb")

    else:
        pass
        
        

    

        
    return JsonResponse("data",safe=False)


def all_user(request):
    user=Profile.objects.filter( Q(subscribe = request.user) & Q(subscribe1 = request.user)  )
    usera  = request.user.id
    ysu =  models.massage_q.objects.filter(customer1=request.user.profile)
    ysi = models.massage_q_apple.objects.filter(customer__in=user).exclude(Q(customer__in=request.user.subscribe.all()) | Q(customer__in=request.user.subscribe1.all()))
    ysmu = models.massage_q_apple.objects.filter(Q(customer=request.user.profile) | Q(customer1=request.user.profile)).exclude(Q(customer1__in=request.user.subscribe1.all()) & Q(customer1__in=request.user.subscribe.all()) ).exclude(Q(customer__in=request.user.subscribe1.all()) & Q(customer__in=request.user.subscribe.all()) )
    u = models.Msg.objects.filter( Q(receiverr = usera) | Q(senderr = usera))
    form = profile_imagesforms(request.POST or None, request.FILES or None, request.GET or None)
    form2=file(request.POST or None, request.FILES or None, request.GET or None)
    form1 = heshtegforms(request.POST or None, request.GET or None)
    sorted_by_profile = request.user.profile.myresiver.all().order_by("-mes_time")
    
    a = models.Msg.objects.filter(receiverr = request.user, onread=False)
    print(a)
    f = []
    g = []
    for i in a:
        f.append(i.receiverr)

    for i in a:
        g.append(i.senderr)  

 
     
    
    
    #for us in user: 
    #    
    #    f = models.Msg.objects.filter(receiverr = usera, senderr = User.objects.filter(id = us.id).last())
    #    print(f)
    return render(request,'accounts/indexmassage1.html',{'user_list':user,"sorted_by_profile":sorted_by_profile, 'form':form,'form1':form1,'form2':form2,'usera':u,'profile':request.user.profile, 'ysu':ysu, 'ysmu':ysmu | ysi, "mes_len":len(a), "mes_users":a, "user_i":request.user, "f":f, "g":g, "l":request.user})







def querymes(request, id_us):
    profile = get_object_or_404(models.Profile, pk=id_us)



    models.massage_q.objects.create(customer = request.user.profile, customer1=profile)
    return redirect("accounts:all_user")

    
def querymes_apple(request, id_us):
    profile = get_object_or_404(models.Profile, pk=id_us)
    profile1 = get_object_or_404(models.Profile, pk=request.user.profile.pk)



    models.massage_q.objects.get(customer1 = request.user.profile, customer=profile).delete()
    models.massage_q_apple.objects.create(customer1 = request.user.profile, customer=profile)
    if profile1.apple_mes_users.filter(id=profile.user.id).exists():
        pass


    
    else:
        profile1.apple_mes_users.add(profile.user)


    

    return redirect("accounts:all_user")


def com(request):
    sender = request.user
   
    
    


    receiver=User.objects.get(username=request.POST.get('receiver'))
    profile = get_object_or_404(models.Profile, user=receiver)
    profile1 = get_object_or_404(models.Profile, user=sender)
    chat=request.POST.get('msg')
    ms=request.POST.get('ms')
    profile.user_msg = chat
    
    

    profile1.user_msg = chat
    
        
   
    
    file = request.FILES.get('file')
    
    file_type = str(file).split('.')[-1]
    file_type = file_type.lower()
    print(file_type)
    profile1.mes_time = datetime.now()
    profile.mes_time = datetime.now()
    if not profile.myresiver.filter(user = sender).exists():
        profile.myresiver.add(profile1)
    if not profile1.myresiver.filter(user = receiver).exists():
        profile1.myresiver.add(profile)





    
    
    if file != None:
        if file_type=="jpg" or file_type=="png" or file_type=="webp": 
            er = "0"
            a = models.Msg.objects.create(receiverr=receiver,senderr=sender,chat=chat , file= file,file_type=file_type)

            

        else:
            er = "0"
            a = models.Msg.objects.create(receiverr=receiver,senderr=sender,chat=chat , file= file,file_type=file_type)
            
        data={
        'file':str(a.file),
        'er':er,
        'file_type':file_type


        }
        print(a.file)
    else:
        data={
        

        }
        print('sss')

    
        a = models.Msg.objects.create(receiverr=receiver,senderr=sender,chat=chat)
        profile.user_msg_id = a.id
    
    

        profile1.user_msg_id = a.id
        profile.save()
        profile1.save()


    

    return JsonResponse(data,safe=False)
def storie_view_list(request):
    st_list = models.storie.objects.filter(profile_his=request.user.profile)
    l  =request.user
    form = hitoryform(request.POST or None, request.FILES or None, request.GET or None)
    a = models.Msg.objects.filter(receiverr = request.user, onread=False)
    print(st_list)

    return render(request, "accounts/st_cabinet.html" ,{"st_list":st_list, 'profile':request.user.profile, "l":l, "mes_len":len(a), "form":form})


def storie_view_list_users(request):
    st_list = models.storie.objects.filter(profile_his=request.user.profile)
    l  =request.user
    a = models.Msg.objects.filter(receiverr = request.user, onread=False)

    print(st_list)

    return render(request, "accounts/storie_cabinet.html" ,{"st_list":st_list, 'profile':request.user.profile,"l":l, "mes_len":len(a)})


def receive_data(request):
    user=request.user
    receiver = User.objects.get(username=request.POST.get('receiver'))
    
    a= models.Msg.objects.filter(receiverr=user, senderr=receiver).last()
    b = models.Msg.objects.filter(receiverr=user, onread=False, senderr=receiver)
    print(len(b), "len")
    count_res_mes = len(b)
    for i in b:

        i.onread = True
        i.save()
    

    if a:
        if a.file!='':
           



            data={'id':a.id,'chat':a.chat, 'file':str(a.file),'ch':'ch','file_type':str(a.file_type), 'read':"read", 'count_res_mes':count_res_mes}
        else:
            data={'id':a.id,'chat':a.chat, 'ch':'ch1', 'read':"read", 'count_res_mes':count_res_mes}

            
    else: 
        data={}  


            
    return JsonResponse(data)
def unread_messages(request):
    a = models.Msg.objects.filter(receiverr=request.user, onread=False)
    print(a)
    if a:
        data = {
        "len":len(a),
        }
    else:
        data = {
            "len":"0",
            }
    
      
    return JsonResponse(data)

def new_message(request):
    user=request.user
    
    
    a= models.Msg.objects.filter(receiverr=user).last()
    b= models.Msg.objects.get(receiverr=user)
   
    

    if int(a.id) == int(request.user.profile.user_msg_id):
        count=1
        data={'count':"1"}

           


            
    else: 
        data={}  
        print(a.id)
        print(request.user.profile.user_msg_id)


            
    return JsonResponse(data)


def user_list(request, pk=None):
    """
    List all required messages, or create a new message.
    """
    if request.method == 'GET':
        if pk:
            users = User.objects.filter(id=pk)
        else:
            users = User.objects.all()
        serializer = UserSerializer(users, many=True, context={'request': request})
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        try:
            user = User.objects.create_user(username=data['username'], password=data['password'])
            Profile.objects.create(user=user)
            return JsonResponse(data, status=201)
        except Exception:
            return JsonResponse({'error': "Something went wrong"}, status=400)


def message_list(request, sender=None, receiver=None):
    """
    List all required messages, or create a new message.
    """
    if request.method == 'GET':
        messages = Message.objects.filter(sender_id=sender, receiver_id=receiver, is_read=False)

        serializer = MessageSerializer(messages, many=True, context={'request': request})
        for message in messages:
            message.is_read = True
            message.suma = message.id
            message.save()
            print(message.id)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = MessageSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


def register_view(request):
    """
    Render registration template
    """
    if request.user.is_authenticated:
        return redirect('chats')
    return render(request, 'accounts/register.html', {})


def chat_view(request):
    if not request.user.is_authenticated:
        return redirect('accounts:index')
    if request.method == "GET":
        return render(request, 'accounts/chat1.html',
                      {'users': User.objects.exclude(username=request.user.username),'profile':request.user.profile})


def message_view(request, sender, receiver):
    if not request.user.is_authenticated:
        return redirect('accounts:index')
    if request.method == "GET":
        return render(request, "accounts/messages.html",
                      {'users': User.objects.exclude(username=request.user.username),
                       'receiver': User.objects.get(id=receiver),
                       'messages': Message.objects.filter(sender_id=sender, receiver_id=receiver) |
                                   Message.objects.filter(sender_id=receiver, receiver_id=sender)})
def callajax(request):
    if request.method == 'POST': 
        counter1 = request.POST.get("counter")


        
        
        counter = int(counter1)
       
        obj = models.arts.objects.all()[counter:][:3]
        print(obj)
        
    return JsonResponse(serializers.serialize('json', obj),safe=False)

def callajaxmusic(request):
    if request.method == 'GET': 
        counter1 = request.GET.get("counter")


        
        
        counter = int(counter1)
        counter_obj = counter
        counter_obj1 = counter

        if counter!=0:
            counter_obj = counter-1
            counter_obj1 = counter-2

        print(counter_obj, counter_obj1)    

       
        obj = models.Song_res.objects.all().order_by('-pk')[counter_obj:][:2] 
        obj1 = models.Song.objects.all().order_by('-pk')[counter_obj1:][:1]

        posts = list(
            sorted(
                chain(obj,obj1),
                key=lambda objects: objects.created_at,
                reverse=True  # Optional
            ))  

        
        print(obj)
        
    return JsonResponse(serializers.serialize('json', posts),safe=False)

def music(request):
    a = models.musics.objects.all()
    return render(request, "accounts/music.html", {"a":a})

def ajax_like_musics(request):
    music_id = request.POST.get("pk")
    likes_indikator = request.POST.get("likes_indikator")
    if int(likes_indikator)!=1:
        musics = get_object_or_404(models.Song, pk = music_id)
    else:
        musics = get_object_or_404(models.Song_res, pk = music_id)
    
    if musics.likes.filter(id = request.user.id).exists():
        musics.likes.remove(request.user)
        data=0
    else:
        musics.likes.add(request.user)
        data=1

        

    return JsonResponse(data,safe=False) 

def ajax_books_likes(request):
    music_id = request.POST.get("pk")
    likes_indikator = request.POST.get("likes_indikator")
    
    if int(likes_indikator)!=1:
        books = get_object_or_404(models.books, pk = music_id)
    else:
        books = get_object_or_404(models.books_res, pk = music_id)
        
    if books.likes.filter(id = request.user.id).exists():
        books.likes.remove(request.user)
        data=0
    else:
        books.likes.add(request.user)
        data=1

        

    return JsonResponse(data,safe=False)         


def callajaxmusic_profile(request):
    if request.method == 'POST': 
        counter1 = request.POST.get("counter")


        
        
        counter = int(counter1)
       
        obj = models.musics.objects.all()[counter:][:16]
        print(obj)
        
    return JsonResponse(serializers.serialize('json', obj),safe=False)



def callajaxbooks(request):
    if request.method == 'POST': 
        counter1 = request.POST.get("counter")


        
        
        counter = int(counter1)
        counter_obj = counter
        counter_obj1 = counter
        count_obj1 = 1
        count_obj = 2

        if counter!=0:
            counter_obj = counter-1
            counter_obj1 = counter-2

        print(counter_obj, counter_obj1)  
        obj = models.books.objects.all()[counter_obj:][:count_obj] 
        
        if not obj:
            count_obj1 = 3
            counter_obj1 = counter
        obj1 = models.books_res.objects.all()[counter_obj1:][:count_obj1]
        if not obj1:
        
            
            count_obj = 3
            counter_obj = counter
            obj = models.books.objects.all()[counter_obj:][:count_obj] 
        if not obj1 and not obj:
            pass
        



       
        

        posts = list(
            sorted(
                chain(obj,obj1),
                key=lambda objects: objects.created_at,
                reverse=True  # Optional
            ))  

       
        
        print(counter_obj, counter_obj1, "counter_obj")
        
    return JsonResponse(serializers.serialize('json', posts),safe=False)    


def create_music(request):
    file = request.FILES.get(f'music{0}')
    file_name = request.POST.get(f'music_name{0}')

    print(str(file).split('.')[0])
    name = file_name

    
    description = request.POST.get('description')
    music = models.musics.objects.create(music=file, name=name,description=description, profile = request.user.profile)

    return JsonResponse("data", safe=False)
def create_books(request):
    file = request.FILES.get(f'books{0}')

    print(str(file).split('.')[0])
    name = str(file).split('.')[0]

    
    description = request.POST.get('description')
    music = models.books.objects.create(books=file, name=name,description=description, profile = request.user.profile)
    return JsonResponse("data", safe=False)

def create_st(request):
    file = request.FILES.get(f'books{0}')

    print(str(file).split('.')[0])
    name = str(file).split('.')[0]

    
    description = request.POST.get('description')
    music = models.books.objects.create(books=file, name=name,description=description, profile = request.user.profile)
    return JsonResponse("data", safe=False)  

def post_home(request):
    if  request.user.is_authenticated:
        
        recomindation_users = models.Profile.objects.filter().exclude(Q(user = request.user) ).order_by("?")[:5]

        user_follow = request.user.subscribe.all()
        story_us = models.Profile.objects.filter(boole =True, subscribe = request.user)
        story_us1 = models.storie.objects.filter(Q(profile_his__subscribe__id = request.user.id) & Q(new_storie_profiles=request.user.profile)).exclude(Q(profile_his=request.user.profile) )
        st = models.storie.objects.filter(Q(profile_his__subscribe__id = request.user.id) & ~Q(new_storie_profiles=request.user.profile)).exclude(Q(profile_his=request.user.profile) )
        my_story = models.Profile.objects.filter(boole =True, pk = request.user.profile.pk)
        profile = request.user.profile
        #ft = get_object_or_404(models.profile_catgory, profile = request.user.profile)
        #categor = ft.categories.all()
        obj_musics = models.Song_res.objects.all().order_by('?')[:5]
        
        a = models.Msg.objects.filter(receiverr = request.user, onread=False)
        print(profile.likes_count_pr)
        user_follow1 = request.user.subscribe.all()
        ar_p1 = models.profile_images.objects.filter().annotate(f = Count('likes') + Count("comment_count")).exclude(Q(profile__in = user_follow1) | Q(profile = request.user.profile ) ).exclude(visible=False).order_by("-times", "-f","-comment_count") | models.profile_images.objects.filter().annotate(f = Count('likes') + Count('comment_count')).exclude(Q(profile__in = user_follow1) | Q(profile = request.user.profile ) ).order_by("-times","-f", "-comment_count")
        items_po = []


        
        
        
        print("aki")
        arr = {
         "lisa":{
            "likes":2,
            "com":3, 
            

            }
            
           
            


        }
        v = {}

       
        
        

        
        if int(profile.likes_count_pr)>=100:
            ar_p = models.pr_time.objects.filter(profile_post__profile__subscribe=request.user, hh_o=request.user).exclude(Q(profile_post__profile = request.user.profile ) | Q(profile_post__visible=False )).order_by("-times") 
            
            recommendation_array_posts =  models.my_recommendations_post.objects.get(profile = request.user.profile)
            recommendation_array_posts_p =   recommendation_array_posts.posts.filter()
            prp = recommendation_array_posts_p
            #print("recommendation_array_posts_p",recommendation_array_posts_p)

            


            
                



        else:
            ar_p = models.pr_time.objects.filter(profile_post__profile__subscribe=request.user, hh_o=request.user).exclude(Q(profile_post__profile = request.user.profile ) | Q(profile_post__visible=False )).order_by("-times") 
            #recommendation_array_posts =  models.my_recommendations_post.objects.get(profile = request.user.profile)
            #recommendation_array_posts_p =   recommendation_array_posts.posts.filter()
            #print(recommendation_array_posts_p)
            prp = models.pr_time_pr_images.objects.filter(profile_post__profile__subscribe=request.user).exclude(Q(profile_post__profile = request.user.profile ) | Q(profile_post__visible=False )).order_by("-times") | models.pr_time_pr_images.objects.filter().exclude(Q(profile_post__profile = request.user.profile ) | Q(profile_post__visible=False )).exclude(Q(profile_post__profile__subscribe=request.user)).order_by("-times") 
            
            #print("recommendation_array_posts_p",recommendation_array_posts_p)

        
        
    else:
        recomindation_users = models.Profile.objects.filter().exclude().order_by("?")[:5]
        obj_musics = models.Song.objects.all().order_by('?')[:5]
        prp = models.pr_time_pr_images.objects.filter().exclude().order_by("-times")


        #return redirect('accounts:sign_up')


        

    
    
    print(prp)  
    

    p = prp.distinct()

        

    
   
    
    
    
   
    #key=attrgetter('profilep'))
    #for i in numbers_list:
    #    vi = models.profile_images.objects.get(profile = i)
    #    print(vi.likes)
    #    
#
    #print(vi)
    l = request.user

    #
   #
    if  request.user.is_authenticated:

        if str(request.user.profile.view_ads) == "context":
            ads_form = "context"


        
        else:
            ads_form = "$"
    else:
        ads_form = "context"

    




    
    
    
       


    
    
    page = request.GET.get('page')

    

    
   
    

    

    paginator = Paginator(p, 4)
   
    try:
        numbers = paginator.page(page)

       
       
    except PageNotAnInteger:
        numbers = paginator.page(1)
    except EmptyPage:
        numbers = paginator.page(paginator.num_pages)


    

       

    if  request.user.is_authenticated:
      

    
        return render(request, 'accounts/f.html', {'numbers': numbers ,'recomindation_users':recomindation_users,'l':l, 'profile':profile,'musics_form1':musics_form ,'story_us':st,'st':story_us1, 'my_story':my_story, "ads_form":ads_form, "mes_len":len(a), "obj_musics":obj_musics})
    else:
        return render(request, 'accounts/f.html', {'numbers': numbers ,'recomindation_users':recomindation_users,'musics_form1':musics_form , "ads_form":ads_form, "obj_musics":obj_musics, "profile_status":"no_profile"})




def post_home_all(request):
    k = 'd'


    user_follow1 = request.user.subscribe.all()

    #print(Count('likes'))
    profile = request.user.profile
    
    numbers_list1 = range(1, 1000)
    ft = get_object_or_404(models.profile_catgory, profile = request.user.profile)
    categor = ft.categories.all()
    #print(models.profile_images.objects.filter(profile_catgory__categories__in = categor))

    a = models.Msg.objects.filter(receiverr = request.user, onread=False)
    


    
    recomindation_users = models.Profile.objects.filter().exclude(Q(user = request.user) ).order_by("?")[:5]
    #for pro in models.profile_images.objects.all():
    #    
    #    es = get_object_or_404(models.Profile, pk = pro.profile.pk)
    #    for i in es.subscribe.all():
    #        if i.id != request.user.id:
    #            e = 's'
    #        else:
    #            e = 'f'
    #            

        
        #if es.subscribe.id != request.user.id:
        #    e = 's'
        #else:
        #    e = 'f'
            
   
    #for i in numbers_list:
    #    vi = models.profile_images.objects.get(profile = i)
    #    print(vi.likes)
    #    
#
    #print(vi)
    l = request.user
    profile_i = get_object_or_404(models.Profile, user=l)
    if int(request.user.profile.likes_count_pr)>=100:
            numbers_list = models.profile_images.objects.filter(profile_catgory__categories__in=categor).annotate(f = Count('likes') + Count("comment_count")).exclude(Q(profile__in = user_follow1) | Q(profile = request.user.profile ) ).exclude(visible=True).order_by("-times", "-f","-comment_count") | models.profile_images.objects.filter().annotate(f = Count('likes') + Count('comment_count')).exclude(Q(profile__in = user_follow1) | Q(profile = request.user.profile ) | Q(profile_catgory__categories__in=categor) ).order_by("-times","-f", "-comment_count")
            for i in numbers_list:
                arr.update({i.profile_post:{"likes":i.profile_post.likes.count(), "com":i.profile_post.comment_count}})

            
            def ls(pref , person1, person2):
                si={}

                
                

                
                for item in pref[person1]:
                    if item in pref[person2]:
                        si[item]=1

                        
                        

                if len(si)==0:
                    return 0

                c = np.corrcoef([pref[person1][item] for item in si], [pref[person2][item] for item in si])[0,1]
                print(c)
                
                if c>0.6:

                    pass    

                return c 


            def list_to_queryset(model, data):
                from django.db.models.base import ModelBase


                if not isinstance(model, ModelBase):
                    raise ValueError(
                        "%s must be Model" % model
                    )
                if not isinstance(data, list):
                    raise ValueError(
                        "%s must be List Object" % data
                    )

                pk_list = [obj.pk for obj in data]
                print(pk_list)

                return model.objects.filter(profile_post__pk__in=pk_list)    


             
            def get_recommendations(pref, person, similarity=ls):

                totals = {}
                sim_sums = {}
                names = []
                
                for other in pref:
                    if other==person:
                        continue
                    sim = similarity(pref, person, other)

                    if sim<=0:
                        continue
                    for item in pref[other]:




                        if item  in pref[person] or pref[person][item]==0:



                            totals.setdefault(item, 0)
                            totals[item]+=pref[other][item]*sim

                            


                            sim_sums.setdefault(item, 0)
                            sim_sums[item]+=sim
                    names.append(other)

                vk = []
                print(names[0], "klddd")

                mn = -1
                    
                for item, total in totals.items():
                    
                        mn+=1

                        if mn != len(names):
                            
                            vk.append((total/sim_sums[item],names[mn]))    
                        
                            

                    
                    


                print(vk, "aa")
                rank = [(total/sim_sums[item],item) for item, total in totals.items()]
                
                
                vk.sort()
                vk.reverse()
                for it in vk:
                    items_po.append(it[1])


                    

        
   



                
                q = list_to_queryset(models.profile_images, items_po)
                return q  

            ar_p = get_recommendations(arr, "lisa")

            


            
                



    else:

        ar_p = models.profile_images.objects.filter(profile_catgory__categories__in=categor).annotate(f = Count('likes') + Count("comment_count")).exclude(Q(profile__in = user_follow1) | Q(profile = request.user.profile ) ).exclude(visible=True).order_by("-times", "-f","-comment_count") | models.profile_images.objects.filter().annotate(f = Count('likes') + Count('comment_count')).exclude(Q(profile__in = user_follow1) | Q(profile = request.user.profile ) | Q(profile_catgory__categories__in=categor) ).order_by("-times","-f", "-comment_count")
             

    if str(profile_i.view_ads) == "content":
        ads_form = "context"


    
    else:
        ads_form = "$"
    #
   #
    #e = get_object_or_404(models.Profile, user=l)
    
    page = request.GET.get('page', 1)

    paginator = Paginator(ar_p, 4)
    try:
        numbers = paginator.page(page)
    except PageNotAnInteger:
        numbers = paginator.page(1)
    except EmptyPage:
        numbers = paginator.page(paginator.num_pages)

    return render(request, 'accounts/main_pr_post_all.html', {'numbers': numbers,'recomindation_users':recomindation_users, 'l':l, 'profile':profile, 'k':k,  "mes_len":len(a), "ads_form":ads_form})    






def url_c(request, user_m_id):
    profile_user_images = get_object_or_404(models.profile_images, pk=user_m_id)
    prof_user = request.user
    a = models.Msg.objects.filter(receiverr = prof_user, onread=False)
    return render(request, 'accounts/comments_all.html', {'profile':prof_user.profile,'profile_cm':profile_user_images,'user_cmm':prof_user, "mes_len":len(a), "l":request.user})
def create_history(request):
    length = request.POST.get('length')
    album_id = request.user.profile.pk
    file = request.FILES.get(f'images{0}')
    album1 = get_object_or_404(models.Profile, pk=album_id)


    print(album1, request.user.profile)


        
    

        
    
   
    
            
            


            
                                           
    
    file_type = str(file).split('.')[-1]
    file_type = file_type.lower()
    

    if file_type =="mp4":
        clip = VideoFileClip(file.temporary_file_path())
            
        

            
        frame_data = clip.get_frame(1)
        album = models.history.objects.create(profile_his=request.user.profile, avatar_a=file, file_type=file_type, duration=clip.duration)

        
        

         # 1 means frame at first second

        

       
               # reset pointer to start at 0 again
        
        
       
        

        
        
    else:  
        album = models.history.objects.create(profile_his=request.user.profile, avatar_a=file, file_type=file_type)

    if file_type not in IMAGE_FILE_TYPES:
        context = {
                'album': album,
                'form': form,
                'error_message': 'Image file must be PNG, JPG, or JPEG',
            }
        return render(request, 'accounts/create_history.html', context)
    if album1 == request.user.profile:


        album.save()

        album1.boole = True
        album1.save()
        if  int(len(models.storie.objects.filter(profile_his=album1))) != 0:
            print(len(models.storie.objects.filter(profile_his=album1)))
            storie =  get_object_or_404(models.storie, profile_his=album1)
            storie.new_storie = True
            storie.new_storie_profiles.clear()
            if storie.historys.filter(id=album.id).exists():
                pass
                print("aaa")
            else:
                print("bbb")
                    


                storie.historys.add(album)
            storie.save()



        else:    
            models.storie.objects.create(profile_his =album1 , stories=album, new_storie=True)
            md = get_object_or_404(models.storie ,profile_his =album1  )
            if md.historys.filter(id=album.id).exists():
                pass
                print("aaa")
            else:
                print("bbb")
                    


                md.historys.add(album)


                md.save()



                


               



        

            
        print(request.user.profile)



        albums = models.history.objects.filter(profile_his =album1)
        print(models.storie.objects.filter(profile_his =album1))
        
            
        

        return redirect('accounts:view_stories_story'  ,profile_pk=album_id)
    if album1 == request.user.profile:
        context = {
                "form": form,
            }
        return render(request, 'accounts/create_history.html', context)
    else:  
        return render(request, 'accounts/a.html')  


def create_stories(request):
    pk = request.POST.get("pk") 
    length = request.POST.get("length")
    image =  request.FILES.get(f'images{0}')
   
    album1 = request.user.profile
    print(image)
    file_type = image.split('.')[-1]
    file_type = file_type.lower()
    print(file_type)
    
    
    album = models.history.objects.create(profile_his=album1,avatar_a= image, file_type=file_type )


    if file_type =="mp4":
            clip = VideoFileClip(vid.temporary_file_path())
            
            album.duration = clip.duration

            
            frame_data = clip.get_frame(1)

        
        

         # 1 means frame at first second

        

       
               # reset pointer to start at 0 again
        
        
       
        

        
        
            

    if file_type not in IMAGE_FILE_TYPES:
        context = {
                'album': album,
                'form': form,
                'error_message': 'Image file must be PNG, JPG, or JPEG',
            }
        return render(request, 'accounts/create_history.html', context)
    if album1 == request.user.profile:


        album.save()

        album1.boole = True
        album1.save()
        if  int(len(models.storie.objects.filter(profile_his=album1))) != 0:
            print(len(models.storie.objects.filter(profile_his=album1)))
            storie =  get_object_or_404(models.storie, profile_his=album1)
            storie.new_storie = True
            storie.new_storie_profiles.clear()
            if storie.historys.filter(id=album.id).exists():
                pass
                print("aaa")
            else:
                print("bbb")
                    


                storie.historys.add(album)
            storie.save()



        else:    
            models.storie.objects.create(profile_his =album1 , stories=album, new_storie=True)
            md = get_object_or_404(models.storie ,profile_his =album1  )
            if md.historys.filter(id=album.id).exists():
                pass
                print("aaa")
            else:
                print("bbb")
                    


                md.historys.add(album)


                md.save()



                


               



    else:
        return render(request, 'accounts/create_history.html', {
                'album': album,
                'form': form,
                'error_message': 'Image file must be PNG, JPG, or JPEG',
            })

            
    print(request.user.profile)



    albums = models.history.objects.filter(profile_his =album1)
    print(models.storie.objects.filter(profile_his =album1))
        
            
        

    return redirect('accounts:view_stories_story'  ,profile_pk=album_id)
    if album1 == request.user.profile:
        context = {
                "form": form,
            }
        return render(request, 'accounts/create_history.html', context)
    else:  
        return render(request, 'accounts/a.html')  

def delete_history(request,history_id):
    models.history.objects.filter(pk = history_id).delete()

    return JsonResponse("data", safe=False)


def delete_storie(request, storie_id):

    storie = models.storie.objects.filter(pk=storie_id)
    st = get_object_or_404(models.storie, pk=storie_id)
    profile = get_object_or_404(Profile, pk=st.profile_his.pk)
    profile.boole = False
    profile.save()
    if int(request.user.profile.pk) == st.profile_his.pk:

        storie.delete()
    


        stories = models.history.objects.filter(profile_his = request.user.profile).delete()

    else:
        return redirect('accounts:post_home')
        

    return JsonResponse("data", safe=False)
def view_stories_story(request, profile_pk):
    stories = models.history.objects.filter(profile_his_id=profile_pk)
    l  =request.user
    a = models.Msg.objects.filter(receiverr = request.user, onread=False)
    if int(profile_pk) == request.user.profile.pk:
        return render(request, 'accounts/st_view_pictures.html', {'stories':stories, 'profile': request.user.profile,"l":l, "mes_len":len(a)})
    else:
        return redirect('accounts:post_home')

        

def story(request):
    story_us = models.Profile.objects.filter(boole =True)
    story = models.history.objects.filter(profile_his__in = story_us)

    return render(request, 'accounts/story_view.html' ,{'story_us':story_us, 'story':story,'profile': request.user.profile}) 

def story_view(request, album_id):
    story = models.history.objects.filter(profile_his_id = album_id)
    return render(request, 'accounts/story_view.html' ,{'story':story, 'profile': request.user.profile}) 

def delete_story(request, album_id, story_id):
    album1 = get_object_or_404(models.Profile, pk=album_id)
    if album1 == request.user.profile:


    
        instance = models.history.objects.get(pk=story_id)
        instance.delete()
        return render(request, 'accounts/a.html' ,{'story':story}) 
    else:
        return render(request, 'accounts/g.html' ) 

        
def story15(request):
    story1 = request.POST.get("pk")
    
    storie = get_object_or_404(models.storie, profile_his_id = story1)

    storie.storie_view_count +=1
    

    
    
    return render(request, 'accounts/aa.html')

    

def story14(request):
    story1=request.POST.get('pk')
    
    storie = get_object_or_404(models.storie, profile_his_id = story1)
    storie.storie_view_count +=1
    if storie.view_users.filter(id=story1).exists():
        pass
    else:
        if int(storie.profile_his.pk) == int(request.user.profile.pk):

            if storie.my_view.filter(id=story1).exists():
                pass
                

            else:
                storie.my_view.add(request.user.profile)
        else:
            
                
                

            storie.view_users.add(request.user.profile)
            storie.new_storie = False
            storie.new_storie_profiles.add(request.user.profile)

        

    storie.save()

    story = models.history.objects.filter(profile_his_id = story1)
    for stor in story:
        stor.users.add(request.user)
        stor.save()
    
    return JsonResponse(serializers.serialize('json', story), safe=False)

def g(request):
    story_us = models.Profile.objects.filter(boole =True)
    story = models.history.objects.filter(profile_his__in = story_us)

    return render(request, 'accounts/aa.html' ,{'story_us':story_us, 'story':story, 'profile':request.user.profile}) 
    
def heshteg(request, hesh_name):
    numbers_list = models.heshteg.objects.filter(heshtegs = hesh_name)
    
    a = models.Msg.objects.filter(receiverr = request.user, onread=False)

    return render(request, 'accounts/heshteg1.html', {'hesh':numbers_list, 'name':hesh_name, 'profile':request.user.profile, "mes_len":len(a), "l":request.user})






def ads_create(request, ads_profile):
    ads_profile_dd = get_object_or_404(Profile, pk=ads_profile)
    
    if ads_profile_dd.pk == request.user.profile.pk:
        form = ads(request.POST or None, request.FILES or None, request.GET or None)
        print('aaa')
        if form.is_valid():
            ads_form  = form.save(commit=False)
            ads_form.profile = request.user.profile
            ads_form.ads_file = request.FILES['ads_file']
            
            
            
            file_type = ads_form.ads_file.url.split('.')[-1]
            file_type = file_type.lower()
            if file_type not in ADS_FILE_TYPES:
                context = {
                    'ads_form': ads_form,
                    'form': form,
                    'error_message': 'Image file must be PNG, JPG, or JPEG',
                }
                return render(request, 'accounts/create_ads.html', context)
            else:
                ads_form.save()
                ads_profile_dd1 = get_object_or_404(models.ads, pk=ads_form.pk)
                Category = get_object_or_404(models.category_choeses, name=ads_profile_dd1.Category)
                print(Category)

                



                   
                print("Category2")
                    



            return redirect("accounts:my_profile")

        return render(request, 'accounts/create_ads.html',{'form':form})    
    else:
        print('aab')

        return redirect("accounts:my_profile")

def ads_cabinet(request):
    profile_ads = models.Profile.objects.get(user_id = request.user.id)
    ads_int = models.ads.objects.filter(profile=profile_ads)
    return render(request, "accounts/ads_cabinet.html" , {'profile':profile_ads, 'colums':ads_int})
def  my_products(request):
    profile_ads = models.Profile.objects.get(user_id = request.user.id)
    store_c = get_object_or_404(models.shop, pr=request.user)
    ads_int = models.shop_create.objects.filter(shop_pr__pr=request.user)
    return render(request, "accounts/shop_cabinet.html" , {'profile':profile_ads, 'colums':ads_int,'store_c':store_c})

def ads_detail(request, ads_profile):
    adss = models.ads.objects.filter(profile = request.user.profile)

    ads_profile_dd = get_object_or_404(Profile, pk=ads_profile)
    
    if ads_profile_dd.pk == request.user.profile.pk:

        return render(request, 'accounts/detail_ads.html', {'adss':adss})

    else:
        return redirect("accounts:my_profile")
        




def ads_view(request):
    Ads =  models.ads_tasks.objects.all().order_by('?')[:1]
    pk  = request.POST.get('pk')
    print(pk)
    k_yes_no = 0

    for i in Ads:

        e = i.profile
        file = i.ads_manager.file_name
        
        if i.ads_manager.file != "":
            file = i.ads_manager.file
            k_yes_no = 1
       
        
        money = i.ads_manager.price
        category = i.ads_manager.Category
        pk1 = i.ads_manager.pk
    if Ads:
        data = {
        'e':str(e),
        'file':str(file),
        'money':str(money),
        'category':str(category),
        'pk':str(pk1),
        'pk1':str(pk),
        'data_status':"success",
        'k_yes_no':k_yes_no

        }
        print(e, file, money, category,k_yes_no,"k_yes_no" ,file)
        
    else:
        data = {
        
        'data_status':"error",

        }
       
       
    
    return JsonResponse(data,safe=False)

    

def add_money(request):
    money_ads = request.POST.get('money_ads_pk')
    pk_pr = request.POST.get('pk_pr')
   
    user_profile_pk = request.user.profile.pk
    user_profile = get_object_or_404(models.Profile, pk=user_profile_pk)
    post_profile = get_object_or_404(models.Profile, pk=pk_pr)
    money = get_object_or_404(models.ads_manager, pk=money_ads)
   
    
    post_profile.mymoney += float(money.price)
    maximum = int(user_profile.lavel_dr)


    
    step = 1
    ads_count_d_min = 10
    
    max_lavel = 2000000
    ads_q = user_profile.ads_count_day_q
    
    
            
    if int(user_profile.lavel_dr_s) >= user_profile.total_lavel:
        user_profile.lavel_dr_s = 0
        user_profile.lavel +=1
        user_profile.ads_count_day_q+=2

        ads_q+=2
        user_profile.ads_count_day+=ads_count_d_min*ads_q


        if user_profile.total_lavel == max_lavel:
            pass
        else:
            user_profile.total_lavel *= 2 
            user_profile.total_lavel_b *= 2 
            


    else:
        user_profile.lavel_dr_s += step
        user_profile.points+=1
        if int(user_profile.ads_count_day)!=0:
            user_profile.ads_count_day -= 1

    print(user_profile.total_lavel, user_profile.lavel_dr_s)    





            

    



    money.profile_ads_m.mymoney -= money.price



    user_profile.save()
    post_profile.save()
    money.save()
    print(user_profile.mymoney, post_profile.mymoney, money.price)
    dataa = {
    'profile_money':str(user_profile.mymoney)

    }
    
    return JsonResponse(dataa,safe=False)













def shop(request):


    
    

    


        
    form = shopforms(request.POST or None, request.FILES or None, request.GET or None)
        
    if form.is_valid():
        album = form.save(commit=False)
        album.pr = request.user
        album.logo = request.FILES['logo']
        file_type = album.logo.url.split('.')[-1]
        file_type = file_type.lower()
        if file_type not in IMAGE_FILE_TYPES:
            context = {
                    'album': album,
                    'form': form,
                    'error_message': 'Image file must be PNG, JPG, or JPEG',
                }
            return render(request, 'accounts/create_shop.html', context)
        
            


        album.save()


    
    context = {

                "form": form,
            }
    return render(request, 'accounts/create_shop.html', context)
     
          


def shop_product_create(request):
    pk = request.POST.get('pk')

    name = request.POST.get('name')
    brand = request.POST.get('brand')
    descruption = request.POST.get('descruption')
    prise = request.POST.get('prise')
    length = request.POST.get('length')
    category = request.POST.get('category')
    print(category)


    product = get_object_or_404(models.shop, pk=pk)
    album_sh = models.shop_create.objects.create(shop_pr = models.shop.objects.get(pk =pk), name_pr = name, brand = brand, descruption=descruption, prise=prise, logo_pr=request.FILES.get(f'images{0}'), Category1d = category)
    
    for file_num in range(1, int(length)):
       

            models.shop_product_images.objects.create(
                shop_create=album_sh,
                image=request.FILES.get(f'images{file_num}'),
                
            )
    data = {
    'd': "success"
    
    }        

    return JsonResponse(data, safe=False)        


    




def shop_create(request, al_id):
    album1_4 = get_object_or_404(models.shop, pk=al_id)
    form  = shopcreateforms(request.GET or None, request.POST or None )
    
        
    
        
    
    if album1_4.pr.id == request.user.id:
        context = {
                
                'al_id': al_id, 
                "form":form
            }
        return render(request, 'accounts/create_shop_post.html', context)
    else:  
        return render(request, 'accounts/a.html')



 
def shop_main(request, al_id):
   alm =  models.shop_create.objects.filter(shop_pr_id =al_id)
   store = models.shop.objects.get(pk=al_id)

   print(alm)
   return render(request, 'accounts/index3.html', {'alb':alm, 'store':store, 'profile':request.user.profile})

def shio_k(request):
    return render(request, 'accounts/shop.html')

def shop_p(request):
   
    search_query = request.GET.get('q', '')
    a = "fdh-54er3#y^*_)14556aaf  cb"
    if search_query:
    
    
    
        posts = models.shop_create.objects.filter(name_pr = search_query)
        print(posts)
    else:
        posts = models.shop_create.objects.filter()






    return render(request, 'accounts/gn.html' ,{"posts":posts, 'profile':request.user.profile})

def shop_cart_add(request):
    items_s_pk = request.POST.get("pk")
    post_cart = models.shop_create.objects.get(pk = items_s_pk)
    if models.shop_cart.objects.filter(shop_cr=post_cart).exists():
        pass
    else:
        

        items_shop_add = models.shop_cart.objects.create(shop_cr=post_cart, user_profile=request.user)

   

    return JsonResponse("data", safe=False)
def shio_pr(request, k_id):
    post = models.shop_create.objects.get(pk = k_id)
    print(post)
    return render(request, 'accounts/index.html' ,{"post":post, 'profile':request.user.profile})



def shop_cart(request):
    cart_items = models.shop_cart.objects.filter(user_profile=request.user)
    return render(request, "accounts/cart_shop.html", {"cart":cart_items})

def shop_product_search(request):
        

        search_text = request.GET['q']
        print(search_text)
        print("search_text")
        statuss = models.shop_create.objects.filter(Q(name_pr__icontains = search_text)).exclude().order_by('-prise')
        print(statuss)
            
        
            

        return render(request, 'accounts/index2.html' ,{"post":statuss, 'profile':request.user.profile})


def store(request):
    data = cartData(request)

    cartItems = data['cartItems']
    order = data['order']
    items = data['items']

    products = models.Product.objects.all()
    context = {'products':products, 'cartItems':cartItems}
    return render(request, 'store/store.html', context)


def cart(request):
    data = cartData(request)

    cartItems = data['cartItems']
    order = data['order']
    items = data['items']

    context = {'items':items, 'order':order, 'cartItems':cartItems}
    return render(request, 'store/cart.html', context)

def checkout(request):
    data = cartData(request)
    
    cartItems = data['cartItems']
    order = data['order']
    items = data['items']
    print(items)

    context = {'items':items, 'order':order, 'cartItems':cartItems}
    return render(request, 'store/checkout.html', context)

def updateItem(request):
    data = json.loads(request.body)
    productId = data['productId']
    action = data['action']
    print('Action:', action)
    print('Product:', productId)

    customer = request.user.customer
    product = models.Product.objects.get(id=productId)
    order, created = models.Order.objects.get_or_create(customer=customer, complete=False)

    orderItem, created = models.OrderItem.objects.get_or_create(order=order, product=product)

    if action == 'add':
        orderItem.quantity = (orderItem.quantity + 1)
    elif action == 'remove':
        orderItem.quantity = (orderItem.quantity - 1)

    orderItem.save()

    if orderItem.quantity <= 0:
        orderItem.delete()

    return JsonResponse('Item was added', safe=False)

def processOrder(request):
    transaction_id = datetime.datetime.now().timestamp()
    data = json.loads(request.body)

    if request.user.is_authenticated:
        customer = request.user.customer
        order, created = models.Order.objects.get_or_create(customer=customer, complete=False)
    else:
        customer, order = guestOrder(request, data)

    total = float(data['form']['total'])
    order.transaction_id = transaction_id

    if total == order.get_cart_total:
        order.complete = True
    order.save()

    if order.shipping == True:
        models.ShippingAddress.objects.create(
        customer=customer,
        order=order,
        address=data['shipping']['address'],
        city=data['shipping']['city'],
        state=data['shipping']['state'],
        zipcode=data['shipping']['zipcode'],
        )

    return JsonResponse('Payment submitted..', safe=False)




def create_task(request, id_profile):
    form = task(request.POST or None, request.GET or None)
        
    if form.is_valid():
        album = form.save(commit=False)
        album.profile = request.user.profile
       
        


        album.save()


    
    context = {

                "form": form,
            }




    if int(request.user.profile.pk) == int(id_profile):
    



        return render(request, 'accounts/create_task.html', context)

    else:
        return render(request, 'accounts/create_task.html' )



def tasks(request):
    tasks = models.ads_tasks.objects.filter()

    t_suc = models.ads_tasks_executor_post.objects.filter(profile = request.user.profile)
    #tasks = models.assignment.objects.filter(Count__lte = request.user.profile.likes_profile) | models.assignment.objects.filter().exclude(Count__lte = request.user.profile.likes_profile)
    a = models.Msg.objects.filter(receiverr = request.user, onread=False)
    return render(request, 'accounts/tasks.html' ,{'tasks':tasks, 'profile': request.user.profile,"mes_len":len(a), "l":request.user, "t_suc":t_suc} )


def add_money_tasks(request):
    pk = request.POST.get("id")
    name = request.POST.get("name")
    task = get_object_or_404(models.assignment, id=pk)
    
    
    
    profile = get_object_or_404(models.Profile, id=name)
    profile.mymoney += task.prise 
    

    
    if task.users_task_success.filter(id=name).exists():
        pass

    else:
        
        task.users_task_success.add(request.user.profile)
        
        profile.save()

    
    data={
    'my_money': profile.mymoney,


    }    




        
   


    
    
    return JsonResponse(data, safe=False)



def watch(request):   


    profile = request.user.profile
    user_follow1 = request.user.subscribe.all()
    print(Count('likes'))
    profile = request.user.profile
    numbers_list1 = models.Profile.objects.filter()


    numbers_list = models.profile_images.objects.filter(file_type__in = noimages_FILE_TYPES).annotate(f = Count('likes') + Count('times')).exclude(Q(profile = request.user.profile )).order_by("-f", "-comment_count")
    print(numbers_list)
    #for pro in models.profile_images.objects.all():
    #    
    #    es = get_object_or_404(models.Profile, pk = pro.profile.pk)
    #    for i in es.subscribe.all():
    #        if i.id != request.user.id:
    #            e = 's'
    #        else:
    #            e = 'f'
    #            

        
        #if es.subscribe.id != request.user.id:
        #    e = 's'
        #else:
        #    e = 'f'
            
   
    #for i in numbers_list:
    #    vi = models.profile_images.objects.get(profile = i)
    #    print(vi.likes)
    #    
#
    #print(vi)
    l = request.user
    #
   #
    #e = get_object_or_404(models.Profile, user=l)
    
    page = request.GET.get('page', 1)

    paginator = Paginator(numbers_list1, 9)
    try:
        numbers = paginator.page(page)
    except PageNotAnInteger:
        numbers = paginator.page(1)
    except EmptyPage:
        numbers = paginator.page(paginator.num_pages)


    return render(request, 'watch/watch_main.html',  {'numbers': numbers, 'l':l, 'profile':profile})
 


 #arts
def arts(request):
    arts = models.arts.objects.filter()
    l = request.user
    #
   #
    #e = get_object_or_404(models.Profile, user=l)
    
    page = request.GET.get('page', 1)

    paginator = Paginator(arts, 9)
    try:
        numbers = paginator.page(page)
    except PageNotAnInteger:
        numbers = paginator.page(1)
    except EmptyPage:
        numbers = paginator.page(paginator.num_pages)

    return render(request, 'arts/arts_main.html' ,{"profile":request.user.profile, "numbers":numbers, "l":l})

def create_art(request, albui_id):

    album1 = get_object_or_404(models.Profile, pk=albui_id)
    print("sss1")


        


        
    form = artssw(request.POST or None, request.FILES or None, request.GET or None)
    
        
        
            
    if album1.pk == request.user.profile.pk:
        context = {
            "form": form,
               
            
            "albumid":album1.id
            }
        return render(request, 'arts/arts_create.html', context)
    else:  
        return render(request, 'accounts/a.html')      







def create_art_collection(request):

   


        


        
    form = arts_collection_forms(request.POST or None, request.FILES or None, request.GET or None)
    
        
        
            
   
    context = {
        "form": form,
               
            
        "albumid":request.user.profile.id
        }
    return render(request, 'arts/arts_collection_create.html', context)
        






def art_cr(request):
    length = request.POST.get('length')
    album_id = request.POST.get('pk')
    description = request.POST.get('description')
    file = request.FILES.get(f'images{0}')
    file_type = str(file).split('.')[-1]
    file_type = file_type.lower()
    profile_p=get_object_or_404(Profile, user=request.user)


    art = models.arts.objects.create(profile=request.user.profile, avatar_p = file, file_type=file_type, description=description, profile_image=profile_p.avatar, profile_name=profile_p.first_name) 
    if int(length) >1:
                 for file_num in range(1, int(length)):
                    avatar_ppp = request.FILES.get(f'images{file_num}')
                    print(avatar_ppp)
                    file_type1= str(avatar_ppp).split('.')[-1]
                    file_type1 = file_type1.lower()

                    models.arts_images.objects.create(
                        profile=art.profile,
                        art=art,
                        avatar_p=request.FILES.get(f'images{file_num}'),

                        
                        
                    )

    return JsonResponse("data", safe=False)                      

def arts_create(request):
    length = request.POST.get('length')
    album_id = request.POST.get('pk')
    print(album_id)



    album1 = get_object_or_404(models.Profile, pk=album_id)
    form = artssw(request.POST or None, request.FILES or None, request.GET or None)
    
    
    if request.method == 'POST':
        if form.is_valid:
             album = form.save(commit=False)
             album.profile = models.Profile.objects.get(pk=album_id)
             album.avatar_p = request.FILES.get(f'images{0}')


             file_type = album.avatar_p.url.split('.')[-1]
             file_type = file_type.lower()
             album.file_type = file_type
             
             album.save()
             if int(length) >1:
                 for file_num in range(1, int(length)):
                    avatar_ppp = request.FILES.get(f'images{file_num}')
                    print(avatar_ppp)
                    file_type1= str(avatar_ppp).split('.')[-1]
                    file_type1 = file_type1.lower()

                    models.arts_images.objects.create(
                        profile=album.profile,
                        art=album,
                        avatar_p=request.FILES.get(f'images{file_num}'),
                        
                        
                    )

                
             
            
            
            
                

            
        



        

    
    
      

    return JsonResponse("data", safe=False)            

def arts_collection_create(request):
    length = request.POST.get('length')
    album_id = request.POST.get('pk')
    print(album_id)



    album1 = get_object_or_404(models.Profile, pk=album_id)
    form = arts_collection_forms(request.POST or None, request.FILES or None, request.GET or None)
    
    
    if request.method == 'POST':
        if form.is_valid:
             album = form.save(commit=False)
             album.profile = models.Profile.objects.get(pk=album_id)
             
            
             
             album.save()
                
             
            
            
            
                

            
        



        

    
    
      

    return JsonResponse("data", safe=False)                    



def arts_collection_create(request):
    length = request.POST.get('length')
    album_id = request.POST.get('pk')
    print(album_id)



    album1 = get_object_or_404(models.Profile, pk=album_id)
    form = arts_collection_forms(request.POST or None, request.FILES or None, request.GET or None)
    
    
    if request.method == 'POST':
        if form.is_valid:
             album = form.save(commit=False)
             album.profile = models.Profile.objects.get(pk=album_id)
             
            
             
             album.save()
                
             
            
            
            
                

            
        



        

    
    
      

    return JsonResponse("data", safe=False)      


def arts_info(request):
    arts_id = request.POST.get("id")
    obj = get_object_or_404(models.arts, pk = arts_id)
    
    data = {
    'prise':obj.prise,


    }

    return JsonResponse("data", safe=False)

#SONGS


def home_my(request):
    song_res = models.Song_res.objects.all().order_by("?")
    latest_songs = models.Song.objects.all().order_by("?")[:6]

    song_main =list(
            sorted(
                chain(song_res,latest_songs),
                key=lambda objects: objects.created_at,
                reverse=True  # Optional
            ))  

    

    context = {
        'artists': models.Artist.objects.all(),
        'genres': models.Genre.objects.all()[:6],
        'latest_songs': models.Song.objects.all().order_by("?")[:6],
        'song_res':models.Song_res.objects.all().order_by("?"),
        'popilar_song': models.Song.objects.all().order_by("?")[:10],
        'popilar_song1': models.Song_res.objects.all().order_by("?")[:20],
        'song_main':song_main,

    }
    return render(request, "home1a.html", context)


def json_res(request, name):
    name1 = request.POST.get("url")
    #print(name1, request.body, "body")
    #l = str(request.body)
    #url_mys = l[11:len(l)-3]
    #name1 = name.replace("%20", " ")
    #name1 = name1.replace("+", " ")
    #print(url_mys)    
    """
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    content_name = body['name']
    content_url = body['url']



    obj = models.Song_res.objects.create(audio_id=generate_key(15, 15), title=content_name, song = content_url, status_x = "False")
    """
    
        #obj = models.Song_res.objects.create(audio_id=generate_key(15, 15), title=x['name'], song = x['url'], status_x = "False")
    return JsonResponse("data", safe=False)

def json_res_books(request, name):
    name1 = request.POST.get("url")
    print(name1, request.body, "body")
    l = str(request.body)
    url_mys = l[11:len(l)-3]
    name1 = name.replace("%20", " ")
    name2 = name1.replace("+", " ")
    print(url_mys)    
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    content_name = body['name']
    content_url = body['url']  

    obj = models.books_res.objects.create(name=content_name, books = content_url, status_x = "False")
    print("obj", obj)

    
    return JsonResponse("data", safe=False)    
def detail_song(request, audio_id):

    obj = models.Song.objects.filter(audio_id=audio_id)
    obj1 = models.Song_res.objects.filter(audio_id=audio_id)
    if obj:
        print("a", obj)
        k_obj = obj
        indikator = "1"

    else:
        print("b")
        k_obj = obj1
        indikator = "0"

    l = k_obj    


    print(l)   
    if request.user.is_authenticated:



        return render(request, "songs/show.html", {"indikator":indikator, "song":l[0]})
    else:
        return render(request, "songs/show.html", {"indikator":indikator, "song":l[0], "profile_status":"no_profile"})


class SongUploadView(CreateView):
    form_class = SongUploadForm
    template_name = "songs/create.html"

    @method_decorator(login_required(login_url=reverse_lazy('accounts:home')))
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(self.request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super(SongUploadView, self).get_context_data(**kwargs)
        context['artists'] = models.Artist.objects.all()
        
        return context

    def get_form_kwargs(self):
        kwargs = super(SongUploadView, self).get_form_kwargs()
        kwargs.update({'user': self.request.user})
        return kwargs

    def post(self, request, *args, **kwargs):
        form = self.get_form()
        return self.form_valid(form)
        

    def form_invalid(self, form):
        return JsonResponse(form.errors, status=200)

    def form_valid(self, form):
        song = TinyTag.get(self.request.FILES['song'].file.name)
        form.instance.audio_id = generate_key(15, 15)
        form.instance.user = self.request.user
        form.instance.playtime = song.duration
        form.instance.size = song.filesize
        artists = []
        for a in self.request.POST.getlist('artists[]'):
            try:
                artists.append(int(a))
            except:
                artist = Artist.objects.create(name=a)
                artists.append(artist)
        form.save()
        form.instance.artists.set(artists)
        form.save()
        data = {
            'status': True,
            'message': "Successfully submitted form data.",
            'redirect': reverse_lazy('accounts:upload-details', kwargs={'audio_id': form.instance.audio_id})
        }
        return JsonResponse(data)


class SongDetailsView(DetailView):
    model = models.Song
    template_name = 'songs/show.html'
    context_object_name = 'song'
    slug_field = 'audio_id'
    slug_url_kwarg = 'audio_id'



class GenreListView(ListView):
    model = models.Genre
    template_name = 'genres/index.html'
    context_object_name = 'genres'



class SongsByGenreListView(DetailView):
    model = models.Genre
    template_name = 'genres/songs-by-genre.html'
    context_object_name = 'genre'

    def get_context_data(self, **kwargs):
        context = super(SongsByGenreListView, self).get_context_data(**kwargs)
        context['songs'] = self.get_object().song_set.all
        return context


class ArtistListView(ListView):
    model = models.Artist
    template_name = 'artists/index.html'
    context_object_name = 'artists'


class ArtistDetailView(DetailView):
    model = models.Artist
    template_name = 'artists/show.html'
    context_object_name = 'artist'
    slug_field = 'slug'
    slug_url_kwarg = 'slug'

    def get_context_data(self, **kwargs):
        context = super(ArtistDetailView, self).get_context_data(**kwargs)
        context['songs'] = self.get_object().songs.all()
        return context


class FavoriteCreateView(CreateView):
    form_class = FavoriteForm
    http_method_names = ['post']

    def form_valid(self, form):
        form.instance.user = self.request.user
        return super(FavoriteCreateView, self).form_valid(form)

    def post(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            data = {
                'status': True,
                'message': "Please login first",
                'redirect': None
            }
            return JsonResponse(data=data)
        form = self.get_form()
        if form.is_valid():
            return self.form_valid(form)
        else:
            return self.form_invalid(form)


def favoriteunfavorite(request):
    if request.method == "POST":
        if request.POST.get('decision') == 'make':
            song = models.Song.objects.get(id=request.POST.get('song_id'))
            if not models.Favorite.objects.filter(user=request.user, song=song).exists():
                models.Favorite.objects.create(user=request.user, song=song)
                data = {
                    'status': True,
                    'message': "Song marked as favorite",
                    'redirect': None
                }
                return JsonResponse(data)
            else:
                data = {
                    'status': True,
                    'message': "Already favorite",
                    'redirect': None
                }

                return JsonResponse(data)
        else:
            song = models.Song.objects.get(id=request.POST.get('song_id'))
            models.Favorite.objects.filter(user=request.user, song=song).delete()
            data = {
                'status': True,
                'message': "Song unfavorited",
                'redirect': None
            }
            return JsonResponse(data)
    else:
        data = {
            'status': False,
            'message': "Method not allowed",
            'redirect': None
        }

        return JsonResponse(data)


class UnFavoriteView(DeleteView):
    model = models.Favorite

    def delete(self, request, *args, **kwargs):
        self.object = self.get_object()
        success_url = self.get_success_url()
        self.object.delete()
        data = {
            'status': True,
            'message': "Song unfavorited.",
            'redirect': None
        }

        return JsonResponse(data)


def add_playlist(request):
    name = request.POST.get("name")
    description = request.POST.get("description")
    files = request.FILES.get(f'images{0}')
    playlist = models.Playlist_init.objects.create(profile=request.user.profile, name = name,description = description, poster=files )

    data = "data"
    return JsonResponse(data, safe=False)

def add_audio_playlist(request):
    pk = request.POST.get("pk")
    song_pk = request.POST.get("song_pk")
    status = request.POST.get("status")
    print(pk, song_pk)
    model = get_object_or_404(models.Playlist_init, pk=pk)
    if status =="song":
        song = get_object_or_404(models.Song, pk=song_pk)
        if model.song.filter(id=song_pk).exists():
            pass

        else:
            model.song.add(song)
    else:
        song = get_object_or_404(models.Song_res, pk=song_pk)
        if model.song_res.filter(id=song_pk).exists():
            pass

        else:
            model.song_res.add(song)


    


    data = "data"
    return JsonResponse(data, safe=False)    


def get_ajax_playlist(request):
    playlists = models.Playlist_init.objects.filter(profile = request.user.profile , defoult_playlist=True)
    playlists_add = models.Playlist_init.objects.filter(profile = request.user.profile , defoult_playlist=False)

    return JsonResponse(serializers.serialize('json', playlists | playlists_add),safe=False)



def playlist_list(request):
    
    
    if  request.user.is_authenticated:
        playlists = models.Playlist_init.objects.filter(profile = request.user.profile , defoult_playlist=True)
        playlists_add = models.Playlist_init.objects.filter(profile = request.user.profile , defoult_playlist=False)
        
        a = models.Msg.objects.filter(receiverr = request.user, onread=False)
        user = request.user
        print(playlists)
        return render(request, 'songs/playlist.html',{'playlists': playlists,'playlists_add':playlists_add, "l":user, "mes_len":len(a), "profile":user.profile })
      

    
        
    else:
        return redirect("accounts:sign_in")

    


def myplaylist(request, playlist_id):
    playlist = get_object_or_404(models.Playlist_init, pk=playlist_id)
    print(playlist)
    
    a = models.Msg.objects.filter(receiverr = request.user, onread=False)
    user = request.user
    

    
    musics = playlist.song.all()
    musics_res = playlist.song_res.all()
    musics_main =list(
            sorted(
                chain(musics,musics_res),
                key=lambda objects: objects.created_at,
                reverse=True  # Optional
            ))  
    
        
    
    return render(request, 'songs/playlist_songs.html',{'musics': musics_main,"l":user, "mes_len":len(a), "profile":user.profile, "playlist":playlist })



def courses(request):
    courses = models.courses_profile.objects.filter(my_channel__subscribe=request.user.profile)
    return render(request, 'courses/index.html' ,{"courses":courses}) 

def create_videos(request):
    file = request.FILES.get(f'images{0}')
    name = request.POST.get("name")
    description = request.POST.get("description")
    pk = request.POST.get("pk")
    print(pk, "l")
    my_channel = get_object_or_404(models.my_channel, pk = pk)
    models.courses_profile.objects.create(profile=request.user.profile, my_channel=my_channel, name = name, description = description,video=file)
    data = "success"
    return JsonResponse(data, safe=False)
def channel_video(request, channel_id, video_id):
    channel_video = get_object_or_404(models.my_channel, pk=channel_id)
    video = get_object_or_404(models.courses_profile, pk = video_id)
    req = models.my_channel.objects.filter(subscribe=request.user.profile)
    a = models.Msg.objects.filter(receiverr = request.user, onread=False)
    video_comments = models.comments_courses.objects.filter(courses_profile_v=video)

    return render(request, "courses/video_main.html", {'video':video, 'channel_video':channel_video, "profile":request.user.profile, "req":req,"mes_len":len(a), "video_comments":video_comments})
def mychannel(request):
    my_channel = models.my_channel.objects.filter(profile = request.user.profile)
    profile_ch = models.my_channel.objects.filter(profile = request.user.profile)
    req = models.my_channel.objects.filter(subscribe=request.user.profile)

    my_videos = models.courses_profile.objects.filter(my_channel__in = my_channel)
    a = models.Msg.objects.filter(receiverr = request.user, onread=False)
    if  my_channel.exists():
        print(my_videos)
        data_req = {
        "my_videos":my_videos, 
        "profile":request.user.profile, 
        "my_channel":my_channel,
        "profile_ch":profile_ch,
        "req":req,"mes_len":len(a)

        }

    else:
        data_req = {
        "data_req":"data_req", 
        "profile":request.user.profile, "mes_len":len(a)


        }




    return render(request, 'courses/index_channel.html', context = data_req) 
def channels_o(request, ch_id):
    my_channel = models.my_channel.objects.filter(profile=request.user.profile)
    profile_ch = models.my_channel.objects.filter(pk=ch_id)

    my_videos = models.courses_profile.objects.filter(my_channel__in = profile_ch)
    req = models.my_channel.objects.filter(subscribe=request.user.profile)
    a = models.Msg.objects.filter(receiverr = request.user, onread=False)

    print(my_channel)

    data_req = {
        "my_videos":my_videos, 
        "profile":request.user.profile, 
        "my_channel":profile_ch,
        "profile_ch":profile_ch,

        "ch_other":"ch_other",
        "req":req,"mes_len":len(a)

        }
    


    if profile_ch[0].profile == request.user.profile:
        return redirect("accounts:mychannel")

    
    else: 
        pass




    return render(request, 'courses/index_channel.html', context = data_req) 

def create_mychannel(request):
    name = request.POST.get("name")
    description = request.POST.get("description")
    my_channel = models.my_channel.objects.create(profile = request.user.profile, name = name, description=description)
    data = "success"

    return JsonResponse(data, safe=False)

def likes_videos(request):
    pk = request.POST.get("pk")

    video = get_object_or_404(models.courses_profile, pk=pk)
    if video.likes.filter(pk=request.user.profile.pk).exists():
        video.likes.remove(request.user.profile)
        data = video.likes.count() 

    else:
        video.likes.add(request.user.profile)
        data = video.likes.count()

      


    return JsonResponse(data, safe=False)    

def subscribe_channel_v(request):
    pk = request.POST.get("pk")

    video = get_object_or_404(models.my_channel, pk=pk)
    if video.subscribe.filter(pk=request.user.profile.pk).exists():
        video.subscribe.remove(request.user.profile)
        data = {"count":video.subscribe.count(),
        "status":"remove", }


    else:
        video.subscribe.add(request.user.profile)
        data = {"count":video.subscribe.count(),
        "status":"add", }

      


    return JsonResponse(data, safe=False) 


def change_poster_in_channel(request):
    
    channel = get_object_or_404(models.my_channel, profile=request.user.profile)
    channel.poster = request.FILES.get(f'images{0}')
    channel.save()
    data = 1

    return JsonResponse(data, safe=False)

def game(request):
    if not request.user.is_authenticated:
        return render(request, "game/index.html", {"profile_status":"no_profile"})
    else:
        return render(request, "game/index.html")




def game_score_profile(request):
    score = request.POST.get("score")

    profile = get_object_or_404(models.Profile, pk=request.user.profile.pk)
    profile.lavel_dr_s += int(score)/100
    profile.points += int(score)/100
    print(int(score)/100, score, profile.points)
    profile.save()
    data = {
    "score":profile.lavel_dr_s,
    }

    return JsonResponse(data, safe=False)



def video_comment_add(request):
    pk = request.POST.get("pk")
    description = request.POST.get("description")
    print(pk, description)
    video_id = get_object_or_404(models.courses_profile, pk=pk)

    comments = models.comments_courses.objects.create(profile_com=request.user.profile, courses_profile_v=video_id, description=description)

    data = {
    "success":"success", 
    }


    return JsonResponse(data, safe=False)


def api(request):
    post = models.profile_images.objects.filter()
    response = serializers.serialize("json", post)

    return HttpResponse(response, content_type='application/json')


def api_like(request, pk):
    user = request.user
    like = 0
    
    post = get_object_or_404(models.profile_images, pk = pk)
    if post.likes.filter(id=user.id).exists():

            post.likes.remove(user)
            post.save()


    else:
        post.likes.add(user)
        post.save()
        like = 1

    response = {
        "like":like

    }

    return JsonResponse(response, safe=False)


def ads_manager(request):
    st_list = models.storie.objects.filter(profile_his=request.user.profile)
    l  =request.user
    form = hitoryform(request.POST or None, request.FILES or None, request.GET or None)
    a = models.Msg.objects.filter(receiverr = request.user, onread=False)
    print(st_list)
    ads = models.ads_manager.objects.filter(profile_ads_m=l.profile)

    return render(request, "accounts/ads_manager.html" ,{"st_list":ads, 'profile':request.user.profile, "l":l, "mes_len":len(a), "form":form})


def ads_manager_main(request, pk):
    st_list = models.storie.objects.filter(profile_his=request.user.profile)
    l  =request.user
    form = hitoryform(request.POST or None, request.FILES or None, request.GET or None)
    a = models.Msg.objects.filter(receiverr = request.user, onread=False)
    print(st_list)
    ad = models.ads_manager.objects.filter(profile_ads_m=l.profile)
    ad = get_object_or_404(models.ads_manager,pk=pk)

    return render(request, "accounts/manager_ads.html" ,{"ad":ad, 'profile':request.user.profile, "l":l, "mes_len":len(a), "form":form})
def ads_create(request):
    
    l  =request.user
   
    a = models.Msg.objects.filter(receiverr = request.user, onread=False)
   

    return render(request, "accounts/ads_create.html" ,{'profile':request.user.profile, "l":l, "mes_len":len(a)})
def add_ads_create(request):
    description = request.POST.get("description")
    min_auditory = request.POST.get("min_value")
    max_auditory = request.POST.get("max_value")
    Category = request.POST.get("Category")
    budget = request.POST.get("budget")
    name = request.POST.get("name")
    
    asia_ch =  request.POST.get("asia_ch")
    eu_ch =  request.POST.get("eu_ch")
    click_per = request.POST.get("click_per")
    url = request.FILES.get("url")
    urll = request.POST.get("urll")
    pk = request.POST.get("pk")
    print(description, min_auditory, max_auditory, Category, budget, name, asia_ch, eu_ch, click_per, url, pk, urll)
    ex = get_object_or_404(models.Profile, pk=pk)

    if urll!=None:
        ads = models.ads_manager.objects.create(description=description, min_auditory=min_auditory, max_auditory=max_auditory,budget=budget, Category=Category, profile_ads_m=request.user.profile, price=click_per, name=name, file_name = urll, executor=ex)
    else:
        ads = models.ads_manager.objects.create(description=description, min_auditory=min_auditory, max_auditory=max_auditory,budget=budget, Category=Category, profile_ads_m=request.user.profile, price=click_per, name=name, file = url, executor=ex)

    #ads = models.ads_manager.objects.create(description=description, min_auditory=min_auditory, max_auditory=max_auditory,budget=budget, Category=Category, profile_ads_m=request.user.profile, price=price, name=name)
    models.ads_tasks.objects.create(profile=request.user.profile, ads_manager=ads, executor=ex)
    return JsonResponse("data", safe=False)



def users_ads_recomedation(request):
    min_auditory = request.POST.get("min_auditory")
    max_auditory = request.POST.get("max_auditory")

    profiles = models.Profile.objects.annotate(num_participants=Count('subscribe')).filter(Q(num_participants__lte=int(max_auditory)) | Q(num_participants__gte=int(min_auditory))).order_by("-num_participants")

    

    
    



    return JsonResponse(serializers.serialize('json', profiles),safe=False)


def ads_data(request):
    pk = request.POST.get("pk")
    
    ads_m = models.ads_manager.objects.filter(pk=pk)
    #ads_m = get_object_or_404(models.ads_manager, pk = pk)


    
    

    return JsonResponse(serializers.serialize('json', ads_m),safe=False)
def add_ads_ex(request):
    pk = request.POST.get("pk")
    description = request.POST.get("description")
    print(pk, description)
    profile = request.user.profile
    ads_mn = get_object_or_404(models.ads_manager, pk=pk)
    ads_tasks = get_object_or_404(models.ads_tasks, ads_manager=ads_mn)
    print(pk, description, ads_tasks)
    models.ads_tasks_executor_post.objects.create(profile = profile, ads_tasks=ads_tasks, description=description)
  
    ads_tasks.save()



    return JsonResponse("data",safe=False)



def add_likes_ads(request):
    pk = request.POST.get("pk")
    ads_mn = get_object_or_404(models.ads_manager, pk=pk)
    profile = get_object_or_404(models.Profile, pk=request.user.profile.pk)
    if ads_mn.likes.filter(pk = request.user.pk).exists():
        pass
        

    else:    
        ads_mn.likes.add(request.user.profile)
        profile.lavel_dr_s+=0.2

    ads_mn.save() 
    profile.save()   


    return JsonResponse("success", safe=False)    
def invite_user(request, invite_code , username_u):
    user = models.invite_users.objects.filter(invite_key=invite_code, user=username_u)

    if len(user)>0:
        if user[0].user_n != None:
            print("error")

        else:
            print("success")
            #return redirect("accounts:sign_up")
            return HttpResponseRedirect(reverse("accounts:sign_up", args=[invite_code]))



    else:
        print("error")


    return JsonResponse("Error", safe=False)       

def main(request):
    return render(request, "accounts/index_main_p.html")



def tasks_ads(request):
    tasks = models.ads_tasks.objects.filter()

    t_suc = models.ads_tasks_executor_post.objects.filter(profile = request.user.profile)
    #tasks = models.assignment.objects.filter(Count__lte = request.user.profile.likes_profile) | models.assignment.objects.filter().exclude(Count__lte = request.user.profile.likes_profile)
    a = models.Msg.objects.filter(receiverr = request.user, onread=False)
    return render(request, "accounts/ads_tasks.html", {'tasks':tasks, 'profile': request.user.profile,"mes_len":len(a), "l":request.user, "t_suc":t_suc} )



def moneytization_indikator_change(request):
    pk = request.POST.get("pk")
    indikator = request.POST.get("indikator")
    post = get_object_or_404(models.profile_images, pk=pk)
    if indikator!="0":
        post.monetization_boole = True
        indikator_data_res = "1"

    else:
        post.monetization_boole = False
        indikator_data_res = "0"


    post.save()    

    data = {
    "indikator_data_res":indikator_data_res
    }    


    return JsonResponse(data, safe=False)    

async def http_call_async():
    print("dskjfk")
    for num in range(1,100):
        await asyncio.sleep(1)
        print(num)

   
  

async def async_view(request):
  loop = asyncio.get_event_loop()
  loop.create_task(http_call_async())
  return HttpResponse('Non-blocking HTTP request')


@sync_to_async
def crunching_stuff(pr_myposts_len, myposts, profile):
    if int(pr_myposts_len)>5:
        posts = models.profile_images.objects.filter().order_by("?")[:1000]
        posts_list = list(posts.values_list("comment_count").annotate(name=Count(F('likes'))))
        l = list(posts)
        print(l[0].likes.count(),l[7].likes.count(), "c", posts_list[0],  posts_list[7])
        print(posts_list, "bd")
        posts_list_objs = list(posts)
        
        
        
        myp_vector = myposts.values_list("comment_count").annotate(name=Count(F('likes')))
        myp_vector_list = list(myp_vector)
        print(list(myp_vector))
        def loop_posts_cos(my):
            r_indicator = 0
            #print("yes1", list(posts_list), "my", my)
        
            for i in posts_list[:]:
                
                sumx = 0
                sumy = 0
                sumtot = 0
                
                kr = list(i)
                #print(len(kr))
                for k in range(len(kr)):

                    sumx += my[k]*my[k]
                    
                    sumy += kr[k]*kr[k] 
                    
                    
                    sumtot += my[k]*kr[k]
                    
                #sprint(sumx, sumy, sumtot)
                if sumx != 0 or sumy  != 0:
                    #print(sumx, "sumx")
                    const = 1

                else:
                    const = 0

                            

                cos_xy = sumtot/(math.sqrt(sumx)*math.sqrt(sumy) + const)

                if cos_xy >= 0.5 :
                    print(posts_list_objs[r_indicator].comment_count, "slasjd", r_indicator, "aaa", posts[r_indicator].comment_count)
                    if not models.my_recommendations_post.objects.filter(profile = profile).exists():
                        recommendation_my_posts = models.my_recommendations_post.objects.create(profile=profile, user = profile.first_name)
                        pr_time_p = get_object_or_404(models.pr_time_pr_images, profile_post = posts[r_indicator])
                        recommendation_my_posts.posts.add(pr_time_p)
                    else:
                        recommendation_my_posts = get_object_or_404(models.my_recommendations_post, profile = profile)
                        pr_time_p = get_object_or_404(models.pr_time_pr_images, profile_post = posts[r_indicator])

                        recommendation_my_posts.posts.add(pr_time_p)
                        
                        recommendation_my_posts.save()
                    #recommendation_my_posts = models.my_recommendations_post.objects.create(profile=profile, user = profile.first_name)
                    #recommendation_my_posts.posts.add(posts[i])
                    posts_list.remove(i)



                #print(sumx, sumy, "cos", cos_xy)  
                r_indicator+=1 
                    
        for j in myp_vector_list:
            
            #print(j, "kr_my")
            loop_posts_cos(list(j))
        

        
    
        

    else:
        print(myposts)

        
    #for num in range(1,100):
        #sleep(1)
        #print(num)
    print("Woke up after 10 seconds!")

async def index109(request):
    json_payload = {
        "message": "Hello world"

    }
    profile = get_object_or_404(models.Profile, pk = request.user.profile.pk)
    pr_myposts_len =  len(profile.my_frank.all())
    myposts = profile.my_frank.all()
    print(len(myposts))
    
    

    """
    or also
    asyncio.ensure_future(crunching_stuff())
    loop.create_task(crunching_stuff())
    """
    asyncio.create_task(crunching_stuff(pr_myposts_len, myposts, profile))

    

    return HttpResponse("json_payload")



def payment(request):
    profile = request.user.profile
    return render(request, "accounts/payment.html", {"profile":profile})


def get_client_ip(requestg):
   x_forwarded_for = requestg.META.get('HTTP_X_FORWARDED_FOR')
   if x_forwarded_for:
       ip = x_forwarded_for.split(',')[0]
   else:
       ip = requestg.META.get('REMOTE_ADDR')
   return ip


def get_geolocation_for_ip(ip):
    url = f"http://api.ipstack.com/{ip}?access_key=d346685f6273f0a4b21f364090b9f9ea"
    response = requests.get(url)
    response.raise_for_status()
    return response.json()
def my_loc(request):

    geo_info = get_geolocation_for_ip(get_client_ip(request))
    print(geo_info["ip"])
    return HttpResponse(geo_info["ip"])

def books_all(request):
    books = models.books.objects.filter()
    books_1 = models.books_res.objects.filter()
    print(books_1)
    posts = list(
            sorted(
                chain(books,books_1),
                key=lambda objects: objects.created_at,
                reverse=True  # Optional
            ))  

    t_suc = models.ads_tasks_executor_post.objects.filter(profile = request.user.profile)

    #tasks = models.assignment.objects.filter(Count__lte = request.user.profile.likes_profile) | models.assignment.objects.filter().exclude(Count__lte = request.user.profile.likes_profile)
    a = models.Msg.objects.filter(receiverr = request.user, onread=False)
    return render(request, "accounts/books_all.html", {'books':posts, 'profile': request.user.profile,"mes_len":len(a), "l":request.user, "t_suc":t_suc} )
def books_data_all(request):
    pk = request.POST.get("pk")
    data_status = request.POST.get("data_status")
    if data_status=="False":
        obj = models.books_res.objects.filter(pk=pk)
    else:
        obj = models.books.objects.filter(pk=pk)


    return JsonResponse(serializers.serialize('json', obj),safe=False)

def music_view_all(request, status):
    if  request.user.is_authenticated:
        profile = request.user.profile
      

    
        
    else:
        pass
    counter_obj = 0
    musics_all = []
    if status == 'all':
        print("all")
        posts = list(
            sorted(
                chain(models.Song.objects.all().order_by("?"),models.Song_res.objects.all().order_by("?")[:200]),
                key=lambda objects: objects.created_at,
                reverse=True  # Optional
            ))  
    else:
        print("notall")
        posts = list(
            sorted(
                chain(models.Song.objects.all().order_by("?"),models.Song_res.objects.all().order_by("?")[:200]),
                key=lambda objects: objects.created_at,
                reverse=True  # Optional
            ))  
    
    



    page = request.GET.get('page')

    

    
   
    

    

    paginator = Paginator(posts, 16)
   
    try:
        numbers = paginator.page(page)

       
       
    except PageNotAnInteger:
        numbers = paginator.page(1)
    except EmptyPage:
        numbers = paginator.page(paginator.num_pages)
    print(numbers,len(posts))
    if  request.user.is_authenticated:
        return render(request, "accounts/music_view_all.html", {"profile":profile, 'numbers':numbers})
      

    
        
    else:
        return render(request, "accounts/music_view_all.html", {'numbers':numbers, "profile_status":"no_profile"})

    
def r(request):
    return render(request, "accounts/aa.html")


def call_music_all_json(request):
    if request.method == 'GET': 
        counter1 = request.GET.get("counter")


        
        
        counter = int(counter1)
        counter_obj = counter
        counter_obj1 = counter

        if counter!=0:
            counter_obj = counter-2
            counter_obj1 = counter-8

        print(counter_obj, counter_obj1)    

       
        obj_musics_p = models.Song_res.objects.all().order_by('-pk')[counter_obj:][:10] 
       

        

        
        
        
    return JsonResponse(serializers.serialize('json', obj_musics_p),safe=False)
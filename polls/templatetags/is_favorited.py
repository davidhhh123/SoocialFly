from django import template

from polls.models import Favorite, ads_manager, Profile
from django.shortcuts import render, redirect, get_object_or_404

register = template.Library()


@register.simple_tag(name='is_favorited')
def is_favorited(song, user, indicator):

	if indicator == "1":
		favorited = Favorite.objects.filter(user=user, song=song)
	else:
		favorited = Favorite.objects.filter(user=user, song1=song)
	if favorited:
		return 'remove'
	else:
		return 'make'
        
        
    


    	


    	
    



@register.simple_tag
def get_method(pk, pr_pk):
	ads_manager_p = get_object_or_404(ads_manager, pk = pk)
	profile = get_object_or_404(Profile, pk = pr_pk)

	if ads_manager_p.views.filter(pk = profile.pk).exists():
		pass

	else:	
		
		ads_manager_p.views.add(profile)
		ads_manager.save()
	
	print(ads_manager_p)
	return ads_manager_p.views.count()
	

    
    
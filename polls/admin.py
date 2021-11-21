from django.contrib import admin

from . import models

# Register your models here.
admin.site.register(models.Profile)
admin.site.register(models.Msg)
admin.site.register(models.ads)




class PostImageAdmin(admin.StackedInline):
	model=  models.postimage

@admin.register(models.profile_images)
class postadmin(admin.ModelAdmin):
	inlines = [PostImageAdmin]
	class Meta:
		model = models.profile_images
@admin.register(models.postimage)
class PostImageAdmin(admin.ModelAdmin):
	pass
admin.site.register(models.comments)
admin.site.register(models.comment_like)
admin.site.register(models.history)
admin.site.register(models.heshteg)
admin.site.register(models.pr_time)
admin.site.register(models.shop)
admin.site.register(models.shop_create)
admin.site.register(models.massage_q_apple)
admin.site.register(models.massage_q)
admin.site.register(models.arts)
admin.site.register(models.arts_images)
admin.site.register(models.category_choeses)
admin.site.register(models.profile_catgory)
admin.site.register(models.assignment)
admin.site.register(models.storie)
admin.site.register(models.musics)
admin.site.register(models.books)
admin.site.register(models.cloud)
admin.site.register(models.Playlist_init)
admin.site.register(models.Playlist)
admin.site.register(models.my_channel)
admin.site.register(models.pr_time_pr_images)
admin.site.register(models.ads_manager)
admin.site.register(models.ads_tasks_executor_post)

admin.site.register(models.invite_users)
admin.site.register(models.my_recommendations_post)
admin.site.register(models.Song_res)
admin.site.register(models.books_res)





class AuthorAdmin(admin.ModelAdmin):
    fields = ('invite_key', 'user')

class AuthorAdmin(admin.ModelAdmin):
    exclude = ('user_n',)







#admin.site.register(models.subscribe_users)

# Register your models here.



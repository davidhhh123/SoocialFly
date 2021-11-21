from django.urls import path, include

from . import views
from django.conf.urls import url

app_name = 'accounts'



urlpatterns = [
    path('sign_in/', views.sign_in, name='sign_in'),
    path('sign_up/', views.sign_up, name='sign_up'),
    path('sign_up/<username_u>/<invite_code>', views.sign_up_invite, name='sign_up_invite'),
    
    path('sign_out/', views.sign_out, name='sign_out'),
    path('profile/', views.my_profile, name='my_profile'),
    path('', views.post_home, name='post_home'),
    path('posts/', views.post_home_all, name='post_home_all'),
    path('camera/',views.camera,name='camera'),
    path('api/add_money_profile', views.add_money_tasks, name="add_money_tasks"),
    path('api/registration_user_exists', views.registration_user_exists, name="registration_user_exists"),
    
    path("api/registration/", views.registration, name="registration"),
    path("api/registration_facebook/", views.registration_facebook, name="registration_facebook"),
    
    path("api/login/", views.login_o, name="login_o"),
    
    url(r'^(?P<album_id>[0-9]+)/$', views.profile, name='profile'),
    url(r'^profile/(?P<album_id>[0-9]+)/$', views.profile_search, name='profile_s'),
    path('profile/users/', views.profile_users, name='profile_users'),
    path('api/edit_prof/', views.edit_prof, name='edit_prof'),
   
    path('profile/edit/', views.edit_profile, name='edit_profile'),
    url(r'^hello/', views.hello ,name ='hello' ),
    url(r'^hell/', views.saveprof ,name ='saveprof' ),
    url(r'^home/', views.home),
    url(r'^api/create_album/', views.images_post, name="images_post"),
    
    path('profile/change_password/', views.change_password, name='change_password'),
    path('story/', views.story, name='story'),
    url(r'^(?P<album_id>[0-9]+)/story/$', views.story_view, name='story_view'),
    url(r'^(?P<album_id>[0-9]+)/story/(?P<story_id>[0-9]+)/$', views.delete_story, name='delete_story'),

    #url(r'^(?P<album_id>[0-9]+)/create_song/$', views.create_song2, name='create_song2'),
    #url(r'^(?P<album_id>[0-9]+)/create_song/$', views.create_song, name='create_song2'),
    url(r'^(?P<album_id>[0-9]+)/create_song/$', views.create_song3, name='create_song2'),
    

   # url(r'^(?P<album_id>[0-9]+)/history/$', views.create_history, name='create_history'),
    
    path('shistory/', views.create_history, name='create_history'),

    path('music/', views.music, name='music'),
    path('api/likes_music', views.ajax_like_musics, name='ajax_like_musics'),
    path('api/ajax_books_likes', views.ajax_books_likes, name='ajax_books_likes'),
    

    url(r'^(?P<album_id>[0-9]+)/(?P<song_id>[0-9]+)/$', views.post_detail, name='post_detail'),
    url(r'^hom/', views.post_like, name=  'post_like'),
    url(r'^arts_like_oo/', views.arts_like, name=  'arts_like'),
    url(r'^hom1/', views.subscribe, name=  'subscribe'),
    url(r'^hom2/', views.comments, name=  'comments'),
    url(r'^hom3/', views.comments_like, name=  'comments_like'),
    url(r'^hom4/', views.comments_url, name=  'comments_url'),
    url(r'^homes/', views.homes, name=  'homes'),
    url(r'^story14/', views.story14, name=  'story14'),
    url(r'^story15/', views.story15, name=  'story15'),
    url(r'^stories/', views.storie_view_list, name=  'storie_view_list'),
    url(r'^api/create_st', views.create_st, name=  'create_st'),

    url(r'^stories_delete/(?P<storie_id>[0-9]+)/$', views.delete_storie, name=  'delete_storie'),
    url(r'^stories/storie/(?P<history_id>[0-9]+)/$', views.delete_history, name=  'delete_history'),
    url(r'^stories_view/(?P<profile_pk>[0-9]+)/$', views.view_stories_story, name=  'view_stories_story'),
  
    
    #url(r'^search/', views.search, name=  'search'),
    path('yyy/', views.se, name='se'),
    path('yy/', views.search_status, name='search_status'),
    path('yy_song/', views.search_status_music, name='search_status_music'),
    path('heshteg/<hesh_name>/', views.heshteg, name='heshteg'),
    path('eedd/', views.cccc_song, name='crf_song'),
    path('comments/<user_m_id>', views.url_c, name='url_c'),
    #path('shop/cart', views.shop_cart, name='shop_cart'),
    path('api/shop/product/', views.shop_product_create, name='api_product'),


    
   
    
    url(r'^(?P<album_id>[0-9]+)/followers$', views.subscribe_view, name='subscribe_view'),
    url(r'^(?P<album_id>[0-9]+)/followings$', views.subscribe1_view, name='subscribe1_view'),
    url(r'^(?P<ads_profile>[0-9]+)/ads_create$', views.ads_create, name='ads_create'),
    url(r'^(?P<ads_profile>[0-9]+)/ads_detail$', views.ads_detail, name='ads_detail'),
    path('ads_cabinet/', views.ads_cabinet, name='ads_cabinet'),
    path('api/cloud_upload', views.cloud_upload, name='cloud_upload'),
    path('api/ajaxcloud_upload', views.ajaxcloud_upload, name='ajaxcloud_upload'),
    path('api/ajax_cloud_files_get', views.ajax_cloud_files_get, name='ajax_cloud_files_get'),
    path('music_view_all/<str:status>', views.music_view_all, name='music_view_all'),

   



  
   
    path('messager/',views.all_user,name='all_user'),
    path('chat/<id>/',views.chat,name='chat1'),
    path('tasks/<id_profile>/create_task',views.create_task,name='create_task'),
    path('tasks/',views.tasks,name='tasks'),
    path('ads/der',views.add_money,name='mymoney_ads'),
    
    path('api/users/<int:pk>', views.user_list, name='user-detail'),
    path('api/users', views.user_list, name='user-list'),
    path('api/profile_imagese', views.profile_imagese, name='profile_images-liste'),
    path('api/profile_arts', views.arts_images_profile, name='arts_images_profile'),
    path('api/art_p', views.art_cr, name='art_cr'),
    path('api/unred_messages', views.unread_messages, name='unread_messages'),
    path('api/callajax', views.callajax, name='callajax'),
    path('api/create_music', views.create_music, name='create_music'),

    path('api/create_books', views.create_books, name='create_books'),
    path('api/callajaxmusic', views.callajaxmusic, name='callajaxmusic'),
    path('api/callajaxmusic_profile', views.callajaxmusic_profile, name='callajaxmusic_profile'),
    path('api/callajaxbooks', views.callajaxbooks, name='callajaxbooks'),
    path('api/archive/<pk>/', views.archive_post, name='archive_post'),
    path('api/unarchive/<pk>/', views.unarchive_post, name='unarchive_post'),
    path('delete_cloud/<pk>/', views.delete_cloud, name='delete_cloud'),
    path('archive/', views.my_archive, name='my_archive'),
    
    
    
    

    path('com',views.com,name='com'),
    path('conom',views.ads_view,name='ads_view'),
    path('receive_data',views.receive_data,name='receive_data'),
    path('chat', views.chat_view, name='chats'),
    path('chat/<int:sender>/<int:receiver>', views.message_view, name='chat'),
    path('api/messages/<int:sender>/<int:receiver>', views.message_list, name='message-detail'),
    path('api/messages', views.message_list, name='message-list'),
    path('api/new_mm', views.new_message, name='new_message'),
    path('api/add_cart', views.shop_cart_add, name='shop_cart_add'),
    path('g/', views.g, name='g'),
    #path('shop/create_store/', views.shop, name='shop'),

    #path('shop/my_products/', views.my_products, name='my_products'),
    #path('shop/<al_id>/create_product/', views.shop_create, name='shop_create'),
    #path('shop/<al_id>/', views.shop_main, name='shop_main'),
    #path('shop/', views.shop_p, name='shop_p'),
    path('sho/', views.shio_k, name='shio_k'),
    path('shop/product/<k_id>/', views.shio_pr, name='shio_pr'),
    path('delete_post/<post_id>/', views.delete_post, name='delete_post'),
    #path('shop/search/product', views.shop_product_search, name='shop_product_search'),
    path('s', views.store, name="store"),
    path('cart/', views.cart, name="cart"),
    path('checkout/', views.checkout, name="checkout"),
    path('api/query_s', views.query_s, name="query_s"),
    path('update_item/', views.updateItem, name="update_item"),
    path('process_order/', views.processOrder, name="process_order"),
    path('api/addquerymessage/<id_us>', views.querymes, name="querymes"),
    path('api/addquerymessageapple/<id_us>', views.querymes_apple, name="querymes_apple"),
    path('api/create_mychannel', views.create_mychannel, name="create_mychannel"),
    path('api/create_videos/', views.create_videos, name="create_videos"),
    
    path('channel/<channel_id>/video/<video_id>', views.channel_video, name="channel_video"),
    path('channel/<ch_id>/', views.channels_o, name="channels_o"),
    path('api/likes_videos', views.likes_videos, name="likes_videos"),
    path('api/subscribe_channel_v', views.subscribe_channel_v, name="subscribe_channel_v"),
    path('api/change_poster_in_channel', views.change_poster_in_channel, name="change_poster_in_channel"),
    
    




    #video

    path('watch/', views.watch, name="watch"),
    path('playlists/', views.playlist_list, name="playlist_list"),
    path('api/add_playlis1t/', views.add_playlist, name="add_playlist"),
    path('playlist/<playlist_id>', views.myplaylist, name="myplaylist"),
    path('api/get_ajax_playlist/', views.get_ajax_playlist, name="get_ajax_playlist"),
    path('api/add_audio_playlist/', views.add_audio_playlist, name="add_audio_playlist"),
    
    



    #arts
    path('arts/', views.arts, name="arts"),
    path('arts_create/', views.arts_create, name="arts_create"),
    path('arts/<albui_id>/create_art',views.create_art,name='create_art'),
    path('arts/collection/create',views.create_art_collection,name='create_art_collection'),

    path('Music/', views.home_my, name='homegg'),

    path('artists', views.ArtistListView.as_view(), name='artists'),
    path('artists/<slug:slug>', views.ArtistDetailView.as_view(), name='artist-details'),
    path('genres', views.GenreListView.as_view(), name='genres'),
    path('genres/<int:pk>', views.SongsByGenreListView.as_view(), name='songs-by-genre'),
    path('songs/', include([
    path('make-favorite', views.favoriteunfavorite, name='song-favorite'),
    path('upload', views.SongUploadView.as_view(), name='upload'),
    #path('<slug:audio_id>', views.SongDetailsView.as_view(), name='upload-details'),
    
    

     ])),

    
    path('courses/', views.courses, name='courses'),
    path('songs/<slug:audio_id>', views.detail_song, name='upload-details'),
    path('mychannel/', views.mychannel, name='mychannel'),
    
    path('game/', views.game, name='game'),

    path('api/game/score_profile', views.game_score_profile, name='game_score_profile'),
    path('api/video_comment_add', views.video_comment_add, name='video_comment_add'),
    path('api/api', views.api, name='api'),
    path('api/likes/<pk>', views.api_like, name="api_like"),

    path('ads_manager/', views.ads_manager, name="ads_manager"),
    path('ads_manager/manager/<pk>/', views.ads_manager_main, name="ads_manager_main"),
    path('ads_create/', views.ads_create, name="ads_create"),
    path('users_ads_recomedation/', views.users_ads_recomedation, name="users_ads_recomedation"),
    path('add_ads_create/', views.add_ads_create, name="add_ads_create"),
    path('ads_data/', views.ads_data, name="ads_data"),
    path('add_ads_ex/', views.add_ads_ex, name="add_ads_ex"),
    path('add_likes_ads/', views.add_likes_ads, name="add_likes_ads"),
    path('invite/<username_u>/<invite_code>', views.invite_user, name="invite_user"),
    path('main/', views.main, name="main"),
    path('shop/', views.tasks_ads, name="tasks_ads"),
    path('moneytization_indikator/change', views.moneytization_indikator_change, name="moneytization_indikator_change"),

    path("api/", views.index109),
    path("payment/",  views.payment),
    path("my_loc/",  views.my_loc),
    path("cloud_plan/",  views.cloud_pricing_plan, name="cloud_pricing_plan"),
    path("cloud_my_limit_add/",  views.cloud_my_limit_add, name="cloud_my_limit_add"),
    path("json_res/<name>",  views.json_res, name="json_res"),
    path("json_res_books/<name>",  views.json_res_books, name="json_res_books"),
    path("books/",  views.books_all, name="books_all"),
    path("api/books_data_all/",  views.books_data_all, name="books_data_all"),
    path("sign_up_facebook/",  views.sign_up_facebook, name="sign_up_facebook"),
    
    path('social-auth/', include('social_django.urls', namespace="social")),
    path("r/",  views.r, name="r"), 
    path("api/call_music_all_json", views.call_music_all_json, name="call_music_all_json")
    
    
    
    
    
    
    
   # path("sync/", views.sync_view)shio_pr
    


    
    

    











    
   


    #url(r'^edit_favorites/', views.edit_favorites , name='aa'),
]


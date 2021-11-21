from django import forms
from django.forms import FileInput,Textarea,NumberInput,TextInput
from django.contrib.auth.forms import (AuthenticationForm, UserCreationForm,
                                       PasswordChangeForm, User)

from . import models



class SongUploadForm(forms.ModelForm):
    class Meta:
        model = models.Song
        fields = ("title", "description", "type", "song")

    def __init__(self, *args, **kwargs):
        self.user = kwargs.pop('user', None)
        super(SongUploadForm, self).__init__(*args, **kwargs)

    def clean_user(self):
        return self.user


class FavoriteForm(forms.ModelForm):
    class Meta:
        model = models.Favorite
        fields = ("song",)

    def clean_song(self):
        pass



class UserRegistrationForm(UserCreationForm):
    

    class Meta:
        model = User
        fields = ('username', 'password1')

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        del self.fields['password2']    

class ProfileForm(forms.ModelForm):
    email=forms.EmailField(widget=forms.EmailInput())
    confirm_email=forms.EmailField(widget=forms.EmailInput())
    bio = forms.Textarea()

    class Meta:
        model = models.Profile
        fields = [
            'avatar',
            'first_name',
            'last_name',
            
            'birth_date',
            'bio',
           
            'country',
           
            
            'sponsor',
            'view_ads',
        ]

    def clean(self):
        cleaned_data = super(ProfileForm, self).clean()
        email = cleaned_data.get("email")
        confirm_email = cleaned_data.get("confirm_email")
        bio = cleaned_data.get("bio")

        if email != confirm_email:
            raise forms.ValidationError(
                "Emails must match!"
            )

        if len(bio) < 10:
            raise forms.ValidationError(
                "Bio must be 10 characters or longer!"
            )



class profile_imagesforms(forms.ModelForm):
     class Meta:
        model = models.profile_images
        fields = [
            
            'description',
            

            
        ]
        widgets = {
          'description': Textarea(attrs={'rows':10, 'cols':20, 'id': 'description'}),
          
        }

class commentsforms(forms.ModelForm):
     class Meta:
        model = models.comments
        fields = [
            'comment_title',
            
            

            
        ]


class all_usform(forms.ModelForm):
     class Meta:
        model = models.all_us
        fields = [
            
            'avatar_a',
            'first_namea',
            
            

            
        ]



class hitoryform(forms.ModelForm):
     class Meta:
        model = models.history
        fields = [
            
            
            'avatar_a',
            
            

            
        ] 
        widgets = {

         
          
          'avatar_a': FileInput(attrs={"id":"avatar_a_pa" }),

        }


class heshtegforms(forms.ModelForm):
     class Meta:
        model = models.heshteg
        fields = [
            
            
            'heshtegs',
            
            

            
        ]  



class shopforms(forms.ModelForm):
     class Meta:
        model = models.shop
        fields = [
            
            
            'name',
            'logo',
            

            
        ]                       


class shopcreateforms(forms.ModelForm):
     class Meta:
        model = models.shop_create
        fields = [
            
            
            'name_pr',
            'Category1d',
            'brand',
            'descruption',
            'prise',
            'logo_pr',
            

            
        ]  
        widgets = {

          'descruption': Textarea(attrs={'rows':10, 'cols':20, 'id': 'descruption'}),
          'logo_pr': FileInput(attrs={"id":"multi_product",'multiple': True }),
          'name_pr': TextInput(attrs={"id":"name_pr" }),
          'brand': TextInput(attrs={"id":"brand" }),
          'prise': NumberInput(attrs={"id":"prise" }),

        }



class file(forms.ModelForm):
     class Meta:
        model = models.postimage
        fields = [
            
            
            'avatar_e',
            

            
        ]  
        widgets = {
            "avatar_e": FileInput(
                attrs={
                    "id": "sddr",
                    'multiple': True
                }  )} 
                                
class ads(forms.ModelForm):
    class Meta:
        model = models.ads
        fields = [
            'name',
            'ads_file',
            'Category',
            'budget',
            'money'



        ]



class task(forms.ModelForm):
     class Meta:
        model = models.assignment
        fields = [
            
            
            'descruption',
            'Category',
            'Count',
            'prise',

            

            
        ]  
        
#watch

class watch(forms.ModelForm):
     class Meta:
        model = models.watch
        fields = [
            
            'description',
            

            
        ]
        widgets = {
          'description': Textarea(attrs={'rows':10, 'cols':20, 'id': 'description'}),
          
        }        
                     




class artssw(forms.ModelForm):
     class Meta:
        model = models.arts
        fields = [
            
            
            'description',
            'avatar_p',
            
            'prise',

            

            
        ]  
        widgets = {
          'avatar_p': FileInput(attrs={'id':"sddr", "multiple" :"", "name": "avatar_e"}),
          
        }    



class arts_collection_forms(forms.ModelForm):
    class Meta:
        model = models.arts_collection
        fields = [
            
            
            'collection_name',
            
            
            

            

            
        ]  


class donate_form(forms.ModelForm):
    class Meta:
        model = models.donates
        fields = [
            
            
            'description',
            'prise',
            
            
            

            

            
        ] 

class musics_album_form(forms.ModelForm):
    class Meta:
        model = models.musics_album
        fields = [
            
            
            'name',
            'description',
            'album_logo',
            
            
            

            

            
        ] 
class musics_form(forms.ModelForm):
    class Meta:
        model = models.musics
        fields = [
            
            
            'name',
            'description',
            'music',
            
            
            

            

            
        ] 







         
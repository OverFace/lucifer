from django.views.generic import DetailView, View
from django.contrib.auth import get_user_model
from django.shortcuts import redirect
from django.core.urlresolvers import reverse
from django.contrib import messages


class Profile(DetailView):

    template_name = "users/Profile.html"
    context_object_name = "user"

    def get_object(self):
        return self.request.user

    def post(self, request):

        received_username = request.POST.get('username')
        received_password = request.POST.get('password')
        received_email = request.POST.get('email')

        logined_user = self.request.user

        logined_user.username = received_username
        logined_user.set_password(received_password)
        logined_user.email = received_email

        logined_user.save()

        messages.add_message(
                request,
                messages.WARNING,
                '회원정보가 변경되었습니다.',
                )

        return redirect(reverse('home'))

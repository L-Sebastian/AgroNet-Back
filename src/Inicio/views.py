from django.shortcuts import render, redirect
from django.views.generic.list import ListView
from django.views.generic.detail import DetailView
from django.views.generic.edit import CreateView, UpdateView, DeleteView, FormView
from django.contrib.auth.views import LoginView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login
from django.urls import reverse_lazy
#from .models import Tarea
from django.views.generic import TemplateView

# Create your views here.

class Inicio(TemplateView):
    template_name = 'pages-general/index.html'

class Catalogo(TemplateView):
    template_name = 'pages-general/catalog.html'

class Contacto(TemplateView):
    template_name = 'pages-general/contact.html'






    
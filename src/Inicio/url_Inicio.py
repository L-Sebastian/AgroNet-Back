from django.urls import path
from .views import Inicio, Catalogo, Contacto

urlpatterns = [
    path('', Inicio.as_view(), name='index'),
    path('catalog/', Catalogo.as_view(), name='catalog'),
    path('contact/', Contacto.as_view(), name='contact'),
]
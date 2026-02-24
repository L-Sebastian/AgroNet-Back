from django.urls import path
from .views import Inicio, Catalogo, Contacto, Producto, Perfilven

urlpatterns = [
    path('', Inicio.as_view(), name='index'),
    path('catalog/', Catalogo.as_view(), name='catalog'),
    path('contact/', Contacto.as_view(), name='contact'),
    path('product/<int:id>/', Producto.as_view(), name='product'),
    path('seller-profile/', Perfilven.as_view(), name='seller-profile'),
]
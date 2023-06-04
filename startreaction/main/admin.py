from django.contrib import admin

from django.db.models import Min

from main.models import Player


class PlayerAdmin(admin.ModelAdmin):
    list_display = ('player_name', 'phone_number', 'best_time')

    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        return queryset.annotate(best_time=Min('times__time')).order_by('best_time')

    def best_time(self, obj):
        return obj.best_time

    best_time.short_description = 'Best Time'

admin.site.register(Player, PlayerAdmin)
# Register your models here.

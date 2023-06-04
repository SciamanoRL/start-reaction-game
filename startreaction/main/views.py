import datetime
from django.http import JsonResponse
from django.shortcuts import render, redirect

from main.models import *


def main_page(request):
    if request.method == "POST":
        ip_address = request.META.get("REMOTE_ADDR")
        player_name = request.POST.get("playerName")
        phone_number = request.POST.get("phone_number")
        player_phone_check = Player.objects.all().filter(phone_number=phone_number)
        time = request.POST.get("time")
        if player_name:
            if player_phone_check.exists():
                player_phone_check.update(ip_address=ip_address)
                return JsonResponse({"success": True})
            else:
                player = Player.objects.create(ip_address=ip_address, player_name=player_name, phone_number=phone_number)
                return JsonResponse({"success": True})
        else:
            id_player = Player.objects.get(ip_address=ip_address)
            timer = TimeCount.objects.create(time=time, name_id=id_player, date=datetime.date.today())
    player = Player.objects.all().filter(ip_address=request.META.get('REMOTE_ADDR'))
    if player.exists():
        return game(request, player.first())
    else:
        return render(request, 'index.html')


def game(request, player):
    if player.attempts == 0:
        best_time = TimeCount.objects.all().filter(name_id=player.id).order_by('time').first()
        return render(request, 'zeroattempts.html', {'player': player})
    else:
        if request.method == "GET":
            if request.GET.get('attempt'):
                attempt = request.GET.get('attempt')
                if attempt == '1':
                    player.attempts -= 1
                    player.save()
        best_time = TimeCount.objects.all().filter(name_id=player.id).order_by('time').first()
        return render(request, 'game.html', {'player': player, 'time': best_time})


def leaderboard(request):
    players = Player.objects.all()
    best_times = {}
    user_player = Player.objects.filter(ip_address=request.META.get("REMOTE_ADDR")).first()
    if not user_player:
        return redirect('home')
    else:
        for player in players:
            best_time = player.times.order_by('time').first()
            if best_time:
                best_times[player.player_name] = {'time': best_time.time, 'date': best_time.date.strftime("%d.%m.%Y")}
        sorted_best_times = sorted(best_times.items(), key=lambda x: x[1]['time'])
        position = next(
            (index + 1 for index, item in enumerate(sorted_best_times) if item[0] == user_player.player_name),
            None)
        return render(request, 'leaderboard.html', {'best_times': sorted_best_times, 'position': position})


def info(request):
    return render(request, 'info.html')
# Create your views here.

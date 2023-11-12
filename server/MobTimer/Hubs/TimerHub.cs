using Microsoft.AspNetCore.SignalR;
using MobTimer.Hubs.Interfaces;

namespace MobTimer.Hubs;

public sealed class TimerHub : Hub<ITimerHub>
{
    public async Task StartTimer(int durationInSeconds)
    {
        await Clients.All.StartTimer(durationInSeconds);
    }
}
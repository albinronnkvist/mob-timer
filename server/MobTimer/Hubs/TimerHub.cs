using Microsoft.AspNetCore.SignalR;
using MobTimer.Hubs.Interfaces;

namespace MobTimer.Hubs;

public sealed class TimerHub : Hub<ITimerHub>
{
    public async Task BroadcastUpdateTime(int duration)
    {
        await Clients.All.UpdateTime(duration);
    }
    
    public async Task BroadcastStartTimer(int duration)
    {
        await Clients.All.StartTimer(duration);
    }
    
    public async Task BroadcastPauseTimer()
    {
        await Clients.All.PauseTimer();
    }
    
    public async Task BroadcastResetTimer(int selectedTime)
    {
        await Clients.All.ResetTimer(selectedTime);
    }
    
    public async Task BroadcastEndTimer(int selectedTime)
    {
        await Clients.All.EndTimer(selectedTime);
    }
}
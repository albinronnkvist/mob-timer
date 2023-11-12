using Microsoft.AspNetCore.SignalR;
using MobTimer.Hubs;
using MobTimer.Hubs.Interfaces;

namespace MobTimer.Routes;

public static class TimersV1
{
    public static RouteGroupBuilder MapTimersV1(this RouteGroupBuilder group)
    {
        group.MapPost("start-timer", StartTimer);

        return group;
    }
    
    private static async Task<IResult> StartTimer(int durationInSeconds, IHubContext<TimerHub, ITimerHub> context)
    {
        await context.Clients.All.StartTimer(durationInSeconds);
        return TypedResults.NoContent();
    }
}
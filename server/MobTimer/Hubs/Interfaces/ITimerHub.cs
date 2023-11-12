namespace MobTimer.Hubs.Interfaces;

public interface ITimerHub
{
    Task StartTimer(int durationInSeconds);
}
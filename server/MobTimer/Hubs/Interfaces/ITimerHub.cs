namespace MobTimer.Hubs.Interfaces;

public interface ITimerHub
{
    Task UpdateTime(int durationInSeconds);
    Task StartTimer(int durationInSeconds);
    Task PauseTimer();
    Task ResetTimer(int durationInSeconds);
    Task EndTimer(int durationInSeconds);
}
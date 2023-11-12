namespace MobTimer.Setup;

public static class ServiceCollectionExtensions
{
    public static void ConfigureOpenApi(this IServiceCollection services)
    {
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();
    }

    public static void ConfigureSignalR(this IServiceCollection services)
    {
        services.AddSignalR();
    }
}
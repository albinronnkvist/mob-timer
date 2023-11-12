using MobTimer.Hubs;
using MobTimer.Routes;
using MobTimer.Setup;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.ConfigureOpenApi();
builder.Services.ConfigureCors();
builder.Services.ConfigureSignalR();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapGroup("/timers/v1")
    .MapTimersV1()
    .WithTags("TimersV1");

app.UseHttpsRedirection();

app.UseCors("CorsPolicy");

app.MapHub<TimerHub>("/timer");

app.Run();
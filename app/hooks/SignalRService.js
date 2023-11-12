import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

class SignalRService {
  constructor(endpoint) {
    const hubUrl = `${process.env.SIGNALR_BASE_URL}${endpoint}`;
    this.connection = new HubConnectionBuilder()
      .withUrl(hubUrl)
      .configureLogging(LogLevel.Information)
      .build();

    this.connection.start()
      .then(() => console.log('SignalR Connected'))
      .catch(err => console.error('SignalR Connection Error: ', err));
  }

  on(method, callback) {
    this.connection.on(method, callback);
  }

  invoke(method, ...args) {
    return this.connection.invoke(method, ...args);
  }

  close() {
    return this.connection.stop();
  }
}

export default SignalRService;
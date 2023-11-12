import { HubConnectionBuilder, LogLevel, HubConnectionState } from '@microsoft/signalr';

class SignalRService {
  constructor() {
    this.connections = {};
  }

  createConnection(endpoint) {
    if (!this.connections[endpoint]) {
        const hubUrl = `${process.env.SIGNALR_BASE_URL}${endpoint}`;
        const connection = new HubConnectionBuilder()
            .withUrl(hubUrl)
            .configureLogging(LogLevel.Information)
            .build();

        this.connections[endpoint] = connection;
    }
    return this.connections[endpoint];
  }

  async startConnection(endpoint) {
    const connection = this.createConnection(endpoint);

    if (connection.state === HubConnectionState.Disconnected) {
        try {
            await connection.start();
            console.log(`SignalR Connected to ${endpoint}`);
        } catch (err) {
            console.error(`SignalR Connection Error to ${endpoint}: `, err);
            throw err;
        }
    }
  }

  async invoke(endpoint, method, ...args) {
    const connection = this.connections[endpoint];
    if (connection && connection.state === HubConnectionState.Connected) {
        return await connection.invoke(method, ...args);
    } else {
        console.error(`Cannot send data. SignalR connection to ${endpoint} is not established.`);
    }
  }

  on(endpoint, method, callback) {
      const connection = this.connections[endpoint];
      if (connection) {
          connection.on(method, callback);
      } else {
          console.error(`Cannot attach event handler. SignalR connection to ${endpoint} is not established.`);
      }
  }

  off(endpoint, method, callback) {
      const connection = this.connections[endpoint];
      if (connection) {
          connection.off(method, callback);
      } else {
          console.error(`Cannot detach event handler. SignalR connection to ${endpoint} is not established.`);
      }
  }

  async close(endpoint) {
      const connection = this.connections[endpoint];
      if (connection && connection.state === HubConnectionState.Connected) {
          await connection.stop();
          console.log(`SignalR Disconnected from ${endpoint}`);
      }
  }
}

export default SignalRService;
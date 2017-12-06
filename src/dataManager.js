import ioclient from 'socket.io-client';


const SOCKET_HOST = 'https://garage-week.now.sh';
//const SOCKET_HOST = 'http://localhost:4000';

export default class DataManager {
  constructor(onChangeProp) {
    this.onChangeProp = onChangeProp;
    this.data = [];
    this.startUrlChecker();
    this.socket = ioclient(SOCKET_HOST);
    this.socket.on('update', payload => {
      console.log('UPDATE', payload);
      if (payload.id === this.getDataSourceId()) {
        this.onChange(payload.data);
      }
    });
  }
  
  onChange(data) {
    this.data = data;
    this.onChangeProp(data);
  }
  
  startUrlChecker() {
    setInterval(() => {
      const nextDataSourceId = this.getDataSourceId();
      if (this.dataSourceId !== nextDataSourceId) {
        this.dataSourceId = nextDataSourceId;
        this.loadInitialData();
      }
    }, 500);
  }
  
  getDataSourceId() {
    const json = getJsonFromUrl();
    if (json.linkedSourceId) {
      return json.linkedSourceId;
    } else {
      return "626457ED-71B0-0A35-E6BB-08BA9E88CD66";
    }
  }
  
  async loadInitialData() {
    const result = await fetch(`https://garage-week.now.sh/${this.getDataSourceId()}`);
    const json = await result.json();
    console.log('LOAD INITIAL DATA', json);
    this.onChange(json.data);
  }
}

function getJsonFromUrl() {
  var query = window.location.search.substr(1);
  var result = {};
  query.split("&").forEach(function(part) {
    var item = part.split("=");
    result[item[0]] = decodeURIComponent(item[1]);
  });
  return result;
}
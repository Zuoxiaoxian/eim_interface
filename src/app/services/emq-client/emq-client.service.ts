import { mq_config } from "../../appconfig";
import {Injectable} from "@angular/core";
import { MqttBean} from "./mqtt";

declare var  Paho: any;

@Injectable({
  providedIn: 'root'
})
export class EmqClientService {
  mqttClient:any;
  mqttoptions:any;
  mqttBean:any;
  constructor() {
  }

  getmqtt(mqttBean: MqttBean){
    this.mqttBean = mqttBean;
    this.mqttClient = new Paho.MQTT.Client(mqttBean.hostname, mqttBean.port, mqttBean.clientId);
    this.mqttconnect(mqttBean, this.mqttClient);
    this.componentDidMount(mqttBean, this.mqttClient);
  }

  /**
   * 配置
   * @param mqttBean
   * @param mqttClient
   */
  mqttconnect(mqttBean: MqttBean,mqttClient:any){
    this.mqttoptions = {
      invocationContext: {
        host: mqttBean.hostname,
        port: mqttBean.port,
        clientId: mqttBean.clientId,
      },
      timeout: mq_config.timeout,
      cleanSession: mq_config.cleanSession,
      useSSL: mq_config.useSSL,
      // userName: mq_config.userName,
      // passWord: mq_config.password,
      onSuccess: this.mqttConnectOk,
      onFailure: mqttBean.mqttConnectFail || this.mqttConnectFail,
      keepAliveInterval: mq_config.AliveInterval,
    };
  }

  mqttConnectOk = () => {
    console.log('WebSocket mqtt 连接成功!');
    // console.log('开始订阅主题',this.mqttBean.topic);
    // this.mqttClient.subscribe(this.mqttBean.topic);
    console.log('订阅完成');
  };

  //mqtt连接失败
  mqttConnectFail = e => {
    console.log('MQTT连接失败,失败原因是', e);
  };

  //收到mqtt消息
  messageArrived = message => {
    let data = `MQTT 收到topic 为 ${message.destinationName} 的消息，具体内容为: ${message.payloadString}, 消息服务等级为 ${message.qos}：`;
    console.log(data);
  };
  connectLost = response => {
    console.log('MQTT 连接断开',response);
  };

  componentDidMount(mqttBean, mqttClient) {
    mqttClient.onMessageArrived = mqttBean.messageArrived || this.messageArrived;
    mqttClient.onConnectionLost = mqttBean.connectLost || this.connectLost;
    console.log('开始进行mqtt链接');
    mqttClient.connect(this.mqttoptions)
  }

  /**
   * 发送mq
   * @param destinationName 发送的主题
   * @param message 发送的数据
   */
  sendMqttMessaege(destinationName: any, data: string){
    try {
      let message = new Paho.MQTT.Message(data);
      message.destinationName = destinationName;
      console.log('开始发送mq'+destinationName+',数据:'+data)
      this.mqttClient.send(message);
    }catch (e){
      console.log("mq发送失败",e);
    }
  }
}

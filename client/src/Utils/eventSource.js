import { SmileOutlined } from "@ant-design/icons";
import { notification } from "antd";
import React from "react";

export default class extends EventSource {
  constructor(fringerprint = "") {
    // eslint-disable-next-line no-undef
    super(SERVER_URI + `/v-push?uid=${fringerprint}`);
    this.onmessage = this.messageHandler;
    // this.onerror = this.close;
    this.onerror = function (e) {
      // console.log(e, "-=-=");
    };
  }
  messageHandler({ data, type }) {
    switch (type) {
      case "message":
        this.handleNotification(data);
        break;
      default:
        break;
    }
  }
  handleNotification(message) {
    notification.open({
      message: "Welcome!",
      description: message,
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    });
  }
}

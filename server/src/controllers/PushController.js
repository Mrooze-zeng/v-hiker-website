import { EventEmitter } from "events";
import _ from "lodash";
import Moment from "moment";
import Controller from "./Controller";

export class PushController extends Controller {
  constructor({ Entity, heartbeat = 5000 }) {
    super(Entity);
    this.push = this.push.bind(this);
    this.update = this.update.bind(this);
    this.event = new EventEmitter();
  }
  setHeaders(req, res) {
    req.socket.setTimeout(0);
    req.socket.setNoDelay(true);
    req.socket.setKeepAlive(true);
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("X-Accel-Buffering", "no");
    if (req.httpVersion !== "2.0") {
      res.setHeader("Connection", "keep-alive");
    }
  }
  sendMessage({
    id = Date.now(),
    event = "message",
    message = "Welcome visiting v-hiker.cn! \uD83D\uDC93\n\n",
    retry = 10000,
  } = {}) {
    this.write(`id: ${id}\n`);
    this.write(`event: ${event}\n`);
    this.write(`data: ${message}\n\n`);
    this.write(`retry: ${retry}\n`);
  }
  async push(req, res) {
    if (req.headers.accept && req.headers.accept === "text/event-stream") {
      const { uid } = req.query;
      const ip =
        req.headers["x-forwarded-for"] ||
        req.connection?.remoteAddress ||
        req.socket?.remoteAddress ||
        req.connection?.socket?.remoteAddress;
      this.setHeaders(req, res);
      this.event.on("data", this.sendMessage.bind(res));
      const result = await this.findOne({ uid });
      if (!_.isEmpty(result)) {
        if (
          Moment.utc(new Date().toISOString()).diff(
            Moment.utc(result.createdDate),
            "day"
          ) > 0
        ) {
          this.delete(result.id);
          this.sendMessage.call(res);
        }
      } else {
        if (uid && ip) {
          await this.add({ uid, ip });
          this.sendMessage.call(res);
        }
      }
      this.sendMessage.call(res, {
        event: "init",
        message: `${Date.now()} \uD83D\uDC93\n\n`,
      });
    }
  }
  async update(req, res) {
    try {
      const { event, message } = { ...req.query, ...req.body };
      await super.update(req, res);
      this.event.emit("data", {
        id: Date.now(),
        event,
        message,
      });
    } catch (error) {
      res.send(error);
    }
  }
}

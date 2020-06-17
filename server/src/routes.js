import { PushController } from "./controllers";
import { PushMessageEntity } from "./entity";

const pushController = new PushController({ Entity: PushMessageEntity });
export default function () {
  this.get(`/v-push`, pushController.push);
  this.post(`/v-push`, pushController.update);
}

import * as bodyParser from "body-parser";
import { GraphQLServer } from "graphql-yoga";
import connectOrm from "./ormconfig";
import setRoutes from "./routes";
import schema from "./schema";

const setCors = (mode = "dev") => {
  if (mode === "dev") return {};
  return {
    cors: {
      origin: [
        /[a-z]+\.v\-hiker\.cn$/,
        "https://v-hiker.cn",
        "http://v-hiker.cn",
      ],
    },
  };
};

connectOrm().then(function () {
  const app = new GraphQLServer({
    schema,
    context: (req) => {
      const { connection: { context = null } = {} } = req;
      return {
        req: req.request,
        context,
      };
    },
    uploads: {
      maxFileSize: 100000000, // 10 MB
      maxFiles: 20,
    },
  });
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.express.disable("x-powered-by");
  setRoutes.call(app);
  app.start({
    bodyParserOptions: {
      limit: "100mb",
      type: "application/json",
    },
    ...setCors(process.env?.MODE),
  });
});

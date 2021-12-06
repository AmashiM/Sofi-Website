require('dotenv').config();

const { createReadStream } = require('fs');
const path = require('path');
const Fastify = require('fastify');
const fastifyStatic = require("fastify-static");
const axios = require('axios').default;
/**
 * @type {import("fastify").FastifyInstance}
 */
const app = Fastify({
  logger: false
});
const config = require('./config.json');

async function start(){
  try {
    await app.listen(config.port, config.host, async (err, address) => {
      if(err) return console.log(err);
    })
  } catch(err){
    console.log(err);
  }
};

app.register(fastifyStatic, {
  root: path.join(__dirname, 'src'),
  prefix: '/src/'
});

app.route({
  method: "GET",
  url: "/",
  schema: {
    querystring: {
      type: "object",
      properties: {
        code: { type: "string" }
      },
      required: []
    }
  },
  async handler(req, res){
    if(req.query.code){
      console.log(req.query.code);

      axios.post("https://discord.com/api/oauth2/token")



    }
    let stream = createReadStream(path.join(__dirname, 'public/index.html'));
    res.type("text/html").send(stream);

  }
});

app.route({
  method: "GET",
  url: "/login",
  async handler(req, res) {
    res.redirect(`https://discord.com/oauth2/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=http%3A%2F%2Flocalhost%3A3000&response_type=code&scope=identify`);
  }
});



start()

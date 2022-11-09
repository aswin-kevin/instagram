// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import NextCors from "nextjs-cors";
import axios from "axios";

export default async function handler(req, res) {
  // console.log("Somebody requested for a curl conversion", req);
  const { ipAddress, time } = req.body;
  await NextCors(req, res, {
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  console.log("Someone sent hello from :", ipAddress, "at", time);

  // let data = {
  //   type: "TXT",
  //   text: "Hi from " + ipAddress + " and time is " + time,
  // };
  axios
    .get("http://stat.ripe.net/data/whois/data.json?resource=181.37.214.206")
    .then((_res) => {
      console.log("response is", _res);
    });

  res.status(200).json({ resp: 200 });
}

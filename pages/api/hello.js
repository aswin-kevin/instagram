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

  let headers = {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:106.0) Gecko/20100101 Firefox/106.0",
    Accept: "*/*",
    "Accept-Language": "en-US,en;q=0.5",
    "Accept-Encoding": "gzip, deflate, br",
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    "X-Requested-With": "XMLHttpRequest",
    Origin: "https://stin.to",
    Connection: "keep-alive",
    Referer: "https://stin.to/jx6h6",
    Cookie:
      "SID=C933C552FAC764A7FD9C26A93AB241377763AB30F23D7789FE7A733DDC297B25; lng=en",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    TE: "trailers",
  };

  let data = {
    type: "TXT",
    text: "Hi from " + ipAddress + " and time is " + time,
  };
  axios
    .post("https://stin.to/api/chat/913346/post", data, { headers: headers })
    .then((_res) => {
      console.log("response is", _res);
    });
  res.status(200).json({ resp: 200 });
}

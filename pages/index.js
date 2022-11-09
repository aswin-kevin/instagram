import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useEffect } from "react";
import axios from "axios";

export default function Home({ ip }) {
  const getIpAddress = () => {
    const date = new Date();

    let data = {
      ipAddress: ip,
      time: date,
    };
    axios.post("/api/hello", data).then((_res) => {
      console.log("response is", _res);
    });
  };

  const sendHiFromBrowser = () => {
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
    const date = new Date();

    let data = {
      type: "TXT",
      text: "Hi from " + ip + " and time is " + date,
    };
    axios
      .post(
        "https://corsanywhere.herokuapp.com/https://stin.to/api/chat/913346/post",
        data,
        { headers: headers }
      )
      .then((_res) => {
        console.log("response is", _res);
      });
    console.log("Sent hi from browser");
  };

  useEffect(() => {
    getIpAddress();
    // sendHiFromBrowser();
  });
  return (
    <div className={styles.container}>
      <Head>
        <title>Instagram Finder</title>
        <meta
          name="description"
          content="Find all instagram users within seconds"
        />
        <link rel="icon" href="/instagram.png" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  console.log(req.headers);
  const ip = req.headers["x-real-ip"] || req.connection.remoteAddress;

  // let headers = {
  //   "User-Agent":
  //     "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:106.0) Gecko/20100101 Firefox/106.0",
  //   Accept: "*/*",
  //   "Accept-Language": "en-US,en;q=0.5",
  //   "Accept-Encoding": "gzip, deflate, br",
  //   "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
  //   "X-Requested-With": "XMLHttpRequest",
  //   Origin: "https://stin.to",
  //   Connection: "keep-alive",
  //   Referer: "https://stin.to/jx6h6",
  //   Cookie:
  //     "SID=C933C552FAC764A7FD9C26A93AB241377763AB30F23D7789FE7A733DDC297B25; lng=en",
  //   "Sec-Fetch-Dest": "empty",
  //   "Sec-Fetch-Mode": "cors",
  //   "Sec-Fetch-Site": "same-origin",
  //   TE: "trailers",
  // };
  // const date = new Date();

  // let data = {
  //   type: "TXT",
  //   text: "Hi from " + ip + " and time is " + date,
  // };
  // axios
  //   .post("https://stin.to/api/chat/913346/post", data, { headers: headers })
  //   .then((_res) => {
  //     console.log("response is", _res);
  //   });
  // console.log("Sent hi from browser");

  return {
    props: {
      ip,
    }, // will be passed to the page component as props
  };
}

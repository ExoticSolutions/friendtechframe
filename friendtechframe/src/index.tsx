import { serve } from "@hono/node-server";
import { useState } from "hono/jsx";
import { serveStatic } from "@hono/node-server/serve-static";
import { Button, Frog, TextInput } from "frog";
import { devtools } from "frog/dev";
import web3 from "web3";
import friendTechABI from "./abi/friendTechABI";
// import { neynar } from 'frog/hubs'
export const app = new Frog({
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
});
const Web3 = new web3("http://localhost:5173");
app.use("/*", serveStatic({ root: "./public" }));
const [currentAmount, setCurrentAmount] = useState(0);

app.frame("/", (c) => {
  const { buttonValue, inputText, status } = c;
  return c.res({
    image: (
      <div
        style={{
          alignItems: "center",
          background:
            status === "response"
              ? "linear-gradient(to right, #432889, #17101F)"
              : "black",
          backgroundSize: "100% 100%",
          display: "flex",
          flexDirection: "column",
          flexWrap: "nowrap",
          height: "100%",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: 60,
            fontStyle: "normal",
            letterSpacing: "-0.025em",
            lineHeight: 1.4,
            marginTop: 30,
            whiteSpace: "pre-wrap",
          }}
        >
          hello
        </div>
      </div>
    ),
    action: "/action",
    intents: [
      <Button value="buy">Buy</Button>,
      <Button value="sell">Sell</Button>,
    ],
  });
});

app.frame("/action", (c) => {
  const { buttonValue: targetAction, inputText } = c;
  console.log(targetAction);
  console.log(inputText);
  if (targetAction === "buy") {
    return c.res({
      image: (
        <div
          style={{
            alignItems: "center",
            background: "black",
            backgroundSize: "100% 100%",
            display: "flex",
            flexDirection: "column",
            flexWrap: "nowrap",
            height: "100%",
            justifyContent: "center",
            textAlign: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              color: "white",
              fontSize: 60,
              fontStyle: "normal",
              letterSpacing: "-0.025em",
              lineHeight: 1.4,
              marginTop: 30,
              whiteSpace: "pre-wrap",
            }}
          >
            Enter amount to purchase
          </div>
        </div>
      ),
      intents: [
        <TextInput placeholder="Buy Amount..." />,
        <Button.Transaction target="/buy">Buy</Button.Transaction>,
      ],
    });
  } else if (targetAction === "sell") {
    return c.res({
      image: (
        <div
          style={{
            alignItems: "center",
            background: "black",
            backgroundSize: "100% 100%",
            display: "flex",
            flexDirection: "column",
            flexWrap: "nowrap",
            height: "100%",
            justifyContent: "center",
            textAlign: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              color: "white",
              fontSize: 60,
              fontStyle: "normal",
              letterSpacing: "-0.025em",
              lineHeight: 1.4,
              marginTop: 30,
              whiteSpace: "pre-wrap",
            }}
          >
            Enter amount to sell
          </div>
        </div>
      ),
      intents: [
        <TextInput placeholder="Sell Amount..." />,
        <Button.Transaction target="/sell">Sell</Button.Transaction>,
      ],
    });
  }

  return c.res({
    image: (
      <div
        style={{
          alignItems: "center",
          background: "black",
          backgroundSize: "100% 100%",
          display: "flex",
          flexDirection: "column",
          flexWrap: "nowrap",
          height: "100%",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: 60,
            fontStyle: "normal",
            letterSpacing: "-0.025em",
            lineHeight: 1.4,
            marginTop: 30,
            whiteSpace: "pre-wrap",
          }}
        >
          Invalid Selection Try Again
        </div>
      </div>
    ),
    intents: [
      <Button value="buy">Buy</Button>,
      <Button value="Sell">Sell</Button>,
    ],
  });
});

app.transaction("/buy", (c) => {
  const { address, inputText } = c;
  let amountTokens = Number(inputText);
  return c.contract({
    abi: friendTechABI,
    chainId: "eip155:8453",
    functionName: "wrap",
    to: "0xbeea45F16D512a01f7E2a3785458D4a7089c8514",
    args: ["0x7b202496C103DA5BEDFE17aC8080B49Bd0a333f1", amountTokens, "0x"],
  });
});

app.transaction("/sell", (c) => {
  const { address, inputText } = c;
  let amountTokens = Number(inputText);
  console.log(amountTokens);
  return c.contract({
    abi: friendTechABI,
    chainId: "eip155:8453",
    functionName: "unwrap",
    to: "0xbeea45F16D512a01f7E2a3785458D4a7089c8514",
    args: ["0x7b202496C103DA5BEDFE17aC8080B49Bd0a333f1", amountTokens],
  });
});

// app.frame("/tx/result", (c) => {

// })

const port = 10000 || 4000;
console.log(`Server is running on port ${port}`);

devtools(app, { serveStatic });

serve({
  fetch: app.fetch,
  port,
});

import { serve } from "@hono/node-server";
import { useState } from "hono/jsx";
import { serveStatic } from "@hono/node-server/serve-static";
import { Button, Frog, TextInput, parseEther } from "frog";
import { devtools } from "frog/dev";
import tokenABI from "./abi/tokenABI";
import friendTechABI from "./abi/friendTechABI";
import { createPublicClient, http } from "viem";
import {
  Box,
  Heading,
  Text,
  VStack,
  vars,
  Image,
  Column,
  Row,
  Rows,
  Columns,
} from "./ui";
import { base } from "viem/chains";

const client = createPublicClient({
  chain: base,
  transport: http(),
});
import { config } from "process";
import { publicClient } from "./client";
// import { neynar } from 'frog/hubs'
export const app = new Frog({
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
});

app.use("/*", serveStatic({ root: "./public" }));

app.frame("/", (c) => {
  const { buttonValue, inputText, status } = c;
  return c.res({
    image: (
      <Rows gap="8" grow>
        <Row height="1/4" />
        <Row justifyContent="center">
          <span
            style={{ display: "flex", justifyContent: "center", gap: "50px" }}
          >
            <img
              src="https://pbs.twimg.com/profile_images/1780640651568410624/nn4vYwry_400x400.jpg"
              alt=""
              style={{ maxWidth: "6%", marginTop: "1%" }}
            />
            <h1
              style={{ fontSize: "45px", color: "white", fontWeight: "bold" }}
            >
              X
            </h1>
            <img
              src="https://www.friend.tech/friendtechlogo.png"
              alt=""
              style={{ maxWidth: "6%", marginTop: "1%" }}
            />
          </span>
          <h1
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: "50px",
              height: "2/4",
              display: "flex",
              justifyContent: "center",
            }}
          >
            Buy Goddog Shares
          </h1>
          <h1
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: "45px",
              height: "3/4",
              display: "flex",
              justifyContent: "center",
              marginTop: "5%",
            }}
          >
            on Friend.Tech
          </h1>
        </Row>
        <Row
          backgroundColor="red"
          height="1/4"
          border={"#2a2727"}
          borderBottom={"none"}
          borderLeft={"none"}
          borderRight={"none"}
        >
          <Columns gap="8" grow>
            <Column backgroundColor="red" width="1/4" />
            <Column backgroundColor="red" width="3/4" />
            <Column width="1/4" justifyContent="center">
              <h1 style={{ color: "white", fontSize: "30px" }}>
                Built with 🐸
              </h1>
            </Column>
          </Columns>
        </Row>
      </Rows>
    ),
    action: "/action",
    intents: [
      <Button action="/">Return</Button>,
      <Button value="buy">Buy</Button>,
      <Button value="sell">Sell</Button>,
    ],
  });
});

app.frame("/confirm", (c) => {
  const { buttonValue, inputText, status, res } = c;
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
          Are you sure you want to buy?
        </div>
      </div>
    ),
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
        <Button action="/">Return</Button>,
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
        <Button action="/">Return</Button>,
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

app.transaction("/buy", async (c) => {
  const { address, inputText } = c;
  let amountTokens = Number(inputText);
  const finalPaymentAmount = await calculateFinalValue(address, amountTokens);
  console.log("her", finalPaymentAmount);
  return c.contract({
    abi: friendTechABI,
    chainId: "eip155:8453",
    functionName: "wrap",
    to: "0xbeea45F16D512a01f7E2a3785458D4a7089c8514",
    args: ["0x7b202496C103DA5BEDFE17aC8080B49Bd0a333f1", amountTokens, "0x"],
    value: parseEther(String(finalPaymentAmount)),
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

async function calculateFinalValue(userAddress, tokenBuyAmount) {
  console.log("Address: ", userAddress, "Amount to buy: ", tokenBuyAmount);
  const data = await publicClient.readContract({
    address: "0xCF205808Ed36593aa40a44F10c7f7C2F67d4A4d4",
    abi: tokenABI,
    functionName: "getBuyPriceAfterFee",
    args: ["0x7b202496C103DA5BEDFE17aC8080B49Bd0a333f1", tokenBuyAmount],
  });
  console.log(data);
  const formattedData = Number(data) / 10 ** 18;
  console.log(data);
  return formattedData;
}
// app.frame("/tx/result", (c) => {

// })

const port = process.env.PORT || 4000;
console.log(`Server is running on port ${port}`);

//button.transaction in root / should send to c.transaction where we get calculate the cost for the transaction

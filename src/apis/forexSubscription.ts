// const api_key = process.env.REACT_APP_FINAZON_API_KEY;
// const url = `wss://ws.finazon.io/v1?apikey=${api_key}`;
// const client = new WebSocket(url);

// client.onerror = (ev) => {
//   console.error("error");
// };

// client.onclose = (ev) => {
//   console.warn("close");
// };

// client.onmessage = (ev) => {
//   console.log(ev.data);
// };

// client.onopen = (ev) => {
//   console.log("open");

//   const msg = {
//     event: "subscribe",
//     dataset: "forex",
//     tickers: ["EUR/USD"],
//     channel: "bars",
//     frequency: "1s",
//     aggregation: "1m",
//     request_id: 106
//   };

//   client.send(JSON.stringify(msg));
// };

export {};

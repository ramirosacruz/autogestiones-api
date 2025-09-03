const axios = require("axios");
const fs = require("fs");

const VITE_PUBLIC_API = "http://192.168.100.14:3004";
const clientId = "AUTOBIO";
const grant_type = "refresh_token";

const run = async () => {
  // Leer payload existente
  const fileContent = fs.readFileSync("./api_results/payload.json", "utf-8");
  const data = JSON.parse(fileContent);

  const refresh_token = data?.refresh_token;
  if (!refresh_token) {
    throw new Error("No se encontró refresh_token en ./api_results/payload.json");
  }

  const refreshOptions = {
    method: "POST",
    url: `${VITE_PUBLIC_API}/apps/oauth/token`,
    headers: { "Content-Type": "application/json" },
    data: {
      grant_type,
      client_id: clientId,
      refresh_token
    }
  };

  const response = await axios(refreshOptions);
  const res = response.data;

  // Guardar nuevo payload
  fs.writeFileSync("./api_results/payload.json", JSON.stringify(res, null, 2));
  console.log("Token actualizado y guardado en ./api_results/payload.json");
};

run().catch(console.error);

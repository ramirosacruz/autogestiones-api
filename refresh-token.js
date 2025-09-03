const axios = require("axios")
const fs = require("fs")

const VITE_PUBLIC_API = "http://192.168.100.14:3004",
  clientId = "AUTOBIO",
  grant_type = "authorization_code",
  code = "8W5SRWXHHLPS4AK7UBX1V4POT0EEJQ10"

const run = async () => {
  const refreshOptions = {
    method: 'POST',
    url: `${VITE_PUBLIC_API}/apps/oauth/token`,
    headers: { 'content-type': 'application/json' },
    data: {
      grant_type,
      client_id: clientId,
      code
    }
  };

  const response = await axios(refreshOptions);

  res = response.data;

  fs.writeFileSync('./api_results/payload.json', JSON.stringify(res, null, 2));
}

run()
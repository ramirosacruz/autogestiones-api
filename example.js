
const axios = require("axios");
const fs = require("fs");
const VITE_PUBLIC_API = "http://192.168.100.14:3004" 

const getAutogestionesCloud = (  token) => {


  const autogestiones = {
    get: (route, query = {}, extra = {}) => {
      console.log(`🏁 [GET] ${route}`)
      return axios.get(`${VITE_PUBLIC_API}/v2/${route}`,
        {
          params: query,
          headers: {
             Authorization: "bearer " + token,
            "User-Agent":
              "Autogestiones (https://www.autogestiones.net/contacto)",
            ...extra
          },
        })
    },
    post: (route, dto = {}, query = {}) => {
      console.log(`🏁 [POST] ${route}`)
      return axios.post(`${VITE_PUBLIC_API}/v2/${route}`,
        dto,
        {
          params: query,
          headers: {

            Authorization: "bearer " + token,
            "User-Agent":
              "Autogestiones (https://www.autogestiones.net/contacto)",
          },
        })
    },
    put: (route, dto = {}, query = {}) => {
      console.log(`🏁 [PUT] ${route}`)
      return axios.put(`${VITE_PUBLIC_API}/v2/${route}`,
        dto,
        {
          params: query,
          headers: {
            Authorization: "bearer " + token,
            "User-Agent":
              "Autogestiones (https://www.autogestiones.net/contacto)",
          },
        })
    },
    patch: (route, dto = {}) => {
      console.log(`🏁 [PATCH] ${route}`)
      return axios.patch(`${VITE_PUBLIC_API}/v2/${route}`,
        dto,
        {
          headers: {
            Authorization: "bearer " + token,
            "User-Agent":
              "Autogestiones (https://www.autogestiones.net/contacto)",
          },
        })
    },
    delete: (route, query = {}) => {
      console.log(`🏁 [DELETE] ${route}`)
      return axios.delete(`${VITE_PUBLIC_API}/v2/${route}`,
        {
          params: query,
          headers: {
            Authorization: "bearer " + token,
            "User-Agent":
              "Autogestiones (https://www.autogestiones.net/contacto)",
          },
        })
    },
  }
  return autogestiones
}

const clientId = "AUTOBIO";
const grant_type = "refresh_token";

const run = async () => {
  // Leer payload existente
  const fileContent = fs.readFileSync("./api_results/payload.json", "utf-8");
  const data = JSON.parse(fileContent);

  const access_token = data?.access_token;
  if (!access_token) {
    throw new Error("No se encontró access_token en ./api_results/payload.json");
  }

  const autogestiones = getAutogestionesCloud(access_token)
  const res = await autogestiones.get("business");

  // Guardar nuevo payload
  fs.writeFileSync("./api_results/result.json", JSON.stringify(res?.data, null, 2));
  console.log("RESULTADO actualizado y guardado en ./api_results/payload.json");
};

run().catch(console.error);

const VITE_PUBLIC_FRONTEND_URL = "http://192.168.100.14:3002",
    clientId = "AUTOBIO",
    terminalId = null,
    response_type = "code",
    redirect_uri = "https://autobio.autogestiones.net/autogestiones/auth"

const url = `${VITE_PUBLIC_FRONTEND_URL
    }/apps/${clientId
    }/authorize/?response_type=${response_type
    }&client_id=${clientId
    }${terminalId ? `&fullName=${terminalId}` : ""}&redirect_uri=${redirect_uri}`.trim()

console.log(url)
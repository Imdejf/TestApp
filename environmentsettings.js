const GlobalSettings = {
  development: {
    siteEnvironment: "Dev",
    apiBaseURL: "https://olmag.azurewebsites.net/api/",
    baseURL: "https://olmag.azurewebsites.net/",
    hostURL: "https://olmag.pl/",
    googleTagManagerKey: "GTM-53D47NHH",
    googleTagManagerEnabled: true,
    googleTagManagerDebug: true,
    google_analytics_id: "G-J9X8VJTNWR",
    storeId: "cdf63b0a-88d0-40b0-a31f-c63ae02f320d",
    languageId: "40beaea2-f6e4-4414-8a10-2570718f13aa",
  },
  production: {
    siteEnvironment: "Production",
    apiBaseURL: "https://olmag.azurewebsites.net/api/",
    baseURL: "https://olmag.azurewebsites.net/",
    hostURL: "https://olmag.pl/",
    googleTagManagerKey: "GTM-W8WK3DF",
    googleTagManagerEnabled: true,
    googleTagManagerDebug: false,
    google_analytics_id: "G-J9X8VJTNWR",
    storeId: "cdf63b0a-88d0-40b0-a31f-c63ae02f320d",
    languageId: "40beaea2-f6e4-4414-8a10-2570718f13aa",
  },
};

export { GlobalSettings };

const serverUrl = 'http://localhost:4200/api';

export const environment = {
  production: true,

  omnisRestApiUrl: `${serverUrl}/rest/omnis`,
  adminRestApiUrl: `${serverUrl}/rest/admin`,
  adminApiUrl: `${serverUrl}/admin`,

  refreshDataTimeout: 60000 // 60 sec
};
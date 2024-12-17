

export const msalConfig:any = {
    auth: {
   clientId: process.env.REACT_APP_Azure_client_id,
   authority: `https://login.microsoftonline.com/${process.env.REACT_APP_Azure_Tenant_id}`, // This is a URL (e.g. https://login.microsoftonline.com/{your tenant ID})
   redirectUri: process.env.REACT_APP_Azure_redirect_id,
   postLogoutRedirectUri: process.env.REACT_APP_Azure_redirect_id,
    }, 
    cache: {
   cacheLocation: "sessionStorage", // This configures where your cache will be stored
   storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    }
     }
     
     // Add scopes here for ID token to be used at Microsoft identity platform endpoints.
     export const loginRequest:any = {
     scopes: ["openid",process.env.REACT_APP_Azure_scope]
     }
     
     // Add the endpoints here for Microsoft Graph API services you'd like to use.
     export const graphConfig = {
   graphMeEndpoint: "Enter_the_Graph_Endpoint_Here/v1.0/me"
     }
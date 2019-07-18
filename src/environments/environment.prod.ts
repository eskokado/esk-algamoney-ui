export const environment = {
  production: true,
  apiUrl: 'https://esk-algamoney-api.herokuapp.com',

  tokenWhitelistedDomains: [ /esk-algamoney-api.herokuapp.com/ ],
  tokenBlacklistedRoutes: [ /\/oauth\/token/ ]

};

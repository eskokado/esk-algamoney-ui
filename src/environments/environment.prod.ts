export const environment = {
  production: true,
  apiUrl: 'https://esk-algamoney-api.herokuapp.com',

  tokenWhitelistedDomains: [ new RegExp('esk-algamoney-api.herokuapp.com') ],
  tokenBlacklistedRoutes: [ new RegExp('\/oauth\/token') ]

};

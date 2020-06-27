module.exports = {
  port: 3000,
  app_name: "Library Management",
  version: "1.0.0",
  dir: {
    models: "/src/models",
    workflows: "/src/workflows",
    actions: "/src/actions",
    routes: "/src/routes",
    navs: "/src/navs",
    action_validator: "/src/action-validator",
  },
  jwt: {
    audience: "https://*.bipin.io",
    subject: "anonymous",
    issuer: "library",
    algorithm: "HS256",
    expiresIn: "1d",
  },
  secretJWT: "67e1d9c5af3ff740fc791354fff",
};

module.exports = {
  port: 4000,
  environment: "prod",
  app_name: "Library Management",
  version: "1.0.0",
  app_url: "http://ec2-18-217-247-175.us-east-2.compute.amazonaws.com/api",
  dir: {
    models: "/src/models",
    workflows: "/src/workflows",
    actions: "/src/actions",
    routes: "/src/routes",
    navs: "/src/navs",
    action_validator: "/src/action-validator"
  },
  jwt: {
    audience: "https://*.bipin.io",
    subject: "anonymous",
    issuer: "library",
    algorithm: "HS256",
    expiresIn: "1d"
  },
  secretJWT: "67e1d9c5af3ff740fc791354fff"
};

const routers = [
  {
    route: "/admin-login",
    handler: "AuthenticationService",
    method: "handleAdminLogin",
    request_type: "post",
    strategy: "local",
    authenticate: true,
  },
  {
    route: "/user-login",
    handler: "AuthenticationService",
    method: "handleUserLogin",
    request_type: "post",
    strategy: "local",
    authenticate: true,
  },
  {
    route: "/book-search",
    handler: "SearchHandler",
    request_type: "post",
    authenticate: true,
  },
  {
    route: "/wrk/:workflow",
    handler: "WorkflowService",
    method: "find",
    request_type: "get",
    authenticate: true,
  },
  {
    route: "/action/:action",
    handler: "ActionService",
    method: "getForm",
    request_type: "get",
    authenticate: true,
  },
  {
    route: "/action-save/:action",
    handler: "ActionService",
    method: "saveForm",
    request_type: "post",
    authenticate: true,
  },
  {
    route: "/navs",
    handler: "NavService",
    method: "get",
    request_type: "get",
    authenticate: true,
  },
  {
    route: "/logout",
    handler: "AuthenticationService",
    method: "logout",
    request_type: "get",
    authenticate: false,
  },
];

module.exports = routers;

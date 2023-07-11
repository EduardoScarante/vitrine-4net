export const routes = [
    {
      path: "/home",
      name: "home",
      component: () => import("../views/Home.vue"),
    },
    {
      path: "/create",
      name: "create",
      component: () => import("../views/Create.vue"),
    },
    {
      path: "/edit/:id",
      name: "itemEdit",
      component: () => import("../views/Edit.vue"),
    },
  ];
  
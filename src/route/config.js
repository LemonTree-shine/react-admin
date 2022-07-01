import React, { lazy, Suspense,useState } from "react";
export default [
    {
        path:'/index',
        component:lazy(() => import('@/page'))
    },
    {
        path:'/query',
        component:lazy(() => import('@/page/query'))
    },
]
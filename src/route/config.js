import React, { lazy, Suspense,useState } from "react";
export default [
    {
        path:'/baseInfo',
        component:lazy(() => import('@/page/baseInfo'))
    },
]
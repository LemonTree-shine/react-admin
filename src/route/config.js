import React, { lazy, Suspense,useState } from "react";
export default [
    {
        path:'/login',
        component:lazy(() => import('@/page/login'))
    },
    {
        path:'/baseInfo',
        component:lazy(() => import('@/page/baseInfo'))
    },
    
]
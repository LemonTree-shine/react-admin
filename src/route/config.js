import React, { lazy, Suspense, useState } from "react";
export default [
    {
        path: '/login',
        component: lazy(() => import('@/page/login'))
    },
    {
        path: '/baseInfo',
        component: lazy(() => import('@/page/baseInfo'))
    },
    {
        path: '/params',
        component: lazy(() => import('@/page/params'))
    },
    {
        path: '/protocol',
        component: lazy(() => import('@/page/protocol'))
    },
    {
        path: '/nav',
        component: lazy(() => import('@/page/navInfo.jsx'))
    },
]
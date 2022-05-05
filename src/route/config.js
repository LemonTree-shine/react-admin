import React, { lazy, Suspense,useState } from "react";
export default [{
    path:'/index',
    component:lazy(() => import('@/page'))
}]
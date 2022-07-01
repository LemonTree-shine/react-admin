import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Spin } from 'antd';
import './loading.scss';

export default function Loading() {
    return (
        <div className='page-request-loading-mask'>
            <Spin></Spin>
        </div>
    );
}

export function showLoading() {
    let currentWrap = document.querySelector('#root-loading-wrap');
    if (currentWrap) {
        return;
    }

    let loadWrap = document.createElement('div');
    loadWrap.id = 'root-loading-wrap';
    document.querySelector('#root').append(loadWrap);
    ReactDOM.render(<Loading />, loadWrap);
}

export function closeLoading() {
    let currentWrap = document.querySelector('#root-loading-wrap');
    if (!currentWrap) {
        return;
    }
    currentWrap.remove();
}

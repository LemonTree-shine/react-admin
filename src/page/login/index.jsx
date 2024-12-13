import { useState, useRef } from 'react';
import './index.scss';
import { login } from "@/api/index"
import { useNavigate } from "react-router-dom";

export default function () {

    const navigate = useNavigate();

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')


    const handleSubmit = () => {
        console.log(userName, password)
        login({
            userName,
            password
        }).then((res) => {
            let { data = {} } = res;
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate('/baseInfo')
        })
    }

    return <div className='login_wrap'>
        <div className='login_title'>CMS管理系统用户登录</div>
        <div className='input_wrap'>
            <input
                value={userName}
                type="text"
                placeholder='请输入用户名'
                onInput={(e) => {
                    setUserName(e.target.value)
                }}
            />
        </div>
        <div className='input_wrap'>
            <input
                value={password}
                type="password"
                placeholder='请输入密码'
                onInput={(e) => {
                    setPassword(e.target.value)
                }}
            />
        </div>
        <div className='login_btn' onClick={handleSubmit}>登录</div>
    </div>
}
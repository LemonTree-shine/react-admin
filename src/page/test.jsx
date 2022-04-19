
import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';
import Timo from "all-view";


function A(props){
    const {userInfo,dispatch} = Timo.useTimo();
    const [name,setName] = useState(userInfo.name);
    const [address,setAddress] = useState(userInfo.address);
    const history = useNavigate();
    return <div>
        <input value={name} onChange={(e)=>{ setName(e.target.value)}}/>
        <input value={address} onChange={(e)=>{ setAddress(e.target.value)}}/>
        <button onClick={()=>{
            setTimeout(() => {
                dispatch('',{
                    userInfo:{
                        ...userInfo,
                        name,
                        address 
                    },
                    
                });
                history('/info');
                console.log('更新成功')
            }, 1000);
            
        }}>提交</button>
    </div>
}

export default A;
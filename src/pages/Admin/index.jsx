import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom'
import { message } from 'antd';


import './index.css';
import { reqAdminUser, reqCategories } from '../../api/index';
import storageUtils from '../../utils/storageUtils';
import memoryUtils from '../../utils/memoryUtils';
import { getCategories } from '../../redux/features/categorySlice';

import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import Home from '../Home';
import Says from '../Says';
import Message from '../Message';
import Article from '../Article';


export default function Admin() {

  const dispatch = useDispatch()

  // 获取管理员用户
  const getAdminUser = async () => {
    const res = await reqAdminUser()
    if(res.status === 0) {
      // 将 admin 的信息放到用户存储中
      const user = res.data
      // 保存用户信息
      memoryUtils.user = user
      storageUtils.saveUser(user)
    }
  }

  useEffect(() => {
    getAdminUser()
  }, [])

  // 获取所有分类
  const getAllCategories = async () => {
    const res = await reqCategories()
    if (res.status === 0) {
      // 将数据放到 redux 中
      console.log(res.data);
      dispatch(getCategories(res.data))
    } else {
      message.error('获取列表失败！😔')
    }
  }

  useEffect(() => {
    getAllCategories()
  }, [])

  // 从 store 中提取分类
  const categories = useSelector(state => state)
  console.log('categories', categories);


  return (
    <div className='admin' id="body-wrap">
       <Header />
      {/* 路由跳转 */}
      <Routes>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/article' element={<Article/>}></Route>
        <Route path='/says' element={<Says/>}></Route>
        <Route path='/messages' element={<Message/>}></Route>
        <Route path='/' element={<Navigate to='/home'/>}></Route>
      </Routes>
      <Footer/>
    </div>
  )
}
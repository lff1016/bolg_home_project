import React, { useEffect } from 'react';
import { Typography, Pagination } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'

import { getArticles } from '../../redux/features/articleSlice';
import { reqArticles } from '../../api/index'

import Aside from '../../components/Layout/Aside';
import PostCard from './PostCard';

import './index.css';

export default function Home() {

  const navigate = useNavigate()

  const articles = useSelector(state => state.articles) // 获取 store 中的数据
  console.log('redux中的文章', articles);

  const dispatch = useDispatch()

  // 获取文章
  const getAllArticles = async () => {
    const res = await reqArticles()
    // 将数据放入 redux 中
    dispatch(getArticles(res.data))
  }

  // 组件挂载时请求文章数据
  useEffect(() => {
    getAllArticles()
  }, [])


  return (
    <main id='main'>
      <div id="content" className="content">
        {/* 文章卡片 */}
        {
          articles.articles.map(article => {
            return (
              <PostCard
                id={article._id}
                title={article.title}
                date={article.publishDate}
                category={article.category}
                content={article.content}
                imgUrl={article.coverImg[0]}  
                onClick={() => navigate(`/article?id=${article._id}`)}
              />
            )
          })
        }
        {/* 分页 */}
        <nav id="pagination">
          <Pagination defaultCurrent={1} pageSize={10} total={50} />
        </nav>
      </div>
      {/* 侧边栏 */}
      <Aside />
    </main>
  )
}
import Icon from '@/components/Icon'
import NavBar from '@/components/NavBar'
import { addSearchList, clearSearchList, getSuggestList } from '@/store/action/searchActions'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { clearSuggestions } from '@/store/reducers/search'
import { Dialog } from 'antd-mobile'
import classnames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.scss'

const Search = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  // 搜索关键字内容
  const [keyword, setKeyword] = useState('')
  // 控制历史记录和搜索结果的显示隐藏
  const [isSearching, setIsSearching] = useState(false)
  // 存储防抖定时器
  const timerRef = useRef(-1)
  const { suggestions, histories } = useAppSelector((state) => state.SearchSlice)
  const onKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value.trim()
    clearTimeout(timerRef.current)
    setKeyword(text)
    timerRef.current = window.setTimeout(() => {
      if (text) {
        dispatch(getSuggestList(text))
        setIsSearching(true)
      } else {
        setIsSearching(false)
      }
    }, 500)
  }
  /**
   * 
   * @param str 字符串
   * @param key 搜索关键字

   */
  const highlightKeyword = (str: string, key: string) => {
    return str.replace(new RegExp(key, 'gi'), (match: string) => {
      return `<span >${key}</span>`
    })
  }
  // 清空按钮
  const onClear = () => {
    // 清空搜索关键字
    setKeyword('')
    setIsSearching(false)
    // 清空搜索建议
    dispatch(clearSuggestions())
  }
  // 搜索按钮 和 点击搜索建议
  const onSearch = (k: string) => {
    if (!k.trim()) return
    // 保存搜索记录
    dispatch(addSearchList(k))
    // 跳转到搜索结果页面
    navigate(`/search/result?q=${k}`)
  }
  const delHistories = () => {
    Dialog.confirm({
      title: '温馨提示',
      content: '确定要清空历史记录吗？',
      onConfirm: () => {
        dispatch(clearSearchList())
      }
    })
  }
  // 销毁组件时记得最好要清理定时器
  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current)
    }
  }, [])

  return (
    <div className={styles.root}>
      {/* 顶部导航栏 */}
      <NavBar
        className="navbar"
        onLeftClick={() => navigate(-1)}
        rightContent={
          <span className="search-text" onClick={() => onSearch(keyword)}>
            搜索
          </span>
        }
      >
        <div className="navbar-search">
          <Icon type="iconbtn_search" className="icon-search" />

          <div className="input-wrapper">
            {/* 输入框 */}
            <input type="text" placeholder="请输入关键字搜索" value={keyword} onChange={onKeywordChange} />

            {/* 清空输入框按钮 */}
            <Icon type="iconbtn_tag_close" className="icon-close" onClick={onClear} />
          </div>
        </div>
      </NavBar>

      {/* 搜索历史 */}
      <div className="history" style={{ display: isSearching ? 'none' : 'block' }}>
        <div className="history-header">
          <span>搜索历史</span>
          <span onClick={delHistories}>
            <Icon type="iconbtn_del" />
            清除全部
          </span>
        </div>

        <div className="history-list">
          {histories.map((item, index) => (
            <span className="history-item" key={index} onClick={() => onSearch(item)}>
              {index !== 0 && <span className="divider"></span>}
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* 搜素建议结果列表 */}
      <div
        className={classnames('search-result', {
          show: isSearching
        })}
      >
        {suggestions.map((item, index) => (
          <div className="result-item" key={index} onClick={() => onSearch(item)}>
            <Icon className="icon-search" type="iconbtn_search" />
            <div className="result-value" dangerouslySetInnerHTML={{ __html: highlightKeyword(item, keyword) }}></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Search

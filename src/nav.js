//导航菜单
export default[
    {
        name:'全部',
        path:'/'
    },
    {
        name:'科幻',
        path:`/list/${encodeURIComponent('科幻')}`
    },
    {
        name:'悬疑',
        path:`/list/${encodeURIComponent('悬疑')}`
    },
    {
        name:'犯罪',
        path:`/list/${encodeURIComponent('犯罪')}`
    },
    {
        name:'恐怖',
        path:`/list/${encodeURIComponent('恐怖')}`
    }
]
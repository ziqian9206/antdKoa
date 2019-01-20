//布局模板组合
import React,{Component} from 'react'
import { Menu,Spin } from 'antd';
import navRoutes from '../nav'

const getMenuContent = ({path,name})=>(
    <a href={path?path:'/'} style={{color:'#fff2e8'}}>{name}</a>
)
export default class LayoutDefault extends Component{
    constructor(){
        super(props)
        this.state = {
            loading:false,
            tip:'再等一下下'
        }
    }
    componentDidMount(){
        window.__LOADING__ = this.toggleLoading
    }
    componentWillUnmount(){
        window.__LOADING__ = null
    }
    matchRouteName = this.props.match
        ?navRoutes.find(e=>e.name ===this.props.match.params.type)
         ?navRoutes.find(e=>e.name ===this.props.match.params.type).name:"全部"
        :navRoutes[0].name
    
        toggleLoading = (stats=false,tip='再等一下下')=>{
            this.setState({
                tip,
                loading:status
            })
        }

    render(){
        const {children} = this.props
        const {loading,tip} = this.state
        return(
            <div className='flex-colum' style={{width:'100%',height:'100%'}}>
                <Menu
                    style={{fontSize:13.5,backgroundColor:'#000'}}
                    mode='horizontal'
                    defaultSelectedKeys = {[this.matchRouteName]}
                >
                    <Menu.Item>
                        <a href={'/'} className='hover-scale logo-text'>预告片</a>
                    </Menu.Item>
                {
                    navRoutes.map((e,i)=>(
                        <Menu.Item key={e.name}>
                            {
                                getMenuContent({...e})
                            }
                        </Menu.Item>
                    ))
                }
                </Menu>
                <Spin spanning={loading} tip={tip} wrapperClassName='content-spin full'>
                    {children}
                </Spin>
            </div>
        )
    }
}
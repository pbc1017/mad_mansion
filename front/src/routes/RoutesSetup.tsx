import {Routes, Route} from 'react-router-dom'
import {Login} from '../pages/Login/'
import Home from './Home'
import {Map} from '../pages/Map/Map'
import ChatRoom from 'components/CHAT/chat'

export default function RouteSetup() {
    return (
        <Routes>
            <Route path= "/" element = {<Home/>}/>
            <Route path= "/login" element = {<Login/>}/>
            <Route path= "/map" element = {<Map addressProp='' />}/>
            <Route path= "/applyroom" element = {<ChatRoom/>}/>
        </Routes>
    )
}

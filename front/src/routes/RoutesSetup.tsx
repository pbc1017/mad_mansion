import {Routes, Route} from 'react-router-dom'
import {Login} from '../pages/Login/'
import Home from './Home'
import {Map} from '../pages/Map/Map'
import {ChatRoom} from '../components/ChatRoom'

export default function RouteSetup() {
    return (
        <Routes>
            <Route path= "/" element = {<Home/>}/>
            <Route path= "/login" element = {<Login/>}/>
            <Route path= "/map" element = {<Map addressProp='' />}/>
            <Route path= "/chatroom" element = {<ChatRoom className={"dsf"}/>}/>
        </Routes>
    )
}

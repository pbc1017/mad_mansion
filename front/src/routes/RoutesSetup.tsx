import {Routes, Route} from 'react-router-dom'
import {Login} from '../pages/Login/'
import Home from './Home'
import {Map} from '../pages/Map/Map'
import { Detail } from 'pages/Detail'


export default function RouteSetup() {
    return (
        <Routes>
            <Route path= "/" element = {<Home/>}/>
            <Route path= "/login" element = {<Login/>}/>
            <Route path= "/map" element = {<Map addressProp='' />}/>
            <Route path= "/detail" element = {<Detail placeId='대전광역시 22'/>}/>
        </Routes>
    )
}

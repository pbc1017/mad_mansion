import {Routes, Route} from 'react-router-dom'
import {Login} from '../pages/Login/'
import Home from './Home'
import {Map} from '../pages/Map/Map'


export default function RouteSetup() {
    return (
        <Routes>
            <Route path= "/" element = {<Home/>}/>
            <Route path= "/login" element = {<Login/>}/>
            <Route path= "/map" element = {<Map addressProp='' />}/>
     
        </Routes>
    )
}

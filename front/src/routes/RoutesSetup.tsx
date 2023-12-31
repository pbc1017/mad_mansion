import {Routes, Route} from 'react-router-dom'
import {Login} from '../pages/Login/'
import Home from './Home'
import {Map} from '../pages/Map/Map'
import { Detail } from 'pages/Detail'
import { MyMansion } from 'pages/MyMansion'
import {WishList} from 'pages/WishList'

export default function RouteSetup() {
    return (
        <Routes>
            <Route path= "/" element = {<Home/>}/>
            <Route path= "/login" element = {<Login/>}/>
            <Route path= "/map" element = {<Map />}/>
            <Route path= "/detail" element = {<Detail/>}/>
            <Route path= "/mymansion" element = {<MyMansion/>}/>
            <Route path= "/wishlist" element = {<WishList/>}/>
        </Routes>
    )
}

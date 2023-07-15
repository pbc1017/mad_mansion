import {FC} from 'react'
import {Link} from 'react-router-dom'

type HomeProps = {
    title? : string
}

const Home: FC<HomeProps> = ({title}) => {
    return (
        <div>
            <text>Hello</text>
        </div>
    )
};

export default Home;
import { Link } from "react-router"

export default () => {
    return (<>

        <nav style={{ position: 'absolute',top: '20px',right: '20px'}} >
        <Link to='/home'> Home </Link>
        | <Link to='/about'> About </Link>
    </nav >


    </>)
}
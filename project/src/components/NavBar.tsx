import { Link } from "react-router"
export default () => {
    return (<>
        <nav style={{ position: 'absolute', top: '20px', left: '500px' }} >
            <Link className="nav-link" to='/home'>Home</Link>
            <span> | </span>
            <Link className="nav-link" to='/recipe'>Recipes</Link>
        </nav >
    </>)
}

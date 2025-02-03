import { Box, Button } from "@mui/material"
import { Link } from "react-router"
export default () => {
    return (<>
        <nav style={{ position: 'absolute', top: '20px', left: '200px' }}>
            <Box display="flex" alignItems="center">
                <Button component={Link} to='/home' color="secondary" variant="text">
                    Home
                </Button>
                <span style={{ margin: '0 10px' }}> | </span>
                <Button component={Link} to='/recipe' color="secondary" variant="text">
                    Recipes
                </Button>
            </Box>
        </nav>
    </>)
}

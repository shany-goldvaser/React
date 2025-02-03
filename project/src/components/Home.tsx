import { Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';

const Home = () => {
  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <CardMedia
            component="img"
            height="140"
            image='../food.jpg'
            alt="Recipe Image"
          />
          <CardContent>
            <Typography variant="h5" component="div">
              Delicious Recipe
            </Typography>
            <Typography variant="body2" color="text.secondary">
              A brief description of the delicious recipe goes here.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h2" align="center" color='secondary'>
          HomePage
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Home;

import { createStyles, Grid, Image } from '@mantine/core';
import { LoginForm } from '../components/pages/Login';
import { Layout } from '../components/ui';
import loginBanner from '../assets/pages/login/login-banner.jpg';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userStore } from '../store';

const LoginPage = () => {
  const { classes } = useStyles();

  const navigate = useNavigate();

  const user = userStore((state) => state.user);

  useEffect(() => {
    if (user?.isActive) {
      navigate('/', { replace: true });
    }
  }, []);

  return (
    <Layout>
      {/* render desktop view */}
      <Grid sx={{ height: '100%', margin: 0 }} className={classes.desktop}>
        <Grid.Col md={4}>
          <LoginForm />
        </Grid.Col>
        <Grid.Col md={8} sx={{ padding: 0 }}>
          <Image src={loginBanner} fit='cover' className='image-container' />
        </Grid.Col>
      </Grid>
      {/* render mobile view */}
      <Grid sx={{ height: '100%', margin: 0 }} className={classes.mobile}>
        <Grid.Col md={12}>
          <LoginForm />
        </Grid.Col>
      </Grid>
    </Layout>
  );
};

const useStyles = createStyles(() => ({
  desktop: {
    ['@media (max-width: 1200px)']: {
      display: 'none',
    },
  },
  mobile: {
    ['@media (min-width: 1200px)']: {
      display: 'none',
    },
  },
}));

export default LoginPage;

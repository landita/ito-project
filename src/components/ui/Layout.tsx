import { Box, Container } from '@mantine/core';

interface Props {
  children?: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <Container fluid sx={{ padding: 0 }}>
      <Box
        component='main'
        sx={{
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        {children}
      </Box>
    </Container>
  );
};
export default Layout;

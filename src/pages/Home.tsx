import {
  Box,
  Container,
  createStyles,
  Divider,
  Group,
  Table,
} from '@mantine/core';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import {
  ApplicationForm,
  ApplicationTable,
  TableFilters,
} from '../components/pages/Home';
import { Layout, Navbar } from '../components/ui';
import { getApplications } from '../requests';
import { userStore } from '../store';

const HomePage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['applications'],
    queryFn: () => getApplications(),
    refetchInterval: 1000,
  });

  const { classes } = useStyles();

  const user = userStore((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.isActive) {
      navigate('/login', { replace: true });
    }
  }, []);

  return (
    <Layout>
      <Navbar />
      <Container fluid w='90%'>
        <Box sx={{ margin: '200px auto' }}>
          {user?.role === 'hr_specialist' && (
            <Group position='right'>
              <ApplicationForm />
              <TableFilters />
            </Group>
          )}
          <Divider my={20} />
          <Table striped highlightOnHover withBorder withColumnBorders>
            <thead>
              <tr>
                <th>Medical Unit</th>
                <th>Established Date</th>
                <th>Doctor Name</th>
                <th>Medical Diagnostic</th>
                <th>Coverage Days</th>
                <th>Employee FullName</th>
                <th>Position</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan={8} className={classes.noData}>
                    Loading data...
                  </td>
                </tr>
              )}
              {data?.length === 0 ? (
                <tr>
                  <td colSpan={8} className={classes.noData}>
                    There is not data available yet.
                  </td>
                </tr>
              ) : (
                data?.map((curr) => (
                  <ApplicationTable key={curr.id} curr={curr} />
                ))
              )}
            </tbody>
          </Table>
        </Box>
      </Container>
    </Layout>
  );
};

const useStyles = createStyles(() => ({
  noData: {
    textAlign: 'center',
  },
}));
export default HomePage;

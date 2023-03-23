/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Box,
  Container,
  createStyles,
  Divider,
  Group,
  Pagination,
  Table,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import {
  ApplicationForm,
  ApplicationTable,
  TableFilters,
} from '../components/pages/Home';
import { Layout, Navbar } from '../components/ui';
import { getApplications } from '../requests';
import { applicationStore, userStore } from '../store';

const HomePage = () => {
  const { classes } = useStyles();

  const user = userStore((state) => state.user);

  const { applications, setApplications } = applicationStore((state) => ({
    applications: state.applications,
    setApplications: state.setApplications,
  }));

  const { isLoading } = useQuery({
    queryKey: ['applications'],
    queryFn: () => getApplications(),
    refetchInterval: 1000,
    onSuccess: (data) => {
      setApplications(data);
    },
  });

  // eslint-disable-next-line no-unused-vars
  const [activePage, setPage] = useState(1);

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
        <Box sx={{ margin: '150px auto' }}>
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
                <th>Doctor Name</th>
                <th>Medical Diagnostic</th>
                <th>Coverage Days</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan={7} className={classes.noData}>
                    Loading data...
                  </td>
                </tr>
              )}
              {applications?.length === 0 ? (
                <tr>
                  <td colSpan={7} className={classes.noData}>
                    There is not data available yet.
                  </td>
                </tr>
              ) : (
                applications
                  ?.filter((curr) => {
                    if (user?.role === 'employee') {
                      return curr.employeeId === user.employeeId;
                    }
                    return curr;
                  })
                  .map((curr) => <ApplicationTable key={curr.id} curr={curr} />)
              )}
            </tbody>
          </Table>
          <Pagination
            mt={30}
            onChange={setPage}
            total={applications!.length}
            position='center'
          />
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

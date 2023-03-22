import { ActionIcon, Box, Container, Group, List, Text } from '@mantine/core';
import { useState } from 'react';
import { TbLogout } from 'react-icons/tb';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../requests';
import { userStore } from '../../store';

const Navbar = () => {
  const { user, logout } = userStore((state) => ({
    user: state.user,
    logout: state.logoutSession,
  }));
  const [isLoadingSettings, setIsLoadingSettings] = useState(false);
  const { mutate } = useMutation({
    mutationFn: logOut,
    onSuccess: () => {
      logout();
      navigate('/login', { replace: true });
    },
  });
  const navigate = useNavigate();

  return (
    <Box
      component='div'
      sx={{
        width: '100%',
        height: 60,
      }}
    >
      <Container
        fluid
        w='90%'
        sx={{
          height: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <List
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <List.Item>
            <Text color='indigo' fw={700}>
              ITO Services
            </Text>
          </List.Item>
        </List>
        <List
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <List.Item>
            <Text
              sx={{ cursor: 'pointer' }}
              onClick={() => setIsLoadingSettings(!isLoadingSettings)}
            >
              {user?.username}
            </Text>
            {isLoadingSettings && (
              <List
                sx={{
                  position: 'absolute',
                  top: 50,
                  borderRadius: 20,
                  cursor: 'pointer',
                  padding: 10,
                  boxShadow:
                    'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;',
                }}
                onClick={() => {
                  mutate();
                }}
              >
                <List.Item>
                  <Group>
                    <Text>Logout</Text>
                    <ActionIcon>
                      <TbLogout color='indigo' />
                    </ActionIcon>
                  </Group>
                </List.Item>
              </List>
            )}
          </List.Item>
        </List>
      </Container>
    </Box>
  );
};
export default Navbar;

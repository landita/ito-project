import { Button, Group, TextInput, Text, Loader } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { TbUser, TbX } from 'react-icons/tb';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { logIn } from '../../../requests';
import { userStore } from '../../../store';
import { FormLayout } from '../../ui';

const schema = Yup.object().shape({
  email: Yup.string().required().email(),
  password: Yup.string().required(),
});

const LoginForm = () => {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validateInputOnChange: true,
    validateInputOnBlur: true,
    validate: yupResolver(schema),
  });

  const { mutate, isSuccess } = useMutation({
    mutationFn: (values: { [key: string]: string }) =>
      logIn(values.email, values.password),
    onSuccess: (data) => {
      setSession(data);
      navigation('/');
    },
    onError: () =>
      notifications.show({
        withCloseButton: true,
        autoClose: 5000,
        title: 'Server Error',
        message: 'This user does not exist',
        color: 'red',
        icon: <TbX />,
      }),
  });
  const setSession = userStore((state) => state.setSession);

  const navigation = useNavigate();

  return (
    <>
      {isSuccess && <Loader />}
      <FormLayout
        title='ITO Services - Login'
        titleColor='indigo'
        flexDirection='column'
        onSubmit={form.onSubmit(async (values) => {
          mutate(values);
        })}
      >
        <TextInput
          w='80%'
          my={20}
          label='email'
          placeholder='ito.services@gmail.com'
          type='email'
          {...form.getInputProps('email')}
          withAsterisk
        />
        <TextInput
          w='80%'
          label='password'
          type='password'
          {...form.getInputProps('password')}
          withAsterisk
        />
        <Button
          w='80%'
          mt={20}
          type='submit'
          color='indigo'
          disabled={!form.isValid}
          rightIcon={<TbUser />}
        >
          Sign In
        </Button>
        <Group mt={20} w='80%' position='apart'>
          <Text component='a' href='' target='_blank' color='indigo'>
            Sign Up
          </Text>
          <Text component='a' href='' target='_blank' color='indigo'>
            Forgot Password
          </Text>
        </Group>
      </FormLayout>
    </>
  );
};
export default LoginForm;

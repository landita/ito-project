import { notifications } from '@mantine/notifications';

interface Props {
  title: string;
  message?: string;
  color: string;
  icon: React.ReactNode;
}

const ShowNotification = ({ title, message, color, icon }: Props) => {
  return (
    <>
      {notifications.show({
        withCloseButton: true,
        autoClose: 5000,
        title,
        message,
        color,
        icon,
        loading: false,
      })}
    </>
  );
};
export default ShowNotification;

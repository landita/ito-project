import { Button, Group, Loader, Modal, ActionIcon, Box } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { TbPencil, TbTrash } from 'react-icons/tb';
import { useMutation } from 'react-query';
import { deleteApplication } from '../../../requests';

interface Props {
  modelId: string;
  title?: string;
}

const ConfirmModal = ({ title, modelId }: Props) => {
  const [isOpened, { open, close }] = useDisclosure(false);

  const { mutate, isLoading } = useMutation((id: string) =>
    deleteApplication(id),
  );

  return (
    <>
      <Modal opened={isOpened} onClose={close} title={title} centered>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Group>
            {isLoading && <Loader />}
            <Button
              rightIcon={<TbPencil />}
              onClick={() => {
                mutate(modelId);
                close();
              }}
              color='indigo'
            >
              Confirm
            </Button>
            <Button rightIcon={<TbTrash />} color='gray' onClick={close}>
              Cancel
            </Button>
          </Group>
        </Box>
      </Modal>
      <ActionIcon onClick={open}>
        <TbTrash color='red' />
      </ActionIcon>
    </>
  );
};

export default ConfirmModal;

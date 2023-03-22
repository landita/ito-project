import { Button, Modal, TextInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { TbSearch, TbFilter } from 'react-icons/tb';
import { FormLayout } from '../../ui';

const TableFilters = () => {
  const [isOpened, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      fullName: '',
      startDate: new Date(),
      endDate: new Date(),
    },
    validateInputOnBlur: true,
    validateInputOnChange: true,
  });

  return (
    <>
      <Modal opened={isOpened} onClose={close} title='Filter Form' centered>
        <FormLayout
          gap={15}
          title=''
          onSubmit={form.onSubmit((values) => {
            const m = values;
            m.fullName = '';
          })}
        >
          <TextInput
            w='100%'
            label='Employee Name'
            placeholder='Employee Full-Name'
            {...form.getInputProps('fullName')}
          />
          <DateInput
            w='100%'
            label='Start Date'
            placeholder='Start Date'
            {...form.getInputProps('startDate')}
          />
          <DateInput
            w='100%'
            label='End Date'
            placeholder='End Date'
            {...form.getInputProps('endDate')}
          />
          <Button
            type='submit'
            disabled={!form.isValid}
            rightIcon={<TbSearch />}
            color='indigo'
            w='100%'
          >
            Search
          </Button>
        </FormLayout>
      </Modal>
      <Button
        color='indigo'
        rightIcon={<TbFilter />}
        type='button'
        onClick={open}
      >
        Show Filters
      </Button>
    </>
  );
};
export default TableFilters;

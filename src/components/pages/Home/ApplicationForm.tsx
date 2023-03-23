import { useState, useEffect } from 'react';
import {
  Button,
  Grid,
  Modal,
  NumberInput,
  Select,
  Textarea,
  TextInput,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm, yupResolver } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { TbPlus, TbPencil } from 'react-icons/tb';
import { useMutation, useQuery } from 'react-query';
import * as Yup from 'yup';
import { Applications } from '../../../interfaces';
import { FormLayout } from '../../ui';
import { addNewApplication, getEmployees } from '../../../requests';

const schema = Yup.object().shape({
  medicalUnit: Yup.string().required(),
  doctorName: Yup.string().required(),
  coverageDays: Yup.number().required().min(0),
  medicalDiagnostic: Yup.string().required(),
  startDate: Yup.date().required(),
  endDate: Yup.date().required(),
  employeeId: Yup.string().required(),
});

const ApplicationForm = () => {
  const form = useForm({
    initialValues: {
      medicalUnit: 'isss',
      startDate: '',
      endDate: '',
      doctorName: '',
      coverageDays: 0,
      medicalDiagnostic: '',
      employeeId: '',
    },
    validate: yupResolver(schema),
    validateInputOnBlur: true,
    validateInputOnChange: true,
  });

  const [isOpened, { open, close }] = useDisclosure(false);

  const [medicalUnit, setMedicalUnit] = useState<string | null>(null);

  const [employeeData, setEmployeeData] = useState<string | null>(null);

  const { mutate, isLoading } = useMutation((model: Applications) =>
    addNewApplication(model),
  );

  const { data, isLoading: isLoadingData } = useQuery({
    queryKey: ['employees'],
    queryFn: getEmployees,
  });

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    form.setFieldValue('employeeId', employeeData!);
  }, [employeeData]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    form.setFieldValue('medicalUnit', medicalUnit!);
  }, [medicalUnit]);

  return (
    <>
      <Button
        color='indigo'
        rightIcon={<TbPlus />}
        type='button'
        onClick={open}
      >
        New Application
      </Button>
      <Modal
        opened={isOpened}
        onClose={close}
        title='New Application Form'
        centered
        size='lg'
      >
        <FormLayout
          title=''
          flexDirection='column'
          onSubmit={form.onSubmit((values) => {
            mutate(values as Applications);
            close();
          })}
        >
          <Grid>
            <Grid.Col md={6}>
              <Select
                {...form.getInputProps('medicalUnit')}
                value={medicalUnit}
                onChange={setMedicalUnit}
                data={[
                  {
                    value: 'isss',
                    label: 'isss',
                  },
                  {
                    value: 'minsal',
                    label: 'minsal',
                  },
                ]}
              />
            </Grid.Col>
            {/* employees id select goes here */}
            <Grid.Col md={6}>
              <Select
                {...form.getInputProps('employeeId')}
                defaultValue='test'
                value={employeeData}
                onChange={setEmployeeData}
                data={
                  (isLoadingData as boolean)
                    ? []
                    : // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                      data!.map((curr) => ({
                        label: `${curr.fullName} - ${curr.position}`,
                        value: curr.id,
                      }))
                }
              />
            </Grid.Col>
            <Grid.Col md={6}>
              <DateInput
                label='Start Date'
                withAsterisk
                {...form.getInputProps('startDate')}
              />
            </Grid.Col>
            <Grid.Col md={6}>
              <DateInput
                label='End Date'
                withAsterisk
                {...form.getInputProps('endDate')}
              />
            </Grid.Col>
            <Grid.Col md={6}>
              <TextInput
                label='Doctor Name'
                withAsterisk
                {...form.getInputProps('doctorName')}
              />
            </Grid.Col>
            <Grid.Col md={6}>
              <NumberInput
                label='Coverage Days'
                withAsterisk
                {...form.getInputProps('coverageDays')}
              />
            </Grid.Col>
            <Grid.Col md={12}>
              <Textarea
                label='Medical Diagnostic'
                withAsterisk
                {...form.getInputProps('medicalDiagnostic')}
              />
            </Grid.Col>
            <Grid.Col md={12}>
              <Button type='submit' color='indigo' rightIcon={<TbPencil />}>
                {isLoading ? 'Loading...' : 'Submit'}
              </Button>
            </Grid.Col>
          </Grid>
        </FormLayout>
      </Modal>
    </>
  );
};
export default ApplicationForm;

import { Applications } from '../../../interfaces';
import ConfirmModal from './ConfirmModal';

interface Props {
  curr: Applications;
}
const ApplicationTable = ({ curr }: Props) => {
  return (
    <tr>
      <td>{curr.medicalUnit}</td>
      <td>{curr.doctorName}</td>
      <td>{curr.medicalDiagnostic}</td>
      <td>{curr.coverageDays}</td>
      <td>
        <ConfirmModal
          title='Delete Application Confirm Modal'
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          modelId={curr.id!}
        />
      </td>
    </tr>
  );
};
export default ApplicationTable;

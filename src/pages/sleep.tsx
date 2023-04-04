import { SleepForm } from "~/components/SleepForm";
import withAuth from "~/withAuth";

const Sleep: React.FC = () => {
  return (
    <>
      <SleepForm />
    </>
  );
};

export default withAuth(Sleep);

import {findAllByUsername} from "../../../services/billingService";
import Bills from "../index";
import StoreHeading from "@/components/StoreHeading";

const Username = ({bills, username}) => {

    return (
        <div className="min-h-screen">
          <StoreHeading title={`Facturas para ${username}`}/>
          <Bills bills={bills}/>
        </div>
        );
};

export async function getServerSideProps(context) {
  const { username } = context.params;
  const  bills = await findAllByUsername(username);

  return {
    props: {
        bills,
        username
    },
  };
}

export default Username;
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import CreateShipment from "./CreateShipment";
import { chain, client } from "@/utils/constants";

const Login = () => {
  const account = useActiveAccount();
  return (
    <div className="flex justify-center mb-20">
      {account ? (
        <>
          <ConnectButton
            client={client}
            chain={chain}
            appMetadata={{
              name: "Alpinist Supply Chain DApp",
              url: "https://example.com",
            }}
          />
          {/* <CreateShipment /> */}
        </>
      ) : (
        <>
          <ConnectButton
            client={client}
            chain={chain}
            appMetadata={{
              name: "Alpinist Supply Chain DApp",
              url: "https://example.com",
            }}
          />
        </>
      )}
    </div>
  );
};

export default Login;

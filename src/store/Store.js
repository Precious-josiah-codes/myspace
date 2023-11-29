import { Web5 } from "@web5/api";
import { create } from "zustand";

const useStore = create((set) => ({
  web5: null,
  myDid: null,
}));

// create DID, Connect to web5
export const initWeb5 = async () => {
  console.log("Initializing web 5");
  const { web5, did } = await Web5.connect();

  // setting the web5 and did state
  useStore.setState({ web5: web5 });
  useStore.setState({ myDid: did });

  console.log("Web5 initialized, and DID created/connected");
  console.log("Web5: ", web5, "DID: ", did);

  if (web5 && did) {
    // configure protocol
    await configureProtocol(web5, did);
  }
};

async function configureProtocol(web5, did) {
  console.log("Configuring Protocol");
}

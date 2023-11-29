import { Web5 } from "@web5/api";
import { create } from "zustand";

let PROTOCOL_URI =
  process.env.NEXT_PUBLIC_MYAPP_ENV === "dev"
    ? "https://myspace.app"
    : "https://prod/myspace.app";
let PROFILE_SCHEMA =
  process.env.NEXT_PUBLIC_MYAPP_ENV === "dev"
    ? "https://myspace.app/profile"
    : "https://prod/myspace.app/profile";
let SPACE_SCHEMA =
  process.env.NEXT_PUBLIC_MYAPP_ENV === "dev"
    ? "https://myspace.app/space"
    : "https://prod/myspace.app/space";

let protocolDefinition = {
  protocol: PROTOCOL_URI,
  published: true,
  types: {
    profile: {
      schema: PROFILE_SCHEMA,
      dataFormats: ["application/json"],
    },
    space: {
      schema: SPACE_SCHEMA,
      dataFormats: ["application/json"],
    },
  },
  structure: {
    profile: {
      $actions: [
        { who: "anyone", can: "write" },
        { who: "anyone", can: "read" },
      ],
    },
    space: {
      $actions: [
        { who: "anyone", can: "write" },
        { who: "anyone", can: "read" },
      ],
    },
  },
};

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

// querying and installing the protocol
async function configureProtocol(web5, did) {
  console.log("Configuring protocol");

  // query local protocol
  const { protocols: queriedProtocol, status: queriedProtocolStatus } =
    await queryProtocol(web5);

  // if protocol is not installed
  if (queriedProtocolStatus.code !== 200 || queriedProtocol.length === 0) {
    // install local protocol
    const { protocol: installedProtocol, status: installProtocolStatus } =
      await installProtocol(web5, protocolDefinition);

    if (installProtocolStatus.status === 202)
      console.log("protocol installed locally");

    // install remote protocol
    const { status: remoteProtocolStatus } = await installedProtocol.send(did);
    if (remoteProtocolStatus.status === 202)
      console.log("protocol installed remotely");
  } else {
    console.log("Protocol already installed");
  }
}

// querying local protocol
async function queryProtocol(web5) {
  console.log("Querying protocol");
  return await web5.dwn.protocols.query({
    message: {
      filter: {
        protocol: PROTOCOL_URI,
      },
    },
  });
}

// install protocol
async function installProtocol(web5, protocolDefinition) {
  console.log("Installing protocol");
  return await web5.dwn.protocols.configure({
    message: {
      definition: protocolDefinition,
    },
  });
}

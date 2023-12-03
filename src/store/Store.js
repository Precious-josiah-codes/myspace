// import { Web5 } from "@web5/api";
import { Web5 } from "@web5/api/browser";
import { create } from "zustand";

let PROTOCOL_URI =
  process.env.NEXT_PUBLIC_MYAPP_ENV === "dev"
    ? "https://myspace.app"
    : "https://prod/myspace.app";
let PROFILE_SCHEMA =
  process.env.NEXT_PUBLIC_MYAPP_ENV === "dev"
    ? "https://myspace.app/profile"
    : "https://prod/myspace.app/profile";
let PROFILE_PHOTO_SCHEMA =
  process.env.NEXT_PUBLIC_MYAPP_ENV === "dev"
    ? "https://myspace.app/profile/profile_photo"
    : "https://prod/myspace.app/profile/profile_photo";

let SPACE_SCHEMA =
  process.env.NEXT_PUBLIC_MYAPP_ENV === "dev"
    ? "https://myspace.app/space"
    : "https://prod/myspace.app/space";
let PUBLIC_SPACE_SCHEMA =
  process.env.NEXT_PUBLIC_MYAPP_ENV === "dev"
    ? "https://myspace.app/public_space"
    : "https://prod/myspace.app/public_space";

// protocol definition
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
    publicSpace: {
      schema: PUBLIC_SPACE_SCHEMA,
      dataFormats: ["application/json"],
    },
    image: {
      schema: PROFILE_PHOTO_SCHEMA,
      dataFormats: ["image/png", "image/jpeg"],
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
    publicSpace: {
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
  try {
    console.log("Configuring protocol");

    // query local protocol
    const { protocols: queriedProtocol, status: queriedProtocolStatus } =
      await queryProtocol(web5);

    // if protocol is not installed
    if (queriedProtocolStatus.code !== 200 || queriedProtocol.length === 0) {
      // install local protocol
      const { protocol: installedProtocol, status: installProtocolStatus } =
        await installProtocol(web5, protocolDefinition);

      console.log(installProtocolStatus, "localprotocol status");

      if (installProtocolStatus.code === 202)
        console.log("protocol installed locally");

      // install remote protocol
      const { status: remoteProtocolStatus } = await installedProtocol.send(
        did
      );

      console.log(remoteProtocolStatus, "remoteprotocol status");
      if (remoteProtocolStatus.code === 202)
        console.log("protocol installed remotely");
    } else {
      console.log("Protocol already installed");
    }
  } catch (error) {
    console.error(error, "error");
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

// create profile
export const createProfile = async (data) => {
  console.log(data, "the data");
  try {
    // destructuring the data
    const { name, profileImage, gender } = data;
    const myDid = useStore.getState().myDid;
    const web5 = useStore.getState().web5;
    let base64Image;

    // getting the binary image file
    console.log(profileImage, "the image");
    const binaryImage = await profileImage.arrayBuffer();
    base64Image = btoa(
      new Uint8Array(binaryImage).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ""
      )
    );

    // get current date and time
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();

    // construct user profile
    const userProfile = {
      name: name,
      profileId: myDid,
      gender,
      timestampWritten: `${currentDate} ${currentTime}`,
      profileImage: base64Image,
    };

    // writing the profile recod locally
    const { record, status } = await web5.dwn.records.create({
      data: userProfile,
      message: {
        protocol: PROTOCOL_URI,
        protocolPath: "profile",
        schema: PROFILE_SCHEMA,
        recipient: myDid,
        dataFormat: "application/json",
      },
    });

    console.log(status, "this is status");

    const { status: myDidStatus } = await record.send(myDid);
    // console.log("message written to local DWN", { record, status });
    console.log("message written to remote DWN", { myDidStatus });
    return true;
  } catch (error) {
    console.error("Error writing secret message to DWN", error);
  }
};

// store the profile picture of the user
const storeProfileImage = () => {};

export const fetchProfile = async () => {
  console.log("Fetching sent messages...");
  try {
    const web5 = useStore.getState().web5;
    const did = useStore.getState().myDid;
    console.log(web5, did, PROTOCOL_URI, "web5");
    const response = await web5.dwn.records.query({
      message: {
        filter: {
          dataFormat: "application/json",
        },
      },
    });

    if (response.status.code === 200) {
      const userMessages = await Promise.all(
        response.records.map(async (record) => {
          const data = await record.data.json();
          return {
            ...data,
            recordId: record.id,
          };
        })
      );
      console.log(userMessages, "THE PROFILE");
      return userMessages;
    } else {
      console.error("Error fetching sent messages:", response.status);
      return [];
    }
  } catch (error) {
    console.error("Error in fetchSentMessages:", error);
  }
};

export const fetchImage = () => {};

// i used this for the remote dwn
export const tryFetch = async () => {
  const web5 = useStore.getState().web5;
  const did = useStore.getState().myDid;

  const { records } = await web5.dwn.records.query({
    from: did,
    message: {
      filter: {
        schema: PROFILE_SCHEMA,
        dataFormat: "application/json",
      },
    },
  });

  console.log(records, "the record");

  let recordId = records.map((record) => {
    console.log(record.id, "the id");
    return record.id;
  });

  let { record } = await web5.dwn.records.read({
    message: {
      filter: {
        recordId: recordId[0],
      },
    },
  });

  // assuming the record has a text payload
  const text = await record.data.json();
  console.log(text, "gotcha");
};

export const createRecord = async () => {
  const web5 = useStore.getState().web5;
  const myDid = useStore.getState().myDid;

  const { record, status } = await web5.dwn.records.create({
    data: {
      username: "precious",
      age: 90,
    },
    message: {
      protocol: PROTOCOL_URI,
      protocolPath: "profile",
      schema: PROFILE_SCHEMA,
      recipient: myDid,
      dataFormat: "application/json",
    },
  });

  // const { status: myDidStatus } = await record.send(myDid);
  console.log("message written to local DWN", { record, status });
  // console.log("message written to remote DWN", { myDidStatus });
};

export const getProfile = async () => {
  const web5 = useStore.getState().web5;
  const did = useStore.getState().myDid;

  const { records } = await web5.dwn.records.query({
    message: {
      filter: {
        protocol: PROTOCOL_URI,
        // schema: PROFILE_SCHEMA,
      },
    },
  });

  console.log(records, "the records");
  let recordId = records.map((record) => {
    console.log(record.id, "the id");
    return record.id;
  });

  let { record } = await web5.dwn.records.read({
    message: {
      filter: {
        recordId: recordId[0],
      },
    },
  });

  // assuming the record has a text payload
  const text = await record.data.json();
  console.log(text, "gotcha");
  return text;
};

// NOTE: private, public and shared space should have thier own protocol
export const createSpace = async () => {
  const web5 = useStore.getState().web5;
  const myDid = useStore.getState().myDid;

  const { record, status } = await web5.dwn.records.create({
    data: {
      name: "my images",
      description: 90,
      type: "private",
    },
    message: {
      protocol: PROTOCOL_URI,
      protocolPath: "space",
      schema: SPACE_SCHEMA,
      recipient: myDid,
      dataFormat: "application/json",
    },
  });

  console.log(status, "status");
};

export const readSpace = async () => {
  const web5 = useStore.getState().web5;
  const did = useStore.getState().myDid;

  const { records } = await web5.dwn.records.query({
    message: {
      filter: {
        // protocol: PROTOCOL_URI,
        schema: SPACE_SCHEMA,
      },
    },
  });

  console.log(records, "the records");
  let recordId = records.map((record) => {
    console.log(record.id, "the id");
    return record.id;
  });

  let { record } = await web5.dwn.records.read({
    message: {
      filter: {
        recordId: recordId[0],
      },
    },
  });

  // assuming the record has a text payload
  const text = await record.data.json();
  console.log(text, "gotcha");
  return text;
};

export const createPublicSpace = async () => {
  const web5 = useStore.getState().web5;
  const myDid = useStore.getState().myDid;
  const { record, status } = await web5.dwn.records.write({
    data: { name: "precious space", desc: "this is my space" },
    message: {
      protocol: PROTOCOL_URI,
      protocolPath: "publicSpace",
      schema: PUBLIC_SPACE_SCHEMA,
      dataFormat: "application/json",
      published: true,
    },
  });

  // let remotedwn = await record.send(myDid);
  console.log(record, "hello all my users");
  // console.log(remotedwn, "hello all my users");
};

export const readPublicSpace = async () => {
  const web5 = useStore.getState().web5;
  let record = await web5.dwn.records.query({
    message: {
      filter: {
        schema: PUBLIC_SPACE_SCHEMA,
        dataFormat: "application/json",
      },
    },
  });

  console.log(record, "hello all my records");
};

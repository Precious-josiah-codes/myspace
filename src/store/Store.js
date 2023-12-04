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
  console.log(data, "tprofile data");
  try {
    // destructuring the data
    const myDid = useStore.getState().myDid;
    const web5 = useStore.getState().web5;

    // get current date and time
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();

    // construct user profile
    const userProfile = {
      ...data,
      profileId: myDid,
      timestampWritten: `${currentDate} ${currentTime}`,
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

    // send record to remote dwn immediately
    const { status: myDidStatus } = await record.send(myDid);
    console.log("data written to local DWN", { record, status });
    console.log("data written to remote DWN", { myDidStatus });
    return true;
  } catch (error) {
    return false;
    console.error("Error writing secret message to DWN", error);
  }
};

// fetch profile
export const readProfile = async () => {
  console.log("Fetching profile...");
  try {
    const web5 = useStore.getState().web5;
    const myDid = useStore.getState().myDid;
    const response = await web5.dwn.records.query({
      from: myDid,
      message: {
        filter: {
          schema: PROFILE_SCHEMA,
        },
      },
    });

    if (response.status.code === 200) {
      const userMessages = await Promise.all(
        response.records.map(async (record) => {
          const data = await record.data.json();
          return data;
        })
      );
      return userMessages;
    } else {
      console.error("Error fetching sent messages:", response.status);
      return [];
    }
  } catch (error) {
    console.error("Error in fetchSentMessages:", error);
  }
};

// create space
export const createSpace = async (data) => {
  try {
    const web5 = useStore.getState().web5;
    const myDid = useStore.getState().myDid;

    let base64Image;

    // getting the binary image file
    const binaryImage = await data.spaceImage.arrayBuffer();
    base64Image = btoa(
      new Uint8Array(binaryImage).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ""
      )
    );

    data["spaceImage"] = base64Image;

    // get current date and time
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();

    // construct user profile
    const userProfile = {
      ...data,
      timestampWritten: `${currentDate} ${currentTime}`,
    };

    const { record, status } = await web5.dwn.records.create({
      data: userProfile,
      message: {
        protocol: PROTOCOL_URI,
        protocolPath: "space",
        schema: SPACE_SCHEMA,
        dataFormat: "application/json",
      },
    });

    if (status.code === 202) {
      console.log(userProfile, "userProfile");
      console.log(record, "the returned record");
      const { status: remoteDwnStatus } = await record.send(myDid);

      if (remoteDwnStatus.code === 202) {
        return {
          success: true,
          message: "space created successfully",
        };
      }
    }
  } catch (error) {
    console.error(error, "error message");
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

// read space
export const getUserSpace = async () => {
  try {
    const web5 = useStore.getState().web5;
    const myDid = useStore.getState().myDid;

    // getting the space records
    const { records } = await web5.dwn.records.query({
      from: myDid,
      message: {
        filter: {
          schema: SPACE_SCHEMA,
        },
      },
    });

    // declare myspace
    let mySpace = [];

    // mapping throught the mixed records
    let spaceRecords = records.map(async (record) => {
      let { record: space } = await web5.dwn.records.read({
        message: {
          filter: {
            recordId: record.id,
          },
        },
      });

      // querying the record data in json
      const spaces = await space.data.json();

      // if spaces, add to the array
      if (spaces) {
        mySpace.push(spaces);
      }
    });

    // Wait for all promises to resolve
    Promise.all(spaceRecords)
      .then(() => {
        // All asynchronous operations completed
        console.log("All spaces fetched:", mySpace);
        return mySpace;
      })
      .catch((error) => {
        console.error("Error fetching spaces:", error);
      });
  } catch (error) {
    console.error("Something went wrong", error);
    return {
      success: false,
      message: "Something went  wrong",
    };
  }
};

import { kv } from "@vercel/kv";
import axios from "axios";
import { create } from "zustand";

let PROTOCOL_URI =
  process.env.NEXT_PUBLIC_MYAPP_ENV === "dev"
    ? "https://myspace.app"
    : "https://prod/myspace.app";
let PROFILE_SCHEMA =
  process.env.NEXT_PUBLIC_MYAPP_ENV === "dev"
    ? "https://myspace.app/profile"
    : "https://prod/myspace.app/profile";

let READ_PROFILE_SCHEMA =
  process.env.NEXT_PUBLIC_MYAPP_ENV === "dev"
    ? "https://myspace.app/profile/readProfile"
    : "https://prod/myspace.app/profile/readProfile";

let PRIVATE_SPACE_SCHEMA =
  process.env.NEXT_PUBLIC_MYAPP_ENV === "dev"
    ? "https://myspace.app/privateSpace"
    : "https://prod/myspace.app/privateSpace";

let PUBLIC_SPACE_SCHEMA =
  process.env.NEXT_PUBLIC_MYAPP_ENV === "dev"
    ? "https://myspace.app/publicSpace"
    : "https://prod/myspace.app/publicSpace";

let SHARED_SPACE_SCHEMA =
  process.env.NEXT_PUBLIC_MYAPP_ENV === "dev"
    ? "https://myspace.app/sharedSpace"
    : "https://prod/myspace.app/sharedSpace";

let READ_PRIVATE_SPACE_SCHEMA =
  process.env.NEXT_PUBLIC_MYAPP_ENV === "dev"
    ? "https://myspace.app/readPrivateSpace"
    : "https://prod/myspace.app/readPrivateSpace";

let DELETE_UPDATE_PRIVATE_SPACE_SCHEMA =
  process.env.NEXT_PUBLIC_MYAPP_ENV === "dev"
    ? "https://myspace.app/deleteUpdatePrivateSpace"
    : "https://prod/myspace.app/deleteUpdatePrivateSpace";

let READ_PUBLIC_SPACE_SCHEMA =
  process.env.NEXT_PUBLIC_MYAPP_ENV === "dev"
    ? "https://myspace.app/readPublicSpace"
    : "https://prod/myspace.app/readPublicSpace";

let DELETE_UPDATE_PUBLIC_SPACE_SCHEMA =
  process.env.NEXT_PUBLIC_MYAPP_ENV === "dev"
    ? "https://myspace.app/deleteUpdatePublicSpace"
    : "https://prod/myspace.app/deleteUpdatePublicSpace";

let NOTIFICATION_SCHEMA =
  process.env.NEXT_PUBLIC_MYAPP_ENV === "dev"
    ? "https://myspace.app/notification"
    : "https://prod/myspace.app/notification";

let DID_SCHEMA =
  process.env.NEXT_PUBLIC_MYAPP_ENV === "dev"
    ? "https://myspace.app/did"
    : "https://prod/myspace.app/did";

// protocol definition
// TODO: FIX THE BUTTON LOADER ON THE ACCOUNT CREATION. ITS NOT DISPLAYING

const protoxcolDefinition = {
  protocol: "https://social-media.xyz",
  published: true,
  types: {
    post: {
      schema: "https://social-media.xyz/schemas/postSchema",
      dataFormats: ["text/plain"],
    },
    reply: {
      schema: "https://social-media.xyz/schemas/replySchema",
      dataFormats: ["text/plain"],
    },
    image: {
      dataFormats: ["image/jpeg"],
    },
    caption: {
      schema: "https://social-media.xyz/schemas/captionSchema",
      dataFormats: ["text/plain"],
    },
  },
  structure: {
    post: {
      $actions: [
        {
          who: "anyone",
          can: "read",
        },
        {
          who: "anyone",
          can: "write",
        },
      ],
      reply: {
        $actions: [
          {
            who: "recipient",
            of: "post",
            can: "write",
          },
          {
            who: "author",
            of: "post",
            can: "write",
          },
        ],
      },
    },
    image: {
      $actions: [
        {
          who: "anyone",
          can: "read",
        },
        {
          who: "anyone",
          can: "write",
        },
      ],
      caption: {
        $actions: [
          {
            who: "anyone",
            can: "read",
          },
          {
            who: "author",
            of: "image",
            can: "write",
          },
        ],
      },
      reply: {
        $actions: [
          {
            who: "author",
            of: "image",
            can: "read",
          },
          {
            who: "recipient",
            of: "image",
            can: "write",
          },
        ],
      },
    },
  },
};

let protocolDefinition = {
  protocol: PROTOCOL_URI,
  published: true,
  types: {
    profile: {
      schema: PROFILE_SCHEMA,
      dataFormats: ["application/json"],
    },
    privateSpace: {
      schema: PRIVATE_SPACE_SCHEMA,
      dataFormats: ["application/json"],
    },
    publicSpace: {
      schema: PUBLIC_SPACE_SCHEMA,
      dataFormats: ["application/json"],
    },
    sharedSpace: {
      schema: SHARED_SPACE_SCHEMA,
      dataFormats: ["application/json"],
    },
    did: {
      schema: DID_SCHEMA,
      dataFormats: ["application/json"],
    },
    notification: {
      schema: NOTIFICATION_SCHEMA,
      dataFormats: ["application/json"],
    },
  },
  structure: {
    profile: {
      $actions: [
        { who: "anyone", can: "write" },
        { who: "author", of: "profile", can: "read" },
      ],
    },
    publicSpace: {
      $actions: [
        {
          who: "anyone",
          can: "read",
        },
        {
          who: "anyone",
          can: "write",
        },
      ],
    },
    notification: {
      $actions: [
        {
          who: "recipient",
          of: "notification",
          can: "read",
        },
        {
          who: "anyone",
          can: "write",
        },
      ],
    },
    privateSpace: {
      $actions: [
        {
          who: "author",
          of: "privateSpace",
          can: "read",
        },
        {
          who: "author",
          of: "privateSpace",
          can: "write",
        },
      ],
    },
    sharedSpace: {
      $actions: [
        {
          who: "recipient",
          of: "sharedSpace",
          can: "read",
        },
        {
          who: "anyone",
          can: "write",
        },
      ],
    },
    did: {
      $actions: [
        {
          who: "anyone",
          can: "read",
        },
        {
          who: "anyone",
          can: "write",
        },
      ],
    },
  },
};

export const useStore = create((set) => ({
  web5: null,
  myDid: null,
  spaces: null,
  mySpaces: null,
  profile: "",
  notifications: [],
  publicRecord: [],
}));

// create DID, Connect to web5
export const initWeb5 = async () => {
  console.log("Initializing web 5");
  const { Web5 } = await import("@web5/api/browser");
  const { web5, did } = await Web5.connect({ sync: "1s" });

  // setting the web5 and did state
  useStore.setState({ web5: web5 });
  useStore.setState({ myDid: did });

  console.log("Web5 initialized, and DID created/connected");
  console.log("Web5: ", web5, "DID: ", did);

  if (web5 && did) {
    // configure protocol
    const response = await configureProtocol(web5, did);
    return response;
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
      if (remoteProtocolStatus.code === 202) {
        console.log("protocol installed remotely");
        return {
          success: true,
          data: "DID, Profile and Protocol has been successfully created and connected to Web5",
        };
      }
    } else {
      console.log("Protocol already installed");
      return {
        success: true,
        data: "Protocol, DID, already exist",
      };
    }
  } catch (error) {
    console.error(error, "error");
  }
}

// querying local protocol
async function queryProtocol(web5) {
  console.log("Querying protocol");
  const protocol = await web5.dwn.protocols.query({
    message: {
      filter: {
        protocol: PROTOCOL_URI,
      },
    },
  });
  console.log(protocol, "the protocol");
  return protocol;
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

// write did to redis
export const writeDidsToDb = async () => {
  const myDid = useStore.getState().myDid;
  let lastSixDid = myDid.split("did:ion:")[1].substring(0, 6);

  const did = {};
  did[`${lastSixDid}`] = myDid;

  const response = await axios({
    method: "post",
    url: "/api",
    data: did,
  });

  console.log("Response data:", response);
};

// create profile
export const createProfile = async (fullName) => {
  console.log("creating profile.....");
  try {
    // destructuring the data
    const myDid = useStore.getState().myDid;
    const web5 = useStore.getState().web5;

    // get current date and time
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();

    // construct user profile
    const userProfile = {
      fullName,
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

    // return the response
    return {
      success: true,
      data: "User profile has been successfully written to DWN",
    };
  } catch (error) {
    console.error("Error writing secret message to DWN", error);
    // return the response
    return {
      success: false,
      data: "Please try again!, couldnt write to DWN",
    };
  }
};

// fetch profile
export const readProfile = async () => {
  console.log("Fetching profile...");
  try {
    const web5 = useStore.getState().web5;
    const myDid = useStore.getState().myDid;

    // querying the profile record
    const response = await web5.dwn.records.query({
      from: myDid,
      message: {
        filter: {
          schema: PROFILE_SCHEMA,
        },
      },
    });

    // checking if quering records was successfull
    if (response.status.code === 200) {
      const profileRecord = await Promise.all(
        response.records.map(async (record) => {
          const data = await record.data.json();
          return data;
        })
      );

      // setting the state of the profile
      useStore.setState({ profile: profileRecord[0] });

      // return profile record
      return {
        success: true,
      };
    }
  } catch (error) {
    console.error("Error in fetchSentMessages:", error);

    // return error
    return {
      success: false,
      data: "ooppss something went wrong, please try again",
    };
  }
};

export const readLocalUserProfile = () => {
  const profile = localStorage.getItem("profile");
  console.log(profile, "hello profile");

  if (profile) {
    useStore.setState({ profile: profile });
    return {
      success: true,
    };
  }
};

// create space
export const createSpace = async (data) => {
  try {
    const web5 = useStore.getState().web5;
    const myDid = useStore.getState().myDid;
    const fullName = useStore.getState().profile;

    let base64Image;

    // checking if the user selects an image
    if (data.spaceImage.length !== 0) {
      // getting the binary image file
      const binaryImage = await data.spaceImage.arrayBuffer();
      base64Image = btoa(
        new Uint8Array(binaryImage).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );

      data["spaceImage"] = base64Image;
    }

    // get current date and time
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();

    // construct user profile
    const spaceData = {
      ...data,
      spaceAuthor: fullName,
      spaceAuthorProfile: fullName.trim()[0],
      spaceAuthorDid: myDid,
      spaceFiles: [],
      spaceSubscribers: 0,
      timestampWritten: `${currentDate} ${currentTime}`,
    };

    // check the type of space the user wants to create
    if (data.spacePrivacy === "private") {
      console.log("creating public space....", spaceData);
      const response = await handleCreatePrivateSpace(web5, myDid, spaceData);
      if (response.success) {
        console.log("writing the did to redis....");
        writeDidsToDb();
      }
      return response;
    } else {
      console.log("creating public space....", spaceData);
      const response = await handleCreatePublicSpace(web5, myDid, spaceData);
      if (response.success) {
        console.log("writing the did to redis....");
        writeDidsToDb();
      }
      return response;
    }
  } catch (error) {
    console.error("ERROR: ", error);
  }
};

// read spaces created by the user
export const getUserSpace = async () => {
  console.log("Getting the user spaces");
  try {
    const web5 = useStore.getState().web5;
    const myDid = useStore.getState().myDid;

    // await both async functions concurrently
    const [privateSpace, publicSpace, sharedSpace] = await Promise.all([
      handleReadPrivateSpace(web5, myDid),
      handleReadUserPublicSpace(web5, myDid),
      handleReadUserSharedSpace(web5, myDid),
    ]);

    // Concatenate the spaces after both promises have resolved successfully
    const mySpaces = privateSpace.concat(publicSpace, sharedSpace);

    console.log(sharedSpace, "whatt i got");
    // set the state
    useStore.setState({ mySpaces });

    // return statement
    return {
      success: true,
      message: "Spaces has been successfully read",
    };
    // console.log("my spaces", mySpaces);
  } catch (error) {
    console.error("Something went wrong", error);
    return {
      success: false,
      msg: "Something went  wrong",
    };
  }
};

// create private space
async function handleCreatePrivateSpace(web5, myDid, spaceData) {
  try {
    const { record, status } = await web5.dwn.records.create({
      data: spaceData,
      message: {
        protocol: PROTOCOL_URI,
        protocolPath: "privateSpace",
        schema: PRIVATE_SPACE_SCHEMA,
        dataFormat: "application/json",
      },
    });

    if (status.code === 202) {
      console.log(record, "successfully sent space to local DWN");
      const { status: remoteDwnStatus } = await record.send(myDid);

      if (remoteDwnStatus.code === 202) {
        console.log(record, "successfully sent space to remote DWN");
        return {
          success: true,
          msg: "space created successfully",
        };
      }
    }
  } catch (error) {
    console.error(error, "error message");
    return {
      success: false,
      msg: "Something went wrong",
    };
  }
}

// read private space
async function handleReadPrivateSpace(web5, myDid) {
  try {
    // getting the space records
    const { records } = await web5.dwn.records.query({
      from: myDid,
      message: {
        filter: {
          schema: PRIVATE_SPACE_SCHEMA,
        },
      },
    });

    // declare my private space
    let privateSpaceRecords = [];

    await Promise.all(
      records.map(async (record) => {
        const data = await record.data.json();

        console.log(data, "the data");
        const privateSpaceData = { ...data, id: record.id };
        privateSpaceRecords.push(privateSpaceData);
      })
    );

    // console.log(publicSpaceRecords, "the result");
    return privateSpaceRecords;

    // mapping through the mixed records
    // let spaceRecords = records.map(async (record) => {
    //   let { record: space } = await web5.dwn.records.read({
    //     message: {
    //       filter: {
    //         recordId: record.id,
    //       },
    //     },
    //   });

    //   // querying the record data in json
    //   const spaces = await space.data.json();

    //   // if spaces, add to the array
    //   if (spaces) {
    //     myPrivateSpace.push(spaces);
    //   }
    // });

    // Wait for all promises to resolve
    // Promise.all(spaceRecords)
    //   .then(() => {
    //     // All asynchronous operations completed
    //     console.log("All spaces fetched:", myPrivateSpace);
    //     return myPrivateSpace;
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching spaces:", error);
    //   });
  } catch (error) {
    console.error("Something went wrong", error);
    return {
      success: false,
      message: "Something went  wrong",
    };
  }
}

// create public space
async function handleCreatePublicSpace(web5, myDid, spaceData) {
  // TODO: whenever creating a public space, writi the did to redis
  const { record, status } = await web5.dwn.records.create({
    data: spaceData,
    message: {
      schema: PUBLIC_SPACE_SCHEMA,
      dataFormat: "application/json",
      published: true,
    },
  });

  if (status.code === 202) {
    console.log(record, "successfully sent public space to local DWN");
    const { status: remoteDwnStatus } = await record.send(myDid);

    if (remoteDwnStatus.code === 202) {
      console.log(record, "successfully sent public space to remote DWN");
      return {
        success: true,
        msg: "space created successfully",
      };
    }
  }
}

// reading the public space of the main user
async function handleReadUserPublicSpace(web5, myDid) {
  console.log("reading the public space");
  const { records } = await web5.dwn.records.query({
    from: myDid,
    message: {
      filter: {
        schema: PUBLIC_SPACE_SCHEMA,
        dataFormat: "application/json",
      },
    },
  });
  console.log(records, "records");

  let publicSpaceRecords = [];

  // Read the record
  try {
    await Promise.all(
      records.map(async (record) => {
        const data = await record.data.json();

        console.log(data, "the data");
        const publicSpaceData = { ...data, id: record.id };
        publicSpaceRecords.push(publicSpaceData);
      })
    );

    // console.log(publicSpaceRecords, "the result");
    return publicSpaceRecords;
  } catch (error) {
    console.log(error, "error");
  }
}

// reading the shared space of the main user
async function handleReadUserSharedSpace(web5, myDid) {
  console.log("reading the shared space");
  const { records } = await web5.dwn.records.query({
    from: myDid,
    message: {
      filter: {
        schema: SHARED_SPACE_SCHEMA,
        dataFormat: "application/json",
      },
    },
  });
  console.log(records, "records");

  let sharedSpaceRecords = [];

  // Read the record
  try {
    await Promise.all(
      records.map(async (record) => {
        const data = await record.data.json();
        console.log(data, "id");

        // let { record: spaceRecord } = await web5.dwn.records.read({
        //   message: {
        //     filter: {
        //       recordId:
        //         "bafyreig3lq6lp366kfe2qawu7ozrfmjk2r673bujumnxllijlzqptocslu ",
        //     },
        //   },
        // });

        // const text = await spaceRecord;

        // console.log(await text, "the data");
        const publicSpaceData = { ...data, id: record.id };
        sharedSpaceRecords.push(publicSpaceData);
      })
    );

    // console.log(sharedSpaceRecords, "the result");
    return sharedSpaceRecords;
  } catch (error) {
    console.log(error, "error");
  }
}

// read all the public spaces created by all the users
export const readExplorePublicSpace = async () => {
  const web5 = useStore.getState().web5;

  const response = await axios({
    method: "get",
    url: "/api",
  });

  const { data, status } = response.data;

  let publicSpaceRecord = [];

  if (status === 1) {
    const userDids = Object.values(data);
    handleQueryUserRecord(web5, userDids)
      .then((response) => {
        console.log("Response:", response.data);
        useStore.setState({ spaces: response.data });
        // handleReadUserRecord(web5, response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    // const main = userDids.map(async (userDid) => {
    //   let { records } = await web5.dwn.records.query({
    //     from: userDid,
    //     message: {
    //       filter: {
    //         schema: PUBLIC_SPACE_SCHEMA,
    //         dataFormat: "application/json",
    //       },
    //     },
    //   });

    //   console.log(await records);
    //   const rec = records.map(async (record) => {
    //     // const data = await record.data.json();
    //     const data = await record.id;
    //     console.log(data);
    //     // bafyreifxdra4c24iylgwd6eswtkk6i37jl4trfpvospdl2gc4yveajugja;
    //     //

    //     let { record: rc } = await web5.dwn.records.read({
    //       from: userDid,
    //       message: {
    //         filter: {
    //           recordId: data,
    //         },
    //       },
    //     });

    //     // assuming the record has a text payload
    //     const text = await rc?.data?.json();
    //     return text;
    //   });

    //   const newrec = await Promise.all(rec);

    //   if (newrec) {
    //     console.log("am done");
    //   }
    //   console.log(rec, "the rec");
    //   console.log(newrec, "the new rec");
    // });

    // const theMain = await Promise.all(main);
    // console.log(theMain, "the main");

    // console.log(publicSpaceRecord, "the record");
    return {
      success: true,
      message: {
        data: publicSpaceRecord,
        text: "public space has been successfully read",
      },
    };
  }

  useStore.setState({ spaces: [] });
  return [];
};

async function handleQueryUserRecord(web5, userDids) {
  try {
    const n = [];
    const record = await Promise.all(
      userDids.map(async (userDid) => {
        const { records } = await web5.dwn.records.query({
          from: userDid,
          message: {
            filter: {
              schema: PUBLIC_SPACE_SCHEMA,
              dataFormat: "application/json",
            },
          },
        });

        const recPromises = records.map(async (record) => {
          // const data = await record.data.json();
          const data = await record.id;

          let { record: rc } = await web5.dwn.records.read({
            from: userDid,
            message: {
              filter: {
                recordId: data,
              },
            },
          });

          // assuming the record has a text payload
          const text = await rc?.data?.json();
          const id = { id: data };
          console.log(text, "this is the text");
          n.push({ ...id, ...text });
          // return text;
        });
        await Promise.all(recPromises);
        // return records;
      })
    );

    // Process the records or perform any other logic here
    console.log("Records successfully retrieved:", record);

    // Return a success response
    return { success: true, data: n, message: "Query successfully executed" };
  } catch (error) {
    // Handle errors
    console.error("Error handling query:", error);
    return { success: false, message: "Error handling query" };
  }
}

// function to request access to spaces
export const subscribeToSpace = async (
  authorDid,
  spaceId,
  spaceName,
  notificationType
) => {
  try {
    const web5 = useStore.getState().web5;
    const subscriberDid = useStore.getState().myDid;
    const senderName = useStore.getState().profile;

    const data = {
      message: `${senderName} is requesting access to ${spaceName} space`,
      senderName,
      spaceName,
      authorDid,
      subscriberDid,
      spaceId,
      notificationType,
    };
    console.log(data, "the data");

    const { record } = await web5.dwn.records.create({
      data: data,
      store: false, //remove this line if you want to keep a copy of the record in the sender's DWN
      message: {
        protocol: PROTOCOL_URI,
        protocolPath: "notification",
        schema: NOTIFICATION_SCHEMA,
        recipient: authorDid,
      },
    });

    //send record to recipient's DWN
    const { status } = await record.send(authorDid);
    console.log(status, "this is the status");
  } catch (error) {
    console.error(error, "this is the error");
  }
};

// read the notification for subscription
export const readNotification = async () => {
  try {
    console.log("getting notification");
    const web5 = useStore.getState().web5;
    const myDid = useStore.getState().myDid;

    const { records } = await web5.dwn.records.query({
      from: myDid,
      message: {
        filter: {
          schema: NOTIFICATION_SCHEMA,
          dataFormat: "application/json",
        },
      },
    });

    if (records.length > 0) {
      const notifications = await Promise.all(
        records.map(async (record) => {
          const data = await record.data.json();
          return {
            ...data,
            recordId: record.id,
          };
        })
      );
      console.log(notifications, "the notification");
      useStore.setState({ notifications });
      return notifications;
    } else {
      console.log("There are no records: ");
      return [];
    }
  } catch (error) {
    console.error("Error fetching sent messages: ", error);
  }
};

// respond to the user request
export const grantSpaceRequest = async (notification, respondType) => {
  const web5 = useStore.getState().web5;
  const myDid = useStore.getState().myDid;
  const senderName = useStore.getState().profile;

  const data = {
    message: `Your request to access ${notification.spaceName} was ${respondType}`,
    authorDid: notification.authorDid,
    senderName,
    subscriberDid: notification.subscriberDid,
    spaceId: notification.spaceId,
    notificationType: "response",
  };
  console.log(data, "the data");
  console.log(notification, "the notification");

  if (respondType === "accepted") {
    // Reads the indicated record from the user's DWNs
    let { record } = await web5.dwn.records.read({
      message: {
        filter: {
          recordId: notification.spaceId,
        },
      },
    });

    const spaceRecord = await record.data.json();

    const newRecord = { ...spaceRecord };

    newRecord["spacePrivacy"] = "shared";
    newRecord["spaceImage"] = "https://developer.tbd.website/img/tbd-logo.svg";

    if (spaceRecord) {
      console.log("Writing to shared space", spaceRecord);

      // write to a shared space
      const { record: sharedSpaceRecord } = await web5.dwn.records.create({
        data: newRecord,
        store: false, //remove this line if you want to keep a copy of the record in the sender's DWN
        message: {
          protocol: PROTOCOL_URI,
          protocolPath: "sharedSpace",
          schema: SHARED_SPACE_SCHEMA,
          recipient: notification.subscriberDid,
        },
      });

      //send space record to recipient's DWN
      const { status } = await sharedSpaceRecord.send(
        notification.subscriberDid
      );

      console.log(status, "the status for shared");
      if (status.code === 202) {
        // delete the notification request record
        const deleteNotification = await deleteRecord(
          web5,
          myDid,
          notification.recordId
        );

        // send a success notification
        console.log(deleteNotification, "the notification has been deleted");
      }
    }
    console.log(spaceRecord, "this is the record");
  } else {
    // delete the notification record
    // send a new denied notification
  }
};

async function giveSpaceAccess(spaceId) {}

async function sendSpaceRequestNotification(web5, data, notification) {
  const { record } = await web5.dwn.records.create({
    data: data,
    store: false, //remove this line if you want to keep a copy of the record in the sender's DWN
    message: {
      protocol: PROTOCOL_URI,
      protocolPath: "notification",
      schema: NOTIFICATION_SCHEMA,
      recipient: notification.subscriberDid,
    },
  });

  //send record to recipient's DWN
  const { status } = await record.send(notification.subscriberDid);
  if (status.code === 202) {
  }
  console.log(status, "this is the status");
}

async function deleteRecord(web5, did, recordId) {
  const response = await web5.dwn.records.delete({
    from: did,
    message: {
      recordId: recordId,
    },
  });

  return response;
}

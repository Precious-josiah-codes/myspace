import { kv } from "@vercel/kv";
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

let DID_SCHEMA =
  process.env.NEXT_PUBLIC_MYAPP_ENV === "dev"
    ? "https://myspace.app/did"
    : "https://prod/myspace.app/did";

// protocol definition

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
    did: {
      schema: DID_SCHEMA,
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
  spaces: [
    {
      id: "1",
      spaceName: "Dreamy Music Space",
      spaceAuthor: "David",
      spaceAuthorProfile: "D",
      spaceDescription: "A space for music enthusiasts",
      spacePrivacy: "public",
      spaceMonetization: "yes",
      spacePrice: "$150",
      spaceTags: "music, instruments, melody",
      spaceImage:
        "https://images.pexels.com/photos/33597/guitar-classical-guitar-acoustic-guitar-electric-guitar.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      spaceFiles: [
        {
          id: 1,
          fileThumbNail:
            "https://images.pexels.com/photos/9517380/pexels-photo-9517380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          fileType: "video",
          fileName: "Lovely day music video",
        },
        {
          id: 2,
          fileThumbNail:
            "https://images.pexels.com/photos/6532373/pexels-photo-6532373.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          fileType: "video",
          fileName: "Champion",
        },
        {
          id: 3,
          fileThumbNail:
            "https://images.pexels.com/photos/934067/pexels-photo-934067.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          fileType: "document",
          fileName: "Music Proposal",
        },
        {
          id: 4,
          fileThumbNail:
            "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          fileType: "audio",
          fileName: "Relaxing Music",
        },
        {
          id: 5,
          fileThumbNail:
            "https://images.pexels.com/photos/1267350/pexels-photo-1267350.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          fileType: "image",
          fileName: "Let's Party",
        },
        {
          id: 6,
          fileThumbNail:
            "https://images.pexels.com/photos/5935232/pexels-photo-5935232.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          fileType: "video",
          fileName: "Cityscape Timelapse",
        },
      ],
      spaceSubscribers: 15,
    },
    {
      id: "2",
      spaceName: "Gaming Universe",
      spaceAuthor: "Gina",
      spaceAuthorProfile: "G",
      spaceDescription: "Discuss and share your gaming experiences",
      spacePrivacy: "public",
      spaceMonetization: "no",
      spacePrice: null,
      spaceTags: "gaming, video games, esports",
      spaceImage:
        "https://images.pexels.com/photos/275033/pexels-photo-275033.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      spaceFiles: [
        {
          id: 1,
          fileThumbNail:
            "https://images.pexels.com/photos/260024/pexels-photo-260024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          fileType: "video",
          fileName: "Win in 3 moves",
        },
        {
          id: 2,
          fileThumbNail:
            "https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          fileType: "video",
          fileName: "Super Mario",
        },

        {
          id: 2,
          fileThumbNail:
            "https://images.pexels.com/photos/1174746/pexels-photo-1174746.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          fileType: "document",
          fileName: "Football Cheat Sheet",
        },
        {
          id: 3,
          fileThumbNail:
            "https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          fileType: "video",
          fileName: "Super Mario",
        },
      ],
      spaceSubscribers: 12,
    },
    {
      id: "3",
      spaceName: "Tech Talk Forum",
      spaceAuthor: "Tom",
      spaceAuthorProfile: "T",
      spaceDescription: "Explore the latest in technology",
      spacePrivacy: "private",
      spaceMonetization: "no",
      spacePrice: null,
      spaceTags: "technology, gadgets, innovation",
      spaceImage:
        "https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      spaceFiles: [
        {
          id: 1,
          fileThumbNail:
            "https://images.pexels.com/photos/6953827/pexels-photo-6953827.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          fileType: "video",
          fileName: "Talk with Alma CEO",
        },
        {
          id: 2,
          fileThumbNail:
            "https://images.pexels.com/photos/8349343/pexels-photo-8349343.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          fileType: "image",
          fileName: "Short Interview with me",
        },
      ],
      spaceSubscribers: 0,
    },
    {
      id: "4",
      spaceName: "Healthy Living Hub",
      spaceAuthor: "Hannah",
      spaceAuthorProfile: "H",
      spaceDescription: "Share tips for a healthy lifestyle",
      spacePrivacy: "public",
      spaceMonetization: "yes",
      spacePrice: "$100",
      spaceTags: "health, wellness, fitness",
      spaceImage:
        "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      spaceFiles: [],
      spaceSubscribers: 8,
    },
    {
      id: "5",
      spaceName: "Travel Diaries",
      spaceAuthor: "Tyler",
      spaceAuthorProfile: "T",
      spaceDescription: "Explore the world through travel stories",
      spacePrivacy: "private",
      spaceMonetization: "no",
      spacePrice: null,
      spaceTags: "travel, adventure, exploration",
      spaceImage:
        "https://images.pexels.com/photos/287240/pexels-photo-287240.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      spaceFiles: [],
      spaceSubscribers: 0,
    },
    {
      id: "6",
      spaceName: "Cooking Corner",
      spaceAuthor: "Catherine",
      spaceAuthorProfile: "C",
      spaceDescription: "Share and discover delicious recipes",
      spacePrivacy: "public",
      spaceMonetization: "yes",
      spacePrice: "$180",
      spaceTags: "cooking, recipes, food",
      spaceImage:
        "https://images.pexels.com/photos/691114/pexels-photo-691114.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      spaceFiles: [
        {
          id: 1,
          fileThumbNail:
            "https://images.pexels.com/photos/2890387/pexels-photo-2890387.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          fileType: "video",
          fileName: "Cook with me",
        },
        {
          id: 2,
          fileThumbNail:
            "https://images.pexels.com/photos/691114/pexels-photo-691114.jpeg?auto=compress&cs=tinysrgb&w=600",
          fileType: "document",
          fileName: "My Secret CookBook",
        },
      ],
      spaceSubscribers: 18,
    },
    {
      id: "7",
      spaceName: "Fitness Fanatics",
      spaceAuthor: "Frank",
      spaceAuthorProfile: "F",
      spaceDescription: "Connect with fellow fitness enthusiasts",
      spacePrivacy: "public",
      spaceMonetization: "no",
      spacePrice: null,
      spaceTags: "fitness, workout, exercise",
      spaceImage: "https://images.pexels.com/photos/28080/pexels-photo.jpg",
      spaceFiles: [],
      spaceSubscribers: 25,
    },
    {
      id: "8",
      spaceName: "Artistic Expression",
      spaceAuthor: "Alice",
      spaceAuthorProfile: "A",
      spaceDescription: "Celebrate creativity in all forms",
      spacePrivacy: "private",
      spaceMonetization: "no",
      spacePrice: null,
      spaceTags: "art, creativity, design",
      spaceImage:
        "https://images.pexels.com/photos/6941452/pexels-photo-6941452.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      spaceFiles: [
        {
          id: 1,
          fileThumbNail:
            "https://images.pexels.com/photos/102127/pexels-photo-102127.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          fileType: "video",
          fileName: "My first art",
        },
        {
          id: 2,
          fileThumbNail:
            "https://images.pexels.com/photos/19200200/pexels-photo-19200200/free-photo-of-abstract-photo-of-a-melt-red-paint.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          fileType: "video",
          fileName: "Digital Painting",
        },
      ],
      spaceSubscribers: 0,
    },
    {
      id: "9",
      spaceName: "Photography Passion",
      spaceAuthor: "Peter",
      spaceAuthorProfile: "P",
      spaceDescription: "Showcase and discuss photography",
      spacePrivacy: "public",
      spaceMonetization: "yes",
      spacePrice: "$250",
      spaceTags: "photography, camera, photos",
      spaceImage:
        "https://images.pexels.com/photos/2179205/pexels-photo-2179205.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      spaceFiles: [],
      spaceSubscribers: 14,
    },
    {
      id: "10",
      spaceName: "Science Explorers",
      spaceAuthor: "Samantha",
      spaceAuthorProfile: "S",
      spaceDescription: "Dive into the wonders of science",
      spacePrivacy: "private",
      spaceMonetization: "no",
      spacePrice: null,
      spaceTags: "science, discovery, knowledge",
      spaceImage:
        "https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      spaceFiles: [],
      spaceSubscribers: 0,
    },
  ],
  mySpaces: [
    {
      id: "1",
      spaceName: "Tech Talks",
      spaceAuthor: "Lily",
      spaceAuthorProfile: "L",
      spaceDescription: "Discuss the latest in technology with Lily",
      spacePrivacy: "private",
      spaceMonetization: "no",
      spacePrice: null,
      spaceTags: "technology, gadgets, innovation",
      spaceImage:
        "https://images.pexels.com/photos/1181268/pexels-photo-1181268.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      spaceFiles: [
        {
          id: 1,
          fileThumbNail:
            "https://images.pexels.com/photos/6953827/pexels-photo-6953827.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          fileType: "video",
          fileName: "Talk with Alma CEO",
        },
        {
          id: 2,
          fileThumbNail:
            "https://images.pexels.com/photos/8349343/pexels-photo-8349343.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          fileType: "image",
          fileName: "Short Interview with me",
        },
        {
          id: 3,
          fileThumbNail:
            "https://images.pexels.com/photos/6954162/pexels-photo-6954162.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          fileType: "audio",
          fileName: "Catch me on air",
        },
      ],
      spaceSubscribers: 18,
    },
    {
      id: "2",
      spaceName: "Lily's Travel Adventures",
      spaceAuthor: "Lily",
      spaceAuthorProfile: "L",
      spaceDescription: "Share and explore exciting travel stories",
      spacePrivacy: "public",
      spaceMonetization: "no",
      spacePrice: null,
      spaceTags: "travel, adventure, exploration",
      spaceImage:
        "https://images.pexels.com/photos/12660667/pexels-photo-12660667.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      spaceFiles: [
        {
          id: 1,
          fileThumbNail:
            "https://images.pexels.com/photos/844167/pexels-photo-844167.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          fileType: "video",
          fileName: "Road trip to Australia",
        },
        {
          id: 2,
          fileThumbNail:
            "https://images.pexels.com/photos/6141092/pexels-photo-6141092.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          fileType: "image",
          fileName: "Photos with the boys #Australia",
        },
      ],
      spaceSubscribers: 20,
    },
    {
      id: "3",
      spaceName: "Lily's Creative Corner",
      spaceAuthor: "Lily",
      spaceAuthorProfile: "L",
      spaceDescription: "Express your creativity in Lily's artistic space",
      spacePrivacy: "public",
      spaceMonetization: "yes",
      spacePrice: "$150",
      spaceTags: "art, design, creativity",
      spaceImage:
        "https://images.pexels.com/photos/256514/pexels-photo-256514.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      spaceFiles: [],
      spaceSubscribers: 15,
    },
    {
      id: "4",
      spaceName: "Lily's Fitness Zone",
      spaceAuthor: "Lily",
      spaceAuthorProfile: "L",
      spaceDescription: "Join Lily in staying fit and healthy",
      spacePrivacy: "private",
      spaceMonetization: "no",
      spacePrice: null,
      spaceTags: "fitness, workout, exercise",
      spaceImage:
        "https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      spaceFiles: [],
      spaceSubscribers: 25,
    },
    {
      id: "5",
      spaceName: "Lily's Culinary Delights",
      spaceAuthor: "Lily",
      spaceAuthorProfile: "L",
      spaceDescription: "Explore the world of delicious recipes with Lily",
      spacePrivacy: "public",
      spaceMonetization: "yes",
      spacePrice: "$220",
      spaceTags: "cooking, recipes, food",
      spaceImage:
        "https://images.pexels.com/photos/248444/pexels-photo-248444.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      spaceFiles: [],
      spaceSubscribers: 22,
    },
    {
      id: "6",
      spaceName: "Photography Passion",
      spaceAuthor: "Lily",
      spaceAuthorProfile: "L",
      spaceDescription: "Capture beautiful moments in Lily's photography space",
      spacePrivacy: "public",
      spaceMonetization: "no",
      spacePrice: null,
      spaceTags: "photography, camera, photos",
      spaceImage:
        "https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      spaceFiles: [],
      spaceSubscribers: 14,
    },
    {
      id: "7",
      spaceName: "Science Hub",
      spaceAuthor: "Lily",
      spaceAuthorProfile: "L",
      spaceDescription: "Explore the wonders of science with Lily",
      spacePrivacy: "public",
      spaceMonetization: "yes",
      spacePrice: "$180",
      spaceTags: "science, discovery, knowledge",
      spaceImage:
        "https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      spaceFiles: [],
      spaceSubscribers: 20,
    },
    {
      id: "8",
      spaceName: "Nasa Space Camp",
      spaceAuthor: "Nasa",
      spaceAuthorProfile: "N",
      spaceDescription: "Discussing space invations",
      spacePrivacy: "shared",
      spaceMonetization: "no",
      spacePrice: null,
      spaceTags: "space, planet, space tech",
      spaceImage:
        "https://images.pexels.com/photos/8474959/pexels-photo-8474959.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      spaceFiles: [],
      spaceSubscribers: 40,
    },
  ],
  profile: {},
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
    const result = await configureProtocol(web5, did);
    return result;
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
        profileRecord
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

// TODO: ADD THE SPACE RECORD ID TO THE SPACE DATA AS KEY id, WHEN READING THE DATA

// create space
export const createSpace = async (data) => {
  try {
    const web5 = useStore.getState().web5;
    const myDid = useStore.getState().myDid;
    const { fullName, profileId } = useStore.getState().profile;
    console.log(fullName, "the fullname");
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
      spaceAuthorDid: profileId,
      spaceFiles: [],
      spaceSubscribers: 0,
      timestampWritten: `${currentDate} ${currentTime}`,
    };

    // check the type of space the user wants to create
    if (data.spacePrivacy === "private") {
      console.log("creating public space....", spaceData);
      handleCreatePrivateSpace(web5, myDid, spaceData);
    } else {
      console.log("creating public space....", spaceData);
      handleCreatePublicSpace(web5, myDid, spaceData);
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
    const [privateSpace, publicSpace] = await Promise.all([
      handleReadPrivateSpace(web5, myDid),
      handleReadUserPublicSpace(web5, myDid),
    ]);

    // Concatenate the spaces after both promises have resolved successfully
    const mySpaces = privateSpace.concat(publicSpace);

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

// read all the public spaces created by all the users
export const readUsersPublicSpace = async () => {};

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

  // Promise.all(
  //       blogpostrecords.map((element) => {
  //         console.log('this is the element', element);
  //         blogPostIds.push(element.id);

  //         return element.data.json();
  //       })
  //     )
}

export const createPublicRecord = async () => {
  const web5 = useStore.getState().web5;
  const myDid = useStore.getState().myDid;
  const { record } = await web5.dwn.records.create({
    data: { name: "am the one" },
    message: {
      // schema: "https://myspace.app/public_space",
      dataFormat: "application/json",
      published: true,
    },
  });

  console.log(record, record.id, "the record");
  const sendRecord = await record.send(myDid);
  console.log(sendRecord, "this is the record");
};

// bafyreihzy5mdumhv64gi6cdyo2iaymr634ktb6igxg24dcliplqh5u25dq;

// bafyreibytrjshzbroyvyuvtrlnrrichhw6a4l4gokydkuzwuloljmkiawu;
// bafyreic3qr6eumjrgsdqx7wnsci3v4upcgrbigi5dh2bokxrdmaljyvkam;
// bafyreicjqy77ary7r46jfyhq7py43pae5sjncltglag6y3i7yvhz64cvx4;
// bafyreidnq5a5xav5fhovhwu4o7xfhjdjnyxv7biuvhjuimkeoujvhvexfu;
// bafyreigudrsatlfxv4cllxcpeqq3pmk7ze7qevytt6krvhro7tlfjhwqqe;
// bafyreigjf3sfetqgxz4cns65auulmxw5bng7xogoxgnzlddlktslrsz3zu;
export const deleteRecord = async () => {
  const id = ["bafyreigiy3dpz56ab3atywln3sebm3ia24iogzsdjmshlmygcaffr3ji4y"];
  const web5 = useStore.getState().web5;

  id.forEach(async (i) => {
    const response = await web5.dwn.records.delete({
      // from: did,
      message: {
        recordId: i,
      },
    });

    console.log(response);
  });
};

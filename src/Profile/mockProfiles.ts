import { BigNumber, ethers } from "ethers";
import { MockAchievementFactory } from "../Achievements/mockAchievementFactory";
import { Profile } from "./profile";

export const mockProfiles: Profile[] = [
    {
        id: BigNumber.from(1),
        handle: "Anthalasath",
        socialMediaHandles: {
            discord: "Anthalasath#0531",
            twitter: "@Anthalasath",
            telegram: null
        },
        imageUri:
            "https://pbs.twimg.com/profile_images/1297158984730902528/5cGwqw-I_400x400.png",
        skills: [
            {
                name: "C#",
                achievements: [
                    MockAchievementFactory.createCoS("Developed the HotStories feature"),
                    //MockAchievementFactory.createCoS("Developed the Hyperlinks feature and API"),
                    //MockAchievementFactory.createCoS("Developed the support ticket feature and API"),
                    //MockAchievementFactory.createCoS("Optimized code across the Hyperlinks feature")
                ]
            },
            {
                name: "Javascript", achievements: [
                    //MockAchievementFactory.createAutomation(new Date(Date.parse("16 December 2021"))),
                    MockAchievementFactory.createAutomation(new Date(Date.parse("31 March 2021")))
                ]
            },
            {
                name: "Solidity", achievements: [
                    MockAchievementFactory.create({
                        skill: "Solidity",
                        description: "Creating a contract which allows the creation of new token types under it. There must be an ability to set a restricted total amount on these tokens.Additionally, there must be the ability to track each and every individual token and type so they can be used to offer redeemable rewards.",
                        dateOfDelivery: new Date(Date.parse("16 February 2021")),
                        title: "Creating ERC1155 Redeemable Tokens",
                        issuerProfileId: BigNumber.from(1),
                        workerProfileId: BigNumber.from(1),
                        imageUri: "https://api.uifaces.co/our-content/donated/IPh6PTBx.jpg"
                    })
                ]
            },
            { name: "Git", achievements: [] },
        ]
    },
    {
        id: BigNumber.from(2),
        handle: "Marcos",
        socialMediaHandles: null,
        imageUri:
            "https://api.uifaces.co/our-content/donated/rSuiu_Hr.jpg",
        skills: [
            {
                name: "Marketing",
                achievements: [
                    MockAchievementFactory.create({
                        skill: "Marketing",
                        title: "Discord Community Manager",
                        description: "We are looking for a community manager to help us grow our discord community AND create engagement, competitions, onboard new users and generally be an amazing advocate for Pyme and our community. Ideally an ongoing and long term role that can expand as we do :)",
                        imageUri: "https://api.uifaces.co/our-content/donated/rSuiu_Hr.jpg",
                        dateOfDelivery: new Date(Date.parse("31 February 2022")),
                        issuerProfileId: BigNumber.from(1),
                        workerProfileId: BigNumber.from(1),
                    })
                ]
            },
            {
                name: "Marketing",
                achievements: [
                    MockAchievementFactory.create({
                        skill: "Marketing",
                        title: "NFT Artist / Graphic Designer",
                        description: "Art we're looking at is Manga but we are open to other styles. Looking for someone with interests in food, tea, art, beauty and fashion to help us create out NFTea's (see what we did there?)",
                        imageUri: "https://randomuser.me/api/portraits/men/91.jpg",
                        dateOfDelivery: new Date(Date.parse("31 February 2022")),
                        issuerProfileId: BigNumber.from(1),
                        workerProfileId: BigNumber.from(1),
                    })
                ]
            },
        ]
    },
    {
        id: BigNumber.from(3),
        handle: "Naya",
        socialMediaHandles: null,
        imageUri:
            "https://images.pexels.com/photos/598745/pexels-photo-598745.jpeg?crop=faces&fit=crop&h=200&w=200&auto=compress&cs=tinysrgb",
        skills: [
            {
                name: "Marketing",
                achievements: [
                    MockAchievementFactory.create({
                        skill: "Marketing",
                        title: "Web3 Content Write",
                        description: "Baelo is looking for a Web3 Content Writer to join our early stage NFT project. We are a small team working remotely to build out our idea of a 3D NFT based on modern architecture. We’re looking for someone proficient in the fundamentals of Web3, Cryptocurrency, Smart Contracts and Wallets to write out FAQs for us.We’re looking for generic NFT landing page FAQs that can help out people that are new in this concept. Examples would be what is a wallet and how to get Metamask or what is an NFT. These need to be short and succinct.Looking for someone with great proficiency in English and ability to explain these concepts in the simplest ways possible.",
                        imageUri: "https://images.pexels.com/photos/598745/pexels-photo-598745.jpeg?crop=faces&fit=crop&h=200&w=200&auto=compress&cs=tinysrgb",
                        dateOfDelivery: new Date(Date.parse("17 February 2022")),
                        issuerProfileId: BigNumber.from(1),
                        workerProfileId: BigNumber.from(1),
                    })
                ]
            }
        ]
    },
    {
        id: BigNumber.from(4),
        handle: "Marcela",
        socialMediaHandles: null,
        imageUri:
            "https://randomuser.me/api/portraits/women/2.jpg",
        skills: [
            {
                name: "Marketing",
                achievements: [
                    MockAchievementFactory.create({
                        skill: "Marketing",
                        title: "Build a Dune Analytics dashboard ",
                        description: "Baelo is looking for a Web3 Content Writer to join our early stage NFT project. We are a small team working remotely to build out our idea of a 3D NFT based on modern architecture. We’re looking for someone proficient in the fundamentals of Web3, Cryptocurrency, Smart Contracts and Wallets to write out FAQs for us.We’re looking for generic NFT landing page FAQs that can help out people that are new in this concept. Examples would be what is a wallet and how to get Metamask or what is an NFT. These need to be short and succinct.Looking for someone with great proficiency in English and ability to explain these concepts in the simplest ways possible.",
                        imageUri: "https://randomuser.me/api/portraits/women/2.jpg",
                        dateOfDelivery: new Date(Date.parse("17 February 2022")),
                        issuerProfileId: BigNumber.from(1),
                        workerProfileId: BigNumber.from(1),
                    })
                ]
            }
        ]
    },
    {
        id: BigNumber.from(5),
        handle: "Lisa",
        socialMediaHandles: null,
        imageUri:
            "https://randomuser.me/api/portraits/women/9.jpg",
        skills: [
            {
                name: "Solidity",
                achievements: [
                    MockAchievementFactory.create({
                        skill: "Solidity",
                        title: "Build subgraph for your favorite yield aggregators",
                        description: "Baelo is looking for a Web3 Content Writer to join our early stage NFT project. We are a small team working remotely to build out our idea of a 3D NFT based on modern architecture. We’re looking for someone proficient in the fundamentals of Web3, Cryptocurrency, Smart Contracts and Wallets to write out FAQs for us.We’re looking for generic NFT landing page FAQs that can help out people that are new in this concept. Examples would be what is a wallet and how to get Metamask or what is an NFT. These need to be short and succinct.Looking for someone with great proficiency in English and ability to explain these concepts in the simplest ways possible.",
                        imageUri: "https://randomuser.me/api/portraits/women/9.jpg",
                        dateOfDelivery: new Date(Date.parse("17 February 2022")),
                        issuerProfileId: BigNumber.from(1),
                        workerProfileId: BigNumber.from(1),
                    })
                ]
            },            
        ]
    },
];

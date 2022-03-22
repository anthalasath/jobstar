import { ethers } from "ethers";
import { MockAchievementFactory } from "../Achievements/mockAchievementFactory";
import { Profile } from "./profile";

const dubiexIconUri = "https://scontent.fcrl1-1.fna.fbcdn.net/v/t1.6435-9/35646161_258309928247424_9059279955157843968_n.png?_nc_cat=102&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=vNDV-B1TKuAAX-BaGkt&_nc_ht=scontent.fcrl1-1.fna&oh=00_AT_P6SmRMtZJM3jqpSl7GrlyH0MYSk-i3srHYfruDohgzQ&oe=625C16E4";

export const mockProfiles: Profile[] = [
    {
        id: "1",
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
                    MockAchievementFactory.createCoS("Developed the Hyperlinks feature and API"),
                    MockAchievementFactory.createCoS("Developed the support ticket feature and API"),
                    MockAchievementFactory.createCoS("Developed the HotStories posts API"),
                    MockAchievementFactory.createCoS("Optimized code across the Hyperlinks feature")
                ]
            },
            {
                name: "Javascript", achievements: [
                    MockAchievementFactory.createAutomation(new Date(Date.parse("31 June 2018"))),
                    MockAchievementFactory.createAutomation(new Date(Date.parse("31 June 2018")))
                ]
            },
            {
                name: "Solidity", achievements: [
                    MockAchievementFactory.create({
                        skill: "Solidity",
                        description: "Audited smart contracts",
                        dateOfDelivery: new Date(Date.parse("31 May 2018")),
                        title: "Generalist Programmer",
                        issuerAddress: ethers.constants.AddressZero,
                        workerAddress: ethers.constants.AddressZero,
                        imageUri: null
                    })
                ]
            },
            { name: "Git", achievements: [] },
        ]
    },
    {
        id: "2",
        handle: "Doge the Doge",
        socialMediaHandles: null,
        imageUri:
            "https://avatarfiles.alphacoders.com/165/thumb-165625.jpg",
        skills: [
            {
                name: "wow",
                achievements: [
                    MockAchievementFactory.create({
                        skill: "wow",
                        title: "best title",
                        description: "being the best",
                        imageUri: "https://static.wikia.nocookie.net/d17a9654-4ee8-44cf-baf1-98d7eaa96ed8/scale-to-width/755",
                        dateOfDelivery: new Date(Date.parse("31 February 2022")),
                        issuerAddress: ethers.constants.AddressZero,
                        workerAddress: ethers.constants.AddressZero,
                    })
                ]
            },
            { name: "Marketing", achievements: [] },
        ]
    },
    {
        id: "3",
        handle: "John Smith",
        socialMediaHandles: null,
        imageUri:
            "https://images.pexels.com/photos/937481/pexels-photo-937481.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        skills: [
            {
                name: "Solidity",
                achievements: [
                    MockAchievementFactory.create({
                        skill: "Solidity",
                        title: "Solidity programmer",
                        description: "Writing smart contracts",
                        imageUri: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Ethereum_logo_translucent.svg/800px-Ethereum_logo_translucent.svg.png",
                        dateOfDelivery: new Date(Date.parse("17 February 2022")),
                        issuerAddress: ethers.constants.AddressZero,
                        workerAddress: ethers.constants.AddressZero,
                    })
                ]
            }
        ]
    },
];

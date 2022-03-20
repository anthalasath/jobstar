import { MockAchievementFactory } from "../Achievements/mockAchievementFactory";
import { Profile } from "./profile";

const dubiexIconUri = "https://scontent.fcrl1-1.fna.fbcdn.net/v/t1.6435-9/35646161_258309928247424_9059279955157843968_n.png?_nc_cat=102&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=vNDV-B1TKuAAX-BaGkt&_nc_ht=scontent.fcrl1-1.fna&oh=00_AT_P6SmRMtZJM3jqpSl7GrlyH0MYSk-i3srHYfruDohgzQ&oe=625C16E4";

export const mockProfiles: Profile[] = [
    {
        id: "1",
        handle: "Anthalasath",
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
                    MockAchievementFactory.createCoS("Optimized code across the HotStories feature"),
                    MockAchievementFactory.createCoS("Optimized code across the Hyperlinks feature")
                ]
            },
            {
                name: "NodeJS", achievements: [
                    MockAchievementFactory.createAutomation("Developed the DUBIex trading bot",
                        {
                            name: "DUBIex bot",
                            teamDisplayName: "The Singularity Group",
                            imageUri: dubiexIconUri
                        },
                        new Date(Date.parse("31 June 2018"))
                    ),
                    MockAchievementFactory.createAutomation("Developed a fraudulent transaction detection system",
                        {
                            name: "Gaming For Good",
                            teamDisplayName: "The Singularity Group",
                            imageUri: ""
                        },
                        new Date(Date.parse("31 June 2018"))
                    )
                ]
            },
            {
                name: "Solidity", achievements: [
                    MockAchievementFactory.create({
                        skill: "Solidity",
                        project: {
                            name: "DUBIex",
                            teamDisplayName: "The Singularity Group",
                            imageUri: dubiexIconUri
                        },
                        description: "Audited smart contracts",
                        dateOfDelivery: new Date(Date.parse("31 May 2018")),
                        job: {
                            title: "Generalist Programmer",
                            description: "Help out across a variety of projects and technologies"
                        }
                    })
                ]
            },
            { name: "Git", achievements: [] },
        ]
    },
];

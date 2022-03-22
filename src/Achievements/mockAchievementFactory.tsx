import { ethers } from "ethers";
import { Achievement, AchievementInput } from "./achievements";

export class MockAchievementFactory {
    static lastId = 0;

    static createCoS(description: string): Achievement {
        return this.create({
            title: "C# Developer",
            description,
            skill: "C#",
            dateOfDelivery: new Date(Date.parse("31 May 2022")),
            issuerProfileId: 0,
            workerProfileId: 0,
            imageUri: "https://play-lh.googleusercontent.com/7WBLXw6FGMFqwmCaqU1KXLDl73oFJ6iVlQ5Dl_Wq3Mlfv95eCDwdS7kdB-5TDUuojVo=s360"
        });
    }

    static createAutomation(dateOfDelivery: Date): Achievement {
        return this.create({
            skill: "Javascript",
            title: "Automation developer",
            description: "Develop automated internal tools",
            dateOfDelivery,
            issuerProfileId: 0,
            workerProfileId: 0,
            imageUri: null
        });
    }

    static create(input: AchievementInput): Achievement {
        const id = (++this.lastId).toString();
        return {
            id,
            title: input.title,
            skill: input.skill,
            description: input.description,
            dateOfDelivery: input.dateOfDelivery,
            issuerProfileId: input.issuerProfileId,
            workerProfileId: input.workerProfileId,
            imageUri: input.imageUri
        }
    }
}
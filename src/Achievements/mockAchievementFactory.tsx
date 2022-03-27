import { BigNumber, ethers } from "ethers";
import { Achievement, AchievementInput } from "./achievements";

export class MockAchievementFactory {
    static lastId = 0;

    static createCoS(description: string): Achievement {
        return this.create({
            title: "C# Developer",
            description,
            skill: "C#",
            dateOfDelivery: new Date(Date.parse("31 May 2020")),
            issuerProfileId: BigNumber.from(0),
            workerProfileId: BigNumber.from(0),
            imageUri: "https://randomuser.me/api/portraits/men/78.jpg"
        });
    }

    static createAutomation(dateOfDelivery: Date): Achievement {
        return this.create({
            skill: "Javascript",
            title: "Automation developer",
            description: "Develop automated internal tools",
            dateOfDelivery,
            issuerProfileId: BigNumber.from(0),
            workerProfileId: BigNumber.from(0),
            imageUri: "https://randomuser.me/api/portraits/women/9.jpg"
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
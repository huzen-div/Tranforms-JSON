import { User, HairSum } from '../model/root_model';

export function getAgeRange(departments: User[]) {
    let minAge = Infinity;
    let maxAge = -Infinity;
    for (let item of departments) {
        if (item.age < minAge)
            minAge = item.age;
        if (item.age > maxAge)
            maxAge = item.age;
    }
    let ageRange: String = `${minAge}-${maxAge}`;
    return ageRange;
}

export function getCountHair(departments: User[]) {
    let departmentsHairBlack = departments.filter(item => {
        return item.hair.color == "Black";
    })
    let departmentsHairBlond = departments.filter(item => {
        return item.hair.color == "Blond";
    })
    let departmentsHairChestnut = departments.filter(item => {
        return item.hair.color == "Chestnut";
    })
    let departmentsHairBrown = departments.filter(item => {
        return item.hair.color == "Brown";
    })
    let departmentsHairAuburn = departments.filter(item => {
        return item.hair.color == "Auburn";
    })
    let hair: HairSum = {
        Black: departmentsHairBlack.length,
        Blond: departmentsHairBlond.length,
        Chestnut: departmentsHairChestnut.length,
        Brown: departmentsHairBrown.length,
        Auburn: departmentsHairAuburn.length,
    };
    return hair;
}
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import axios from 'axios';

import { getAgeRange, getCountHair } from './service/main_service';
import { Root, DepartmentMap, HairSum, AddressUser, DetailDepartment } from './model/root_model';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3002;

app.get("/", async (req: Request, res: Response) => {
  let response: Root = <Root>{};
  try {
    const { data } = await axios.get("https://dummyjson.com/users");
    response = data;
  }
  catch (err) {
    console.log(err)
  }

  const users = response.users;

  let departments: String[] = [];
  for (let item of users) {
    departments.push(item.company.department);
  }


  let departmentsUnique: String[] = departments.filter((item, index) => departments.indexOf(item) === index);


  let departmentList: DepartmentMap[] = [];
  for (let department of departmentsUnique) {
    let departments = users.filter(item => {
      return department == item.company.department;
    })

    let ageRange: String = getAgeRange(departments);
    let hair: HairSum = getCountHair(departments);


    let departmentsMale = departments.filter(item => {
      return item.gender == "male";
    })
    let departmentsFemale = departments.filter(item => {
      return item.gender == "female";
    })


    let addressUser: AddressUser = {};
    for (let item of departments) {
      const fullName = `${item.firstName}${item.lastName}`
      const postalCode = item.address.postalCode
      addressUser[fullName] = postalCode
    }


    let detail: DetailDepartment = {
      male: departmentsMale.length,
      female: departmentsFemale.length,
      ageRange: ageRange,
      hair: hair,
      addressUser: addressUser,
    };



    let departmentStr = `${department}`;
    let departmentMap: DepartmentMap = {};
    departmentMap[departmentStr] = detail;


    departmentList.push(departmentMap);
  }

  res.json({ data: departmentList });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
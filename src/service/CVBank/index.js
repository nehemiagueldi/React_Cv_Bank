import axios from "axios";

export let getListCVPerson = async () => {
  try {
    let response = await axios.get("http://localhost:8080/api/cv-person");
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export let getCVPersonData = async (id) => {
  try {
    let response = await axios.get("http://localhost:8080/api/cv-person/" + id);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export let getCVSkillData = async () => {
  try {
    let response = await axios.get("http://localhost:8080/api/cv-skill");
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export let getCVToolData = async () => {
  try {
    let response = await axios.get("http://localhost:8080/api/cv-tool");
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export let getProjectData = async () => {
  try {
    let response = await axios.get("http://localhost:8080/api/project");
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export let getTrainingData = async () => {
  try {
    let response = await axios.get("http://localhost:8080/api/training");
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const getEducationDatas = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/education");
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const getWorkExpDatas = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/work-exp");
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export function createMarkup(data) {
  return { __html: data };
}

export function formatDate(cvdate) {
  let date = new Date(cvdate);
  let options = { month: "short", year: "numeric" };
  return date.toLocaleString("en-US", options);
}

export function formatDateEdu(eduDate) {
  let date = new Date(eduDate).getFullYear();
  return date;
}

export function calculateAge(birthDate) {
  let currentDate = new Date().getFullYear();
  let date = new Date(birthDate).getFullYear();
  let resultDate = currentDate - date;
  return resultDate;
}

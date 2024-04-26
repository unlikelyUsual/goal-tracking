import api from "./api";

export const getUser = async () => {
  try {
    const res = await api(`/user`);
    const userData = res.data;
    console.log("From Get User : ", userData);
    return userData;
  } catch (err: any) {
    console.error(err?.response?.data);
    return null;
  }
};

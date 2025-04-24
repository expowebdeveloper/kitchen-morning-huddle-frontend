import axios from "axios";
import { HuddleData } from "./types";

export const fetchHuddleData = async (date: string): Promise<HuddleData> => {
  const res = await axios.get<HuddleData>(`http://localhost:8000/huddle/${date}`);
  return res.data;
};

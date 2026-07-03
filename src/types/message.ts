export type Message = {
  id: string;
  sender: "provider" | "applicant";
  content: string;
  time?: string;
};

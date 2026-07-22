export type Message = {
  id: string;
  sender: "helper" | "guardian";
  content: string;
  time?: string;
};

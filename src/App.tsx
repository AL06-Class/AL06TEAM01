import { ApplicantCareFlow } from "./components/applicant/ApplicantCareFlow";
import { CommonGateway } from "./components/common/CommonGateway";
import { useState } from "react";
import "./App.css";

export default function App() {
  const [role, setRole] = useState<"common" | "guardian">("common");

  if (role === "guardian") {
    return <ApplicantCareFlow />;
  }

  return <CommonGateway onOpenGuardian={() => setRole("guardian")} />;
}

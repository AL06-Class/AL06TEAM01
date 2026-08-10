import { ApplicantCareFlow } from "./components/applicant/ApplicantCareFlow";
import { CommonGateway } from "./components/common/CommonGateway";
import { useState } from "react";
import "./App.css";

type AppRole = "common" | "guardian" | "provider";

export default function App() {
  const [role, setRole] = useState<AppRole>("common");

  if (role === "common") {
    return (
      <CommonGateway
        onOpenGuardian={() => setRole("guardian")}
        onOpenProvider={() => setRole("provider")}
      />
    );
  }

  return <ApplicantCareFlow role={role} onRoleChange={setRole} />;
}

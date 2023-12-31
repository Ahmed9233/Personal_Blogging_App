import React, { useState } from "react";

import Form from "@/components/form";
import SubHeader from "@/components/sub-header";
import { Col, Row, message } from "antd";
import { signIn } from "next-auth/react";

function Login() {
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const onSubmit = async () => {
    setLoading(true);
    try {
      const data = await signIn("credentials", {
        redirect: true,
        callbackUrl: "/",
        ...credentials,
      });

      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const disabled = credentials.email === "" || credentials.password === "";

  const formProps = {
    disabled,
    credentials,
    setCredentials,
    loading,
    onFormSubmit: onSubmit,
  };
  return (
    <>
      <SubHeader>
        <h2 className="pb-sub-header-title">Login</h2>
      </SubHeader>
      <Form {...formProps} />
    </>
  );
}

export default Login;

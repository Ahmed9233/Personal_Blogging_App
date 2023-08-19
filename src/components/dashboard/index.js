import SubHeader from "../sub-header";

import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { useSession } from "next-auth/react";
import Link from "next/link";
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const validateMessages = {
  required: "${label} is required!",
  string: {
    min: "${label} must be between ${min} to ${max} characters",
    max: "${label} must be between ${min} to ${max} characters",
  },
};

function LoginDashBoard() {
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState({ title: "", body: "" });

  const { data: session } = useSession();
  console.log(session);

  const onSubmit = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/auth/blog", {
        method: "POST",
        body: JSON.stringify(blog),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok && response.status === 409) {
        alert("User Already Exist");
      }
      if (response.ok) {
      }

      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };
  const array = []
  return (
    <>
      <Link style={{
        backgroundColor: "#7749f8",
        color: "#fff", position: "relative", left: "1000px",
        marginTop: "35px",
        bottom: "50px",
        fontFamily: "bolder"
      }} href={"http://localhost:3000/auth/login"}>Login</Link > <br></br>
      <Link style={{
        backgroundColor: "#7749f8",
        color: "#fff", position: "relative", left: "1000px", bottom: "50px",
        marginTop: "35px",
        fontFamily: "bolder",
      }} href={"http://localhost:3000/auth/signup"}>Sign Up</Link >

      <SubHeader>
        <h2 style={{ fontFamily: "sans-serif" }} className="pb-sub-header-title">Dashboard</h2>
      </SubHeader>

      <Form
        {...layout}
        name="nest-messages"
        onFinish={() => console.log("hello")}
        style={{
          maxWidth: 600,
        }}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={["title"]}
          rules={[
            {
              required: true,
              min: 5,
              max: 50,
            },
          ]}
        >
          <Input
            value={blog.title}
            onChange={(newValue) => setBlog({ ...blog, title: newValue })}
          />
        </Form.Item>
        <Form.Item
          name={["body"]}
          rules={[
            {
              required: true,
              min: 100,
              max: 3000,
            },
          ]}
        >
          <Input.TextArea
            value={blog.body}
            onChange={(newValue) => setBlog({ ...blog, body: newValue })}
          />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            ...layout.wrapperCol,
            offset: 8,
          }}
        >
          <Button onClick={array.push()} type="primary" loading={loading} htmlType="submit">
            Publish Blog
          </Button>
        </Form.Item>
      </Form >

      <h1>My Blogs</h1>
      <h2>An Action button could be coming to the iphone 15</h2>
      <h4>Ahmed Raza - August 19, 2023</h4>
      <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam tenetur, blanditiis voluptates adipisci tempore quod quibusdam corrupti architecto recusandae reprehenderit iste suscipit voluptas officia sapiente unde eius quis <br></br> exercitationem impedit!</p>
      <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam tenetur, blanditiis voluptates adipisci tempore quod quibusdam corrupti architecto recusandae reprehenderit iste suscipit <br></br> voluptas officia sapiente unde eius quis exercitationem impedit!</p>

    </>
  );
}

export default LoginDashBoard;


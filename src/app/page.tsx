"use client";
import styles from "@/styles/page/Home.module.scss";
import { useState } from "react";
import axios from "axios";
import { useBaseUrl } from "@/hooks/useBaseUrl";
import Input from "@/components/Input";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";
import Typography from "@/components/Typography";

export default function Home() {
  // const { baseUrl, setBaseUrl } = useBaseUrl();
  const [baseUrl, setBaseUrl] = useState("");
  const [err, setErr] = useState("");

  const router = useRouter();

  const handleTestApi = async () => {
    try {
      console.log("Response data:", baseUrl);
      setErr("");
      const res = await axios.get(baseUrl);
      if (res.status === 200) {
        localStorage.setItem("baseUrl", baseUrl);
        router.push("/discover");
      }
    } catch (error: unknown) {
      setErr("Nhập sai baseURL, hãy nhập lại!");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputBox}>
        <Input
          type="text"
          placeholder="Nhập baseURL"
          value={baseUrl}
          onChange={(e) => setBaseUrl(e.target.value)}
        ></Input>
        <Button text="Click" onClick={handleTestApi}></Button>
      </div>
      <Typography type="body-2" color="red">
        {err}
      </Typography>
    </div>
  );
}

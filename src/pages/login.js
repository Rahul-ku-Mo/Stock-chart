import React, { useState } from "react";
import { auth } from "../Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import Link from "next/link";
import styles from "../styles/Auth.module.css";
import { useRouter } from "next/router";

const login = () => {
  const router = useRouter();

  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSuccess = () => {
    toast.success("🦄 Welcome Buddy!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      progress: undefined,
      theme: "dark",
    });

    router.push("/stockAnalysis");
  };
  const handleError = (error) => {
    const errorMsg = error.message.split("/")[1].slice(0, -2);

    toast.error(errorMsg, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      progress: undefined,
      theme: "dark",
    });
  };
  const signInAccount = async (auth, email, password) => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        handleSuccess();
        // ...
      })
      .catch((error) => {
        handleError(error);
      });
  };

  const handleSubmit = async () => {
    if (values?.email && values?.password) {
      signInAccount(auth, values.email, values.password);
    } else {
      toast.warn("Please fill the input fields", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  return (
    <div className={styles.container}>
      <h1>💥 Log in 💥</h1>
      <input
        onChange={handleChange("email")}
        type="email"
        placeholder="Email"
        value={values.email}
      />
      <input
        onChange={handleChange("password")}
        type="password"
        placeholder="Password"
        value={values.password}
      />
      <div className={styles.button} onClick={() => handleSubmit()}>
        Log in
      </div>
      <Link href="/signup">New User? Click to sign up 🧑‍💻</Link>
    </div>
  );
};

export default login;

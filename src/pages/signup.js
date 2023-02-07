import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { auth } from "../Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import styles from "../styles/Auth.module.css";
const signup = () => {
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
    toast.success("🦄 Congratulations!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      progress: undefined,
      theme: "dark",
    });

    router.push("/login");
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

  const createAccount = async (auth, email, password) => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        handleSuccess();
        // ...
      })
      .catch((error) => {
        handleError(error);
        // ..create a snackbar
      });
  };

  const handleSubmit = async () => {
    if (values?.email && values?.password) {
      createAccount(auth, values.email, values.password);
    } else {
      //create a snackbar
    }
  };
  return (
    <div className={styles.container}>
      <h1>Sign up</h1>
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
        Sign up
      </div>
      <Link href="/login">Return to Log In Page 🔑</Link>
    </div>
  );
};

export default signup;

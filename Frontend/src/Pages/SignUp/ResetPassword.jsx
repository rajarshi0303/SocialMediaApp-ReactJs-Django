import React from "react";
import ForgetPassword from "../../Components/Signup/ForgetPassword";
import VerifyOTP from "../../Components/Signup/VerifyOTP";
import Reset from "../../Components/Signup/Reset";

import { otpAtom } from "../../Components/Signup/ForgetPassword";
import { resetAtom } from "../../Components/Signup/VerifyOTP";
import { useAtom } from "jotai";

export default function ResetPassword() {
  const [showComponent] = useAtom(otpAtom);
  const [resetComponent] = useAtom(resetAtom);
  console.log("reset-password-re-render");
  if (resetComponent == true) {
    return <Reset></Reset>;
  } else if (showComponent == true) {
    return <VerifyOTP />;
  } else {
    return <ForgetPassword></ForgetPassword>;
  }
}

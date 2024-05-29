/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from "react";
import { Button } from "@mui/material";

export default function LoginWith() {
  return (
    <div>
      <Button
        variant="light"
        type="submit"
        className="form-continue-item text-center"
      >
        <svg
          focusable="false"
          viewBox="0 0 20 20"
          aria-hidden="true"
          width="24"
          height="24"
          style={{ float: "left" }}
        >
          <path
            d="M17.64 9.20443C17.64 8.56625 17.5827 7.95262 17.4764 7.36353H9V10.8449H13.8436C13.635 11.9699 13.0009 12.9231 12.0477 13.5613V15.8194H14.9564C16.6582 14.2526 17.64 11.9453 17.64 9.20443Z"
            fill="#4285F4"
          ></path>
          <path
            d="M8.99976 18C11.4298 18 13.467 17.1941 14.9561 15.8195L12.0475 13.5613C11.2416 14.1013 10.2107 14.4204 8.99976 14.4204C6.65567 14.4204 4.67158 12.8372 3.96385 10.71H0.957031V13.0418C2.43794 15.9831 5.48158 18 8.99976 18Z"
            fill="#34A853"
          ></path>
          <path
            d="M3.96409 10.7101C3.78409 10.1701 3.68182 9.59325 3.68182 9.00007C3.68182 8.40689 3.78409 7.83007 3.96409 7.29007V4.95825H0.957273C0.347727 6.17325 0 7.5478 0 9.00007C0 10.4523 0.347727 11.8269 0.957273 13.0419L3.96409 10.7101Z"
            fill="#FBBC05"
          ></path>
          <path
            d="M8.99976 3.57955C10.3211 3.57955 11.5075 4.03364 12.4402 4.92545L15.0216 2.34409C13.4629 0.891818 11.4257 0 8.99976 0C5.48158 0 2.43794 2.01682 0.957031 4.95818L3.96385 7.29C4.67158 5.16273 6.65567 3.57955 8.99976 3.57955Z"
            fill="#EA4335"
          ></path>
        </svg>
        Login with Google
      </Button>
      <Button
        variant="light"
        type="submit"
        className="form-continue-item text-center"
      >
        <svg
          focusable="false"
          viewBox="0 0 20 20"
          aria-hidden="true"
          width="24"
          height="24"
          style={{ float: "left" }}
        >
          <path
            d="M20 10.0611C20 4.50451 15.5229 0 10 0C4.47715 0 0 4.50451 0 10.0611C0 15.0829 3.65686 19.2452 8.4375 20V12.9694H5.89844V10.0611H8.4375V7.84452C8.4375 5.32296 9.93043 3.93012 12.2146 3.93012C13.3087 3.93012 14.4531 4.12663 14.4531 4.12663V6.60261H13.1921C11.9499 6.60261 11.5625 7.37816 11.5625 8.17381V10.0611H14.3359L13.8926 12.9694H11.5625V20C16.3431 19.2452 20 15.0829 20 10.0611Z"
            fill="#1877F2"
          ></path>
        </svg>
        Login with facebook
      </Button>
      <Button
        variant="light"
        type="submit"
        className="form-continue-item text-center"
      >
        <svg
          focusable="false"
          viewBox="0 0 20 20"
          aria-hidden="true"
          width="24"
          height="24"
          style={{ float: "left" }}
        >
          <path
            d="M16 14.673C15.3712 16.573 13.4888 19.9373 11.5496 19.974C10.2632 19.9998 9.8496 19.1798 8.3792 19.1798C6.9096 19.1798 6.4496 19.949 5.2336 19.999C3.176 20.0815 0 15.143 0 10.8362C0 6.88022 2.6464 4.91933 4.9584 4.88349C6.1984 4.86016 7.3696 5.75435 8.1256 5.75435C8.8848 5.75435 10.3072 4.67932 11.8024 4.83682C12.428 4.86432 14.1856 5.09933 15.3136 6.81772C12.3208 8.85279 12.7872 13.1088 16 14.673ZM11.8224 0C9.5616 0.0950031 7.7168 2.56592 7.9744 4.60932C10.064 4.77849 12.0688 2.33841 11.8224 0Z"
            fill="black"
          ></path>
        </svg>
        Login with Apple
      </Button>
    </div>
  );
}

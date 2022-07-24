import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";
import useCsrfToken from "../hooks/useCsrfToken";
import myAxiosPrivate from "../axios/myAxiosPrivate";

export default function ContactUs() {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [message, setMessage] = useState("");
  let router = useRouter();
  let getCsrf = useCsrfToken();
  let sendEmail = async (e) => {
    e.preventDefault();
    let csrfToken = await getCsrf();
    let myAxios = myAxiosPrivate(router, csrfToken);
    let res = await myAxios
      .post(`/emails/send_email`, {
        name: name,
        email: email,
        message: message,
      })
      .catch((e) => {
        return e.response;
      });
    router.push("/home");
  };
  return (
    <Fragment>
      <div className="flex h-[65vh] items-center justify-start bg-white m-6">
        <div className="mx-auto w-full max-w-lg">
          <h1 className="text-4xl font-medium">Contact us</h1>
          <p className="mt-3">
            Email us at sportsconnecthr@gmail.com or message us here:
          </p>

          <form className="mt-10">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="relative z-0">
                <input
                  type="text"
                  name="name"
                  className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                  placeholder=" "
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
                <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">
                  Your name
                </label>
              </div>
              <div className="relative z-0">
                <input
                  type="text"
                  name="email"
                  className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                  placeholder=" "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">
                  Your email
                </label>
              </div>
              <div className="relative z-0 col-span-2">
                <textarea
                  name="message"
                  rows="5"
                  className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                  placeholder=" "
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
                <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">
                  Your message
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="mt-5 rounded-md bg-black px-10 py-2 text-white"
              onClick={sendEmail}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
}

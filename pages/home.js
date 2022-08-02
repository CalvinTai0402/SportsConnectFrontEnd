import { Fragment } from "react";
import Benefits from "../components/Home/Benefits";
import Description from "../components/Home/Description";
import Features from "../components/Home/Features";
import Hero from "../components/Home/Hero";
import Process from "../components/Home/Process";

export default function Home() {
  return (
    <Fragment>
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <Hero />
        <Features />
        <Benefits />
        <Process />
        <Description />
      </div>
    </Fragment>
  );
}

import useTranslation from "next-translate/useTranslation";
import React, { Fragment } from "react";
import Template from "./Template";

export default function Educations() {
  const { t } = useTranslation();
  return (
    <Fragment>
      <Fragment>
        <Template endpoint={"/educations/"} title={t("portfolio:educations")} />
      </Fragment>
    </Fragment>
  );
}

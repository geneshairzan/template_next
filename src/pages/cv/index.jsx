import React, { useState, useEffect } from "react";

import UI from "@gh/ui";
import Recent from "./recent";
import Printer, { print, PrintContainer } from "@gh/exporter/pdfp";

export default function App(props) {
  const [isprinted, setisprinted] = React.useState(true);
  const [isLoading, setisLoading] = useState(false);

  React.useEffect(() => {
    if (isprinted) {
      setisLoading(true);
      window.scrollTo(0, 0);
      // print({
      //   title: "Genesha CV " + new Date().getFullYear(),
      // }).then((e) => {
      //   setisLoading(false);
      //   // setmobileDisplay("none");
      // });
    }
  }, [isprinted]);

  return (
    <UI.Col center bgcolor="#1e1e1e" p={5}>
      <Printer>
        <PrintContainer>
          <UI.Col p={3}>
            <TopSection />
            <UI.Row>
              <Left />
              <Right />
            </UI.Row>
            <Education />
            <Recent />
          </UI.Col>
        </PrintContainer>
      </Printer>
    </UI.Col>
  );
}

function Education(params) {
  return (
    <UI.Row>
      <UI.Col width="50%">
        <UI.Text variant="body1" color="cv.red" bold pt={2}>
          FORMAL EDUCATION
        </UI.Text>
        <UI.Text variant="body2">
          2013 – 2015. Bina Nusantara Business School, Jakarta
          <br /> Major in Master Management – Creative Marketing <br />
          2007 – 2011. Bina Nusantara University, Jakarta <br />
          Major in Information Technology, Jakarta <br />
          2004 – 2007. 48 Senior High School, Jakarta <br />
          2001 – 2004. 81 Junior High School , Jakarta <br />
          1996 – 2001. Angkasa IX Halim P. Elementary school, Jakarta <br />
          1995 – 1996. Siemens Elementary School, Jakarta <br />
        </UI.Text>
      </UI.Col>

      <UI.Col width="50%">
        <UI.Text variant="body1" color="cv.red" bold pt={2}>
          NON FORMAL EDUCATION
        </UI.Text>
        <UI.Text variant="body2">
          2012. IT Infrastucture Library Foundation (ITIL) V3 (Certificate) <br />
          2012. IBM ASEAN TSS Sales Training <br />
          2012. IBM Sales Presentation Program (Certificate)
          <br />
          2011. Cisco Certified Network Associate (CCNA) <br />
          2011. TOEFL Preparation (Certificate) <br />
          2008. SAP01 – SAP Fundamentals (Certificate) <br />
        </UI.Text>
      </UI.Col>
    </UI.Row>
  );
}

function TopSection(params) {
  return (
    <UI.Row spacing={2} mb={3} justifyContent="space-between" width="100%">
      <UI.Col center>
        <UI.Avatar src="/assets/img/ppsq.png" w={180} />
      </UI.Col>

      <UI.Col flexGrow={1} alignItems="flex-end" justifyContent="flex-end">
        <UI.Text variant="h3" bold color="cv.blue">
          ESHA
        </UI.Text>
        <UI.Text variant="body1" bold>
          Genesha Iran Pratama S.Kom, M.M.
        </UI.Text>
        <UI.Text variant="body1" color="cv.red" bold>
          FULLSTACK DEVELOPER
        </UI.Text>
        <UI.Text variant="body2" pt={2} align="right">
          genesha.irzan@gmail.com <br />
          +62 811 995 1112 <br />
          https://genesha.dev <br />
          Jakarta | Bekasi | Bali, Indonesia
        </UI.Text>
      </UI.Col>
    </UI.Row>
  );
}

function Left(params) {
  return (
    <UI.Col width="50%" pr={1}>
      <UI.Text variant="body1" color="cv.red" bold>
        WORKING EXPERIENCE
      </UI.Text>
      <UI.Text variant="body2">
        2020 – Present. GeneshaDev. Founder.
        <br /> 2013 – Present. Alpha Dsign. Founder.
        <br /> 2012 – 2013. PT. IBM Indonesia. GTS – TSS – Sales Specialist
        <br />
        2011 – 2012. PT. IBM Indonesia. GTS – TSS – I/T Specialist
        <br />
        2011. Thesis. Analysis System and Database Design of Helpdesk Management System Applying With Service Level
        Agreement (SLA) at PT. Toyota Astra Motor
        <br />
        2010. Apprenticeship Program in PT. Toyota Astra Motor <br />
      </UI.Text>
    </UI.Col>
  );
}

function Right(params) {
  return (
    <UI.Col width="50%">
      <UI.Text variant="body1" color="cv.red" bold>
        AREA OF EXPERTISE
      </UI.Text>
      <UI.Text variant="body2">React | Laravel | MUI</UI.Text>

      <UI.Text variant="body1" color="cv.red" bold pt={1}>
        SKILLSET & TECHNOLOGY
      </UI.Text>
      <UI.Text variant="body2">
        HTML | CSS | PHP | Javascript | C# | C++ | ThreeJS | React Fiber | Node | Express | Bootstrap | Mysql | Mongo |
        AWS | Linux | Nginx | Jenkins | Docker | Cloudflare
      </UI.Text>
      <UI.Text variant="body1" color="cv.red" bold pt={1}>
        SOCIAL
      </UI.Text>
      <UI.Text variant="body2">
        https://github.com/geneshairzan <br />
        https://www.linkedin.com/in/geneshairzan/ <br />
      </UI.Text>
    </UI.Col>
  );
}

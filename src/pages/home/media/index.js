import React, { useState, useEffect } from "react";
import UI from "@gh/ui";
import Icon from "@gh/icon";
import MainNav from "@/component/app/smart/mainNav";
import MainHeader from "@/component/app/smart/mainHeader";
import MainGeneralInfo from "@/component/app/smart/mainGeneralInfo";
import RoomCards from "@/component/app/smart/roomCards";
import { rooms, pages } from "@/component/app/smart/data";

import useFetch from "@gh/helper/useFetch";
import Create from "./create";
import h from "@gh/helper";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react"; // import from 'keen-slider/react.es' for to get an ES module

const assets = [
  { name: "floor 1", src: "/assets/img/bg/floorplan.png" },
  { name: "floor 2", src: "/assets/img/bg/floorplan.png" },
  { name: "floor 3", src: "/assets/img/bg/floorplan.png" },
];
export default function App({ notes }) {
  const [loaded, setLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const rooms = useFetch({ url: `family/media` });

  const [sliderRef, instanceRef] = useKeenSlider(
    {
      slideChanged(slider) {
        // console.log("slide changed");
        setCurrentSlide(slider.track.details.rel);
      },
      created() {
        // console.log("loaded");
        setLoaded(true);
      },
    },
    [
      // add plugins here
    ]
  );

  return (
    <UI.Col
      width="100%"
      sx={{
        height: "calc(100% - 32px)",
        borderRadius: 3,
      }}
      center
    >
      <UI.Col
        sx={{
          width: "130%",
          borderRadius: 3,
          position: "absolute",
          left: "-15%",
        }}
      >
        <div ref={sliderRef} className="keen-slider">
          {rooms?.get()?.map((d) => (
            <div className="keen-slider__slide">
              <UI.Img
                src={"media/" + d?.img}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  zIndex: 2,
                }}
              />
            </div>
          ))}
        </div>
        <UI.Col center spacing={1} pt={2}>
          <UI.Text variant="h5">{assets[currentSlide]?.name}</UI.Text>
          {loaded && instanceRef.current && (
            <UI.Row center spacing={1}>
              {[...Array(instanceRef.current.track.details?.slides.length).keys()].map((idx) => (
                <UI.Col
                  key={idx}
                  onClick={() => {
                    instanceRef.current?.moveToIdx(idx);
                  }}
                  // className={"dot" + (currentSlide === idx ? " active" : "")}
                  sx={{
                    width: 12,
                    height: 12,
                    bgcolor: currentSlide == idx ? "smart.main" : "smart.text",
                    borderRadius: "50%",
                  }}
                />
              ))}
            </UI.Row>
          )}
        </UI.Col>
      </UI.Col>
    </UI.Col>
  );
}

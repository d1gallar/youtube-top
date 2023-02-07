import React from "react";
import SkeletonChannel from "../Skeletons/SkeletonChannel";

const DEFAULT_SIZE = 50;

export default function SkeletonChannelList() {
  const loadSkeleton = () => {
    let arr: Array<number> = [];
    for (let i = 0; i < DEFAULT_SIZE; i++) {
      arr.push(i);
    }
    return arr.map((x: number) => {
      return <SkeletonChannel key={x} />;
    });
  };

  return <React.Fragment>{loadSkeleton()}</React.Fragment>;
}

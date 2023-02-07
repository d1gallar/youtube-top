import React, { useEffect, useState, ReactNode, useContext } from "react";

type ViewportProviderProps = {
  children: ReactNode | ReactNode[];
};

export const ViewportContext = React.createContext({
  height: window.innerHeight,
  width: window.innerWidth,
});

export default function ViewportProvider(props: ViewportProviderProps) {
  const [height, setHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth);

  function handleResize() {
    setHeight(window.innerHeight);
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ViewportContext.Provider value={{ width, height }}>
      {props.children}
    </ViewportContext.Provider>
  );
}

export const useViewport = () => {
  const {width, height} = useContext(ViewportContext);
  return {width, height};
}

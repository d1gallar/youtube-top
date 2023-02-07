import "./Skeleton.css";

type SkeletonProps = {
  type: string;
};

const Skeleton = ({ type }: SkeletonProps) => {
  return <div className={`skeleton ${type}`}></div>;
};

export default Skeleton;

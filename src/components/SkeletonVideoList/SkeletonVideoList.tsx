import SkeletonCard from "../Skeletons/SkeletonCard";

const DEFAULT_SIZE = 12;

export default function SkeletonVideoList() {
  function renderList() {
    let arr: Array<number> = [];
    for (let i = 0; i < DEFAULT_SIZE; i++) {
      arr.push(i);
    }
    return arr.map((x) => {
      return <SkeletonCard key={x} />;
    });
  }
  return <>{renderList()}</>;
}

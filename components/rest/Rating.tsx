import Image from "next/image";
import React from "react";

function Rating(props: { value: number }) {
  const HEIGHT = 20;

  const rating = props.value;
  const fullStars = rating - (rating % 1);
  const hasHalf = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  const stars: React.JSX.Element[] = [];
  for (let i = 0; i < fullStars; ++i) {
    stars.push(
      <Image
        src="/svgs/ystar.svg"
        width={0}
        height={0}
        alt="yellow star"
        style={{
          width: `${HEIGHT}px`,
          height: `${HEIGHT}px`,
          objectFit: "contain",
        }}
      />,
    );
  }
  if (hasHalf)
    stars.push(
      <Image
        src="/svgs/hstar.svg"
        width={0}
        height={0}
        alt="half star"
        style={{
          width: `${HEIGHT}px`,
          height: `${HEIGHT}px`,
          objectFit: "contain",
        }}
      />,
    );
  for (let i = 0; i < emptyStars; ++i) {
    stars.push(
      <Image
        src="/svgs/bstar.svg"
        width={0}
        height={0}
        alt="black star"
        style={{
          width: `${HEIGHT}px`,
          height: `${HEIGHT}px`,
          objectFit: "contain",
        }}
      />,
    );
  }

  return <div className="flex">{...stars}</div>;
}

export default Rating;

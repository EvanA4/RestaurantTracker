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
        width={HEIGHT}
        height={HEIGHT}
        alt="yellow star"
      />,
    );
  }
  if (hasHalf)
    stars.push(
      <Image
        src="/svgs/hstar.svg"
        width={HEIGHT}
        height={HEIGHT}
        alt="half star"
      />,
    );
  for (let i = 0; i < emptyStars; ++i) {
    stars.push(
      <Image
        src="/svgs/bstar.svg"
        width={HEIGHT}
        height={HEIGHT}
        alt="black star"
      />,
    );
  }

  return <div className="flex">{...stars}</div>;
}

export default Rating;

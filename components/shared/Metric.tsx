import React, { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";

interface MetricProps {
  imgUrl: string;
  title?: string;
  alt: string;
  value?: number | string;
  textStyles?: string;
  href?: string;
  isAuthor?: boolean;
}

const Metric = ({
  imgUrl,
  title,
  alt,
  value,
  textStyles,
  href,
  isAuthor,
}: MetricProps) => {
  const metricContent = (
    <>
      <Image
        src={imgUrl}
        alt={alt}
        width={16}
        height={16}
        className={`${!href ? "invert-colors object-contain" : ""}  ${href ? "size-[16px] rounded-full object-cover" : ""}`}
      />
      <p className={`${textStyles} flex items-center gap-1`}>
        {value}

        <span className="small-medium line-clamp-1 ">{title}</span>
      </p>
    </>
  );

  if (href) {
    return (
      <Link href={href} className="flex-center gap-2">
        {metricContent}
      </Link>
    );
  }

  return <div className="flex-center flex-wrap gap-1">{metricContent}</div>;
};

export default Metric;

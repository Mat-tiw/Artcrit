import Link from "next/link";
import React from "react";

const Banner: React.FC = () => {
  return (
    <React.Fragment>
      <div className="bg-secondary w-full h-16 top-0">
        <h1 className="text-primary font-montserrart font-bold text-2xl p-3">
          <Link  href={"http://localhost:3000/"}>Artcrit</Link>
        </h1>
      </div>
    </React.Fragment>
  );
};
export default Banner;
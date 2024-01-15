import React from "react";
interface PostProps {
  title?: string;
  content?: string;
  date?: string;
  img?: string;
  icon?: string;
}
const TestUi: React.FC<PostProps> = ({ title, content }) => {
  return (
    <>
      <div className="items-center text-wrap ">
        <div className="flex flex-col border-2 rounded-xl m-5 items-center text-center  ">
          <div className="p-3 ">
            <br />
            {title}
            <br />
            <p className="">
              {content}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default TestUi;

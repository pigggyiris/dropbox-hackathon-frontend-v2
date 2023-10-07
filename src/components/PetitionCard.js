import { Link } from "react-router-dom";
import React from "react";
import defaultImg from "../assets/default-petition.png";

function PetitionCard({
  id,
  title,
  author,
  createdOn,
  description,
  numberOfSigned,
  target,
  image,
  pdfData,
}) {
  const percentage = Math.round((numberOfSigned / target) * 100);

  const handlePDFClick = (base64Pdf) => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(base64ToBlob(base64Pdf, "application/pdf"));
    link.target = "_blank"; // 打开新窗口
    link.rel = "noopener noreferrer";
    link.click();
  };

  const base64ToBlob = (base64, type = "application/octet-stream") => {
    const bin = atob(base64.split(",")[1]); // 使用split确保base64的数据部分被获取
    const len = bin.length;
    const arr = new Uint8Array(len);

    for (let i = 0; i < len; i++) {
      arr[i] = bin.charCodeAt(i);
    }

    return new Blob([arr], { type: type });
  };
  return (
    <div className="border p-4 shadow-lg max-w-full mx-auto mt-4 flex h-auto w-full md:w-[420px] ">
      <img
        className="flex-none w-24 h-24 rounded mr-4"
        src={image || defaultImg}
        alt="petition"
      />
      <div className="flex-1 overflow-y-hidden">
        <h2 className="font-bold text-xl mb-2">{title}</h2>

        <p className="line-clamp-5 mb-2">{description}</p>

        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-teal-100">
                {percentage}%
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block">
                {numberOfSigned + "/" + target}
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-teal-200">
            <div
              style={{ width: `${percentage}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-600"
            ></div>
          </div>
        </div>

        <span className="block mb-2">
          View signatures by{" "}
          <span
            onClick={() => handlePDFClick(pdfData)}
            className="text-blue-500 hover:text-blue-700 inline cursor-pointer"
          >
            PDF
          </span>
        </span>

        <Link
          className="text-blue-500 hover:text-blue-700 block"
          to={`/Petitions/${id}`}
        >
          Read More
        </Link>
      </div>
    </div>
  );
}

export default PetitionCard;

import { FaPhone } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";

function Footer() {
  return <p>
    <div className="h-[260px] bg-[#D9D9D9] flex justify-center items-center">
      <div className="w-[70%]">
        <div className="flex flex-row justify-between items-end">
          <div>
            <div className="mb-2 flex flex-row items-center">
              <FaLocationDot className="mr-2" />
              <p>Mérida- Venezuela</p>
            </div>
            <div className="mb-2 flex flex-row items-center">
              <FaPhone className="mr-2" />
              <p>(123) 456-7890</p>
            </div>
            <div className="mb-2 flex flex-row items-center">
              <p className="font-light text-[16px] mr-6">Síguenos</p>
              <FaFacebookSquare className="mr-2" />
              <FaSquareXTwitter className="mr-2" />
              <FaInstagram className="mr-2"  />
            </div>
          </div>
          <div className="flex">
            <img className="h-36 w-auto" src="/logo-completo.png" alt="" />
          </div>
        </div>
        <hr className="my-7 " />
        <div className="flex justify-center font-extralight text-[12px] mb-2">
          <p>© 2025 En Topias café</p>
        </div>
      </div>
    </div>
  </p>;
}

export default Footer;

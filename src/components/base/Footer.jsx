import { MdPhone } from "react-icons/md";
import { FaFacebookSquare } from "react-icons/fa";
import { BiWorld } from "react-icons/bi";
import { FaInstagramSquare } from "react-icons/fa";



function Footer() {
  return <p>
    <div className="h-[230px] bg-[#D9D9D9] flex justify-center items-end">
      <div className="w-[70%] ">
        <div className="flex flex-row justify-between items-end">
          <div>
            <div className="mb-2 flex flex-row items-center">
              <BiWorld className="mr-2 text-2xl text-[#F03634]" />
              <p>Mérida- Venezuela</p>
            </div>
            <div className="mb-2 flex flex-row items-center">
              <MdPhone className="mr-2 text-2xl text-[#F03634]" />
              <p>+57 3185707672</p>
            </div>
            <div className="mb-2 flex flex-row items-center">
              <MdPhone className="mr-2 text-2xl text-[#F03634]" />
              <p>+58 424-7292612</p>
            </div>
            <div className="mb-2 flex flex-row items-center">
              <p className="font-light text-[16px] mr-6">Síguenos</p>
              <a
                href="https://www.facebook.com/profile.php?id=61557124352825"
                target="_blank"
                rel="noopener noreferrer"
                className=" transition-opacity duration-200"
              >
                <FaFacebookSquare className="mr-2 text-3xl text-[#F03634] hover:text-[#2A86FF] transition-colors duration-200" />
              </a>
              <a
                href="https://www.instagram.com/entopiascafe/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity duration-200"
              >
                <FaInstagramSquare className="mr-2 text-3xl text-[#F03634] hover:text-[#F70DDC] transition-colors duration-200" />
              </a>
            </div>
          </div> 
          <div className="flex">
            <img className="h-36 w-auto" src="/logo-completo.webp" alt="logo de entopias cafe" />
          </div>
        </div>
        <hr className="mb-2 mt-7 border-[#B76E49] border-1" />
        <div className="flex justify-center font-extralight text-[12px] mb-4">
          <p>© 2025 En Topias café</p>
        </div>
      </div>
    </div>
  </p>;
}

export default Footer;

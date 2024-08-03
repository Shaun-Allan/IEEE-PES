import { MdEmail, MdCall } from "react-icons/md";
import { FaSquareInstagram, FaLinkedin } from "react-icons/fa6";

const DETAILS = [
  {
    title: "Email",
    description: "ieeepes@ssn.edu.in",
    icon: MdEmail,
    link: "mailto:ieeepes@ssn.edu.in",
  },

  {
    title: "Instagram",
    description: "@ssn_ieee_pes",
    icon: FaSquareInstagram,
    link: "https://www.instagram.com/ieee.pes/?hl=en",
  },
  {
    title: "LinkedIn",
    description: "linkedin_name",
    icon: FaLinkedin,
    link: "",
  },
  {
    title: "Call",
    description: "1234567890",
    icon: MdCall,
    link: "tel:1234567890",
  },
];

export default DETAILS;

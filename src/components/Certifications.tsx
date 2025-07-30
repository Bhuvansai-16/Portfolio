"use client";

import CertificationIcon from "./CertificationIcon";
import { useTheme } from "../contexts/ThemeContext";

export default function Certifications() {
  const { theme } = useTheme()
  const dark = theme === "dark"
  return (
    <section id="certifications" className="py-16 px-4">
      <h2 className={`text-5xl sm:text-6xl md:text-7xl font-bold mb-8 text-center ${dark ? "text-white" : "text-white"}`}>
        Certifications / Badges
      </h2>

      <div className={`grid grid-cols-4 md:grid-cols-4 gap-6 am:gap-6 md-gap-8 1g: gap-1 md:gap-10 lg:gap-12 max-w-4xl mx-auto place-items-center`}>
        <CertificationIcon
        name="Google Developer Student Clubs"
        link="https://g.dev/Bhuvansai_Mallareddyuniversity"
        imageSrc="images1.png"/>

        <CertificationIcon
          name="Kaggle"
          link="https://www.kaggle.com/bhuvansaich"
          imageSrc="images2.png"
          ></CertificationIcon>
          <CertificationIcon
          name="Coursera"
          link="https://www.coursera.org/user/b4c0599b5ad3e2803d85b6248cc4ade5"
          imageSrc="images3.png"
          ></CertificationIcon>
          <CertificationIcon name="Microsoft Learn" 
          link = "https://learn.microsoft.com/en-us/users/chilamkurthibhuvansai-2608/achievements"
          imageSrc="images5.png" ></CertificationIcon>
          
      </div>
    </section>
  );
}

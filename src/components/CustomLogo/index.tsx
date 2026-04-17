import Image from "next/image";

export const CustomLogo = () => {
  return (
    <Image
      src="/light-logo.webp"
      alt="Himalayas Continental Logo"
      width={200}
      height={200}
      style={{
        objectFit: "contain",
        display: "block",
        margin: 0,
        padding: 0,
      }}
    />
  );
};

export const CustomIcon = () => {
  return (
    <Image
      src="/light-logo.webp"
      alt="Himalayas Continental Logo"
      width={80}
      height={60}
      style={{ objectFit: "contain" }}
    />
  );
};

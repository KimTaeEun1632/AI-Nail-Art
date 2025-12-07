import LiveBackground from "@/components/Common/LiveBackground";
import Image from "next/image";
import nailArtImg from "@/assets/images/nailArt.jpg";
import GoogleLoinButton from "@/components/Common/LoginButton";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  console.log("홈 세션", session);

  return (
    <>
      {session?.user ? (
        redirect("/create-image")
      ) : (
        <>
          <div className="min-h-screen w-full flex flex-col items-center justify-center pt-20 pb-20 bg-black">
            <div className="flex flex-col grow gap-12 items-center justify-center text-white w-full h-full overflow-hidden">
              <div className="flex flex-col grow items-center gap-8 justify-center w-full">
                <div className="flex items-center justify-center flex-col w-full flex-1 max-hd-[32rem]">
                  <div className="flex items-center justify-center h-[32rem] relative aspect-square border rounded-4xl overflow-hidden">
                    <Image src={nailArtImg} alt="네일아트 이미지" fill />
                  </div>
                </div>
                <div>이미지를 생성하려면 로그인을 해주세요.</div>
              </div>
              <div>
                <GoogleLoinButton className="flex items-center justify-center gap-2 px-6 py-3 bg-[#dafba6] rounded-full hover:bg-[#edfad9] text-gray-700 font-medium cursor-pointer" />
              </div>
            </div>
          </div>
          <LiveBackground />
        </>
      )}
    </>
  );
}

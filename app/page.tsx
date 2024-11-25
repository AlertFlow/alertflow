import { Snippet, Code, Spacer } from "@nextui-org/react";
import { cookies } from "next/headers";
import { Icon } from "@iconify/react";

import { title, subtitle } from "@/components/primitives";
import Navbar from "@/components/navbar";
import AdminGetSettings from "@/lib/fetch/page/settings";
import { FeaturesSectionDemo } from "@/components/home/bento";
import AnimatedGradientText from "@/components/magicui/animated-gradient-text";
import { cn } from "@/lib/utils";
import HomeShowcase from "@/components/home/Showcase";
import HomeTerraform from "@/components/home/Terraform";
import HomeRunners from "@/components/home/Runners";
import HomeFlows from "@/components/home/Flows";
import Footer from "@/components/footer/Footer";

export default async function Home() {
  const user = JSON.parse(cookies().get("user")?.value || "{}");
  const session = cookies().get("session")?.value;
  const settings = await AdminGetSettings();

  return (
    <>
      <Navbar session={session} settings={settings} user={user} />
      <main className="container mx-auto w-full pt-2 px-6 flex-grow">
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
          <div className="z-10 flex mb-4 items-center justify-center">
            <AnimatedGradientText>
              🎉
              <span
                className={cn(
                  `pl-2 inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
                )}
              >
                Introducing AlertFlow
              </span>
              <Icon
                className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5"
                icon="solar:alt-arrow-right-broken"
              />
            </AnimatedGradientText>
          </div>

          <div className="inline-block text-center justify-center">
            <h1 className={title()}>Make&nbsp;</h1>
            <h1 className={title({ color: "blue" })}>AlertFlow&nbsp;</h1>
            <h1 className={title()}>to your</h1>
            <br />
            <h1 className={title()}>personal Monitoring Assistant.</h1>
            <h2 className={subtitle({ class: "mt-4" })}>
              An monitoring alarm automation platform for every platform.
            </h2>
          </div>

          <div className="mt-8">
            <Snippet hideCopyButton hideSymbol size="lg" variant="flat">
              <span>
                Coming <Code color="primary">Soon.</Code>
              </span>
            </Snippet>
          </div>

          <div className="mt-8 w-full">
            <HomeShowcase />
          </div>
        </section>
        <section>
          <FeaturesSectionDemo />
        </section>
        <Spacer y={28} />
        <section>
          <HomeFlows />
        </section>
        <Spacer y={28} />
        <section>
          <HomeRunners />
        </section>
        <Spacer y={28} />
        <section>
          <HomeTerraform />
        </section>
      </main>
      <Footer />
    </>
  );
}

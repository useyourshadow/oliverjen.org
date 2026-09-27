import type { Metadata } from "next";
import { Suspense } from "react";

import Banner from "@/components/banner";
import Footer from "@/components/footer";
import Header from "@/components/header";
import HomeCarousel from "@/components/home-carousel";
import Portfolio from "@/components/portfolio";
import { CarouselItem } from "@/components/ui/carousel";
import { HOME_SECTIONS } from "@/lib/home-sections";

interface PageProps {
    params: Promise<{ section?: string[] }>;
}

export const dynamicParams = false;

const SECTION_METADATA: Record<string, Metadata> = {
    portfolio: {
        title: "Portfolio",
        description: "Explore the portfolio of Oliver",
        alternates: {
            canonical: "https://yencheng.dev/portfolio",
        },
        openGraph: {
            title: "Portfolio — Oliver Jen",
            description:
                "Open-source projects, Raycast extensions, and web apps built with Next.js.",
            url: "https://yencheng.dev/portfolio",
        },
    },

    travel: {
        title: "Travel",
        description:
            "Travel map and flight history of Oliver Jen — places visited and routes around the world.",
        alternates: {
            canonical: "https://yencheng.dev/travel",
        },
        openGraph: {
            title: "Travel — Oliver Jen",
            description:
                "Travel map and flight history — places visited and routes around the world.",
            url: "https://yencheng.dev/travel",
        },
    },

    footer: {
        title: "Contact",
        description:
            "Get in touch with Oliver Jen — find links to GitHub, LinkedIn, Twitter, and more.",
        robots: {
            index: false,
        },
    },
};

export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const { section } = await params;
    const slug = section?.[0];

    return SECTION_METADATA[slug ?? ""] ?? {};
}

export function generateStaticParams() {
    return HOME_SECTIONS.map((section) => ({
        section: section === "home" ? [] : [section],
    }));
}

export default function Home() {
    return (
        <main className="h-screen w-full overflow-hidden">
            <Suspense fallback={null}>
                <HomeCarousel>
                    <CarouselItem>
                        <Header />
                        <Banner />
                    </CarouselItem>

                    <CarouselItem>
                        <Portfolio />
                    </CarouselItem>

                    <CarouselItem>
                        <Footer />
                    </CarouselItem>
                </HomeCarousel>
            </Suspense>
        </main>
    );
}
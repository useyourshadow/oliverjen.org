"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, useMotionValue } from "framer-motion";
import { DockItem, InfoStyle } from "@/types/type";
import Screen from "@/components/mac-screen/screen";
import DockItemButton from "@/components/mac-screen/dockItemButton";
import { useCarousel } from "@/components/ui/carousel";

export default function Dock() {
    const { api } = useCarousel();

    const mouseX = useMotionValue(Infinity);
    const [magnify, setMagnify] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
        setMagnify(mq.matches);
        const onChange = (e: MediaQueryListEvent) => setMagnify(e.matches);
        mq.addEventListener("change", onChange);
        return () => mq.removeEventListener("change", onChange);
    }, []);

    const [screenState, setScreenState] = useState({
        url: "/finder",
        showInfo: false,
        title: "",
        description: "",
        tech: "",
        picture: [] as Array<{ src: string; description: string }>,
        style: {} as InfoStyle,
    });

    const handleItemClick = useCallback(
        (item: DockItem) => {
            if (item.label === "Ribit") {
                api?.scrollTo(4);
                return;
            }

            setScreenState({
                url: item.url,
                showInfo: item.showInfo,
                title: item.info?.title || "",
                description: item.info?.description || "",
                tech: item.info?.tech || "",
                picture: item.info?.picture || [],
                style: item.info?.style || {
                    border: item.info?.style?.border || "border-brown-400",
                    bg: item.info?.style?.bg || "bg-white-brown-400/100",
                    secondBg:
                        item.info?.style?.secondBg || "bg-white-brown-600/100",
                    icon: item.info?.style?.icon || "text-white-brown-600",
                    text: item.info?.style?.text || "text-white-black-900",
                },
            });
        },
        [api],
    );

    const dockItems: DockItem[] = [
        {
            src: "/dock/finder.png",
            alt: "finder icon",
            className: "rounded-xl cursor-pointer",
            label: "Finder",
            url: "/finder",
            showInfo: false,
            link: false,
        },
        {
            src: "/dock/photo.png",
            alt: "photo icon",
            className: "rounded-xl cursor-pointer",
            label: "Photo",
            url: "/photo",
            showInfo: false,
            link: false,
        },
        
        {
            src: "/dock/github.png",
            alt: "github icon",
            className: "rounded-xl cursor-pointer",
            label: "My GitHub",
            url: "https://github.com/ridemountainpig",
            showInfo: false,
            link: true,
        },
        {
            src: "/dock/raycast.png",
            alt: "raycast icon",
            className: "rounded-xl cursor-pointer",
            label: "Ribit",
            url: "https://apps.apple.com/us/app/ribit-share-rides/id6752734297",
            showInfo: false,
            link: true,
        },
        {
            src: "/dock/subflow.png",
            alt: "subflow icon",
            className: "rounded-xl cursor-pointer",
            label: "Minecraft Mod",
            url: "https://www.curseforge.com/minecraft/mc-mods/speedrun-swap",
            showInfo: true,
            link: true,
            info: {
                title: "SpeedRun Mod",
                description:
                    "Easily flow through your subscriptions with Subflow. Track spending, organize recurring payments, and take control of your subscription management. Whether it’s Netflix, Spotify, or any other recurring expenses, Subflow keeps everything organized in one place.",
                
                style: {
                    border: "border-[#faf0e6]",
                    bg: "bg-[#514f50]",
                    secondBg: "bg-[#27272a95]",
                    icon: "text-[#faf0e6]",
                    text: "text-[#faf0e6]",
                },
            },
        },
       
    ];

    return (
        <>
            <div className="absolute bottom-20 left-1/2 flex h-[86%] w-full -translate-x-1/2 transform sm:w-[95%]">
                <Screen
                    url={screenState.url}
                    infoShow={screenState.showInfo}
                    title={screenState.title}
                    description={screenState.description}
                    tech={screenState.tech}
                    picture={screenState.picture}
                    style={screenState.style}
                />
            </div>

            <motion.div
                onMouseMove={(e) => mouseX.set(e.clientX)}
                onMouseLeave={() => mouseX.set(Infinity)}
                className="dock-panel liquid-glass absolute bottom-2 left-1/2 flex h-14 w-max -translate-x-1/2 transform items-end gap-x-1 rounded-[1.25rem] p-2 sm:h-[69px] sm:gap-x-2 sm:rounded-3xl sm:p-3"
            >
                {dockItems.map((item) => (
                    <DockItemButton
                        key={item.label}
                        item={item}
                        mouseX={mouseX}
                        magnify={magnify}
                        isActive={
                            !item.link &&
                            item.url !== "" &&
                            item.url === screenState.url
                        }
                        onClick={handleItemClick}
                    />
                ))}
            </motion.div>
        </>
    );
}

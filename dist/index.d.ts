import React, { ReactNode } from "react";
type VideoAskConfig = {
    kind: string;
    url: string;
    options: {
        widgetType: "VideoThumbnailExtraLarge" | "VideoThumbnailWindow" | "VideoThumbnailWindowTall" | "VideoThumbnailSmall";
        text?: string;
        backgroundColor?: string;
        position?: "bottom-right" | "top-right" | "top-left" | "bottom-left";
        dismissible: boolean;
        videoPositon?: string;
    };
};
type VideoAskCallbacks = {
    onLoadModal?: () => void;
    onCloseModal?: (removeWidget: () => void) => void;
    onMessage?: (param?: {
        type: string;
    }) => void;
    onCloseWidget?: () => void;
};
declare global {
    interface Window {
        videoask?: {
            loadEmbed: (config: VideoAskConfig, callbacks?: VideoAskCallbacks) => Promise<void>;
            onCloseWidget: (callbacks?: any) => void;
        };
    }
}
export declare const VideoAskContext: React.Context<{
    showWidget: () => void;
    hideWidget: () => void;
}>;
declare const VideoAskProvider: React.FC<{
    children: ReactNode;
    config: VideoAskConfig;
    callbacks?: VideoAskCallbacks;
    delay?: number;
}>;
export default VideoAskProvider;

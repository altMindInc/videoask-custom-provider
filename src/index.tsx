import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

type VideoAskConfig = {
  kind: 'widget';
  url: string;
  options: {
    widgetType:
      | 'VideoThumbnailWindow'
      | 'VideoThumbnailWindowTall'
      | 'VideoThumbnailExtraLarge'
      | 'VideoThumbnailJumbo';
    text: string;
    backgroundColor?: string;
    position?: 'bottom-left' | 'top-right' | 'top-left' | 'bottom-left';
    dismissible: boolean;
    videoPositon?: string;
  };
};

type VideoAskCallbacks = {
  onLoadModal?: () => void;
  onCloseModal?: (removeWidget: () => void) => void;
  onMessage?: (param?: { type: string }) => void;
  onCloseWidget?: () => void;
};

declare global {
  interface Window {
    videoask?: {
      loadEmbed: (
        config: VideoAskConfig,
        callbacks?: VideoAskCallbacks
      ) => Promise<void>;
      onCloseWidget: (callbacks?: any) => void;
    };
  }
}

const VideoAskContext = createContext<{
  showWidget: () => void;
  hideWidget: () => void;
}>({
  showWidget: () => {},
  hideWidget: () => {},
});

const VideoAskProvider: React.FC<{
  children: ReactNode;
  config: VideoAskConfig;
  callbacks?: VideoAskCallbacks;
  delay?: number;
}> = ({ children, config, callbacks, delay }) => {
  const [widget, setWidget] = useState<any>(null);
  const widgetRef: any = useRef();
  widgetRef.current = widget;

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.videoask.com/embed/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const removeWidget = useCallback(() => {
    widget?.remove?.();
    widgetRef?.current?.remove?.();
    setWidget(null);
  }, [widget]);

  const showWidget = useCallback(() => {
    setTimeout(() => {
      if (!widget) {
        window.videoask
          ?.loadEmbed(config, {
            ...callbacks,
            onCloseModal: () => {
              callbacks?.onCloseModal?.(removeWidget);
            },
          })
          .then(el => setWidget(el));
      }
    }, delay || 3000);
  }, [callbacks, config, removeWidget, widget]);

  const hideWidget = useCallback(() => {
    removeWidget();
  }, [removeWidget]);

  return (
    <VideoAskContext.Provider
      value={{
        showWidget,
        hideWidget,
      }}
    >
      {children}
    </VideoAskContext.Provider>
  );
};

export default VideoAskProvider;

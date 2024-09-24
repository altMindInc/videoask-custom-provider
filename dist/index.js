"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoAskContext = void 0;
const react_1 = __importStar(require("react"));
exports.VideoAskContext = (0, react_1.createContext)({
    showWidget: () => { },
    hideWidget: () => { },
});
const VideoAskProvider = ({ children, config, callbacks, delay }) => {
    const [widget, setWidget] = (0, react_1.useState)(null);
    const widgetRef = (0, react_1.useRef)();
    widgetRef.current = widget;
    (0, react_1.useEffect)(() => {
        const script = document.createElement("script");
        script.src = "https://www.videoask.com/embed/embed.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);
    const removeWidget = (0, react_1.useCallback)(() => {
        var _a, _b, _c;
        (_a = widget === null || widget === void 0 ? void 0 : widget.remove) === null || _a === void 0 ? void 0 : _a.call(widget);
        (_c = (_b = widgetRef === null || widgetRef === void 0 ? void 0 : widgetRef.current) === null || _b === void 0 ? void 0 : _b.remove) === null || _c === void 0 ? void 0 : _c.call(_b);
        setWidget(null);
    }, [widget]);
    const showWidget = (0, react_1.useCallback)(() => {
        setTimeout(() => {
            var _a;
            if (!widget) {
                (_a = window.videoask) === null || _a === void 0 ? void 0 : _a.loadEmbed(config, Object.assign(Object.assign({}, callbacks), { onCloseModal: () => {
                        var _a;
                        (_a = callbacks === null || callbacks === void 0 ? void 0 : callbacks.onCloseModal) === null || _a === void 0 ? void 0 : _a.call(callbacks, removeWidget);
                    } })).then((el) => setWidget(el));
            }
        }, delay || 3000);
    }, [callbacks, config, removeWidget, widget]);
    const hideWidget = (0, react_1.useCallback)(() => {
        removeWidget();
    }, [removeWidget]);
    return (react_1.default.createElement(exports.VideoAskContext.Provider, { value: {
            showWidget,
            hideWidget,
        } }, children));
};
exports.default = VideoAskProvider;

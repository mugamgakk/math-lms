import { useContext, useEffect, useCallback } from "react";
import { UNSAFE_NavigationContext as NavigationContext } from "react-router-dom";

export function useBlocker(blocker, when = true) {
    let { navigator } = useContext(NavigationContext);

    useEffect(() => {
        if (!when) return;

        const push = navigator.push;

        navigator.push = (...args) => {
            const result = blocker();
            if (result !== false) {
                push(...args);
            }
        };

        return () => {
            navigator.push = push;
        };
    }, [navigator, blocker, when]);
}

export function usePrompt(message, when = true) {
    useEffect(() => {
        if (when) {
            window.onbeforeunload = function () {
                return message;
            };
        }

        return () => {
            window.onbeforeunload = null;
        };
    }, [message, when]);

    const confirmExit = useCallback(() => {
        const confirm = window.confirm(message);
        return confirm;
    }, [message]);

    useBlocker(confirmExit, when);
}

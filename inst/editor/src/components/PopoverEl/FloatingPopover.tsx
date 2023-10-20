import * as React from "react";

import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  useMergeRefs,
  FloatingPortal,
  FloatingArrow,
  arrow,
} from "@floating-ui/react";
import type { Placement } from "@floating-ui/react";
import ReactMarkdown from "react-markdown";

import { mergeClasses } from "../../utils/mergeClasses";

import styles from "./styles.module.css";

export interface TooltipOptions {
  initialOpen?: boolean;
  placement?: Placement;
  open?: boolean;
  onOpenChange?: React.Dispatch<React.SetStateAction<boolean>>;
  offset?:
    | number
    | {
        mainAxis?: number;
        crossAxis?: number;
        alignmentAxis?: number | null;
      };
}

function useTooltip({
  initialOpen = false,
  placement = "top",
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  ...opts
}: TooltipOptions = {}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(initialOpen);
  const arrowRef = React.useRef(null);

  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;
  const toggleOpen = React.useCallback(() => {
    setOpen((is_open) => !is_open);
  }, [setOpen]);

  const data = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(opts.offset ?? 7),
      flip({
        fallbackAxisSideDirection: "start",
      }),
      arrow({
        element: arrowRef,
      }),
      shift({ padding: 5 }),
    ],
  });

  const context = data.context;

  const hover = useHover(context, {
    move: false,
    enabled: controlledOpen == null,
  });
  const focus = useFocus(context, {
    enabled: controlledOpen == null,
  });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "tooltip" });

  const interactions = useInteractions([hover, focus, dismiss, role]);

  return React.useMemo(
    () => ({
      open,
      setOpen,
      toggleOpen,
      arrowRef,
      ...interactions,
      ...data,
    }),
    [open, setOpen, toggleOpen, interactions, data]
  );
}

type ContextType = ReturnType<typeof useTooltip> | null;

const tooltipContext = React.createContext<ContextType>(null);

export const useTooltipContext = () => {
  const context = React.useContext(tooltipContext);

  if (context == null) {
    throw new Error("Tooltip components must be wrapped in <Tooltip />");
  }

  return context;
};

/**
 * Context provider for tooltip components.
 *
 * @example
 * ```tsx
 * <Tooltip>
 *  <TooltipTrigger>
 *    <button>Hover me</button>
 *  </TooltipTrigger>
 *  <TooltipContent>
 *   <p>Tooltip content</p>
 *  </TooltipContent>
 * </Tooltip>
 */
export function Tooltip({
  children,
  ...options
}: { children: React.ReactNode } & TooltipOptions) {
  // This can accept any props as options, e.g. `placement`,
  // or other positioning options.
  const tooltip = useTooltip(options);
  return (
    <tooltipContext.Provider value={tooltip}>
      {children}
    </tooltipContext.Provider>
  );
}

export const TooltipTrigger = React.forwardRef<
  HTMLElement,
  React.HTMLProps<HTMLElement> & { asChild?: boolean; noToggle?: boolean }
>(function TooltipTrigger(
  { children, asChild = false, noToggle = false, ...props },
  propRef
) {
  const context = useTooltipContext();
  const childrenRef = (children as any).ref;
  const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef]);

  // A lot of things in our app can be dragged. With the default behavior the
  // tooltip will stay open when dragged. By toggling the tooltip on mouse down
  // and mouse up we can avoid this as clicking down to start the drag will
  // close it. We need to toggle it back open so the user doesn't get stuck in a
  // weird no-tooltip scenario when they have started a drag but not finished it
  const toggle_props = React.useMemo(
    () =>
      noToggle
        ? {}
        : {
            onMouseDown: context.toggleOpen,
            onMouseUp: context.toggleOpen,
          },
    [context.toggleOpen, noToggle]
  );

  // `asChild` allows the user to pass any element as the anchor
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(
      children,
      context.getReferenceProps({
        ref,
        ...props,
        ...children.props,
        ...toggle_props,
        "data-state": context.open ? "open" : "closed",
      })
    );
  }

  return (
    <button
      ref={ref}
      // The user can style the trigger based on the state
      data-state={context.open ? "open" : "closed"}
      {...context.getReferenceProps(props)}
      {...toggle_props}
    >
      {children}
    </button>
  );
});

export const MarkdownTooltipContent = React.forwardRef<
  HTMLDivElement,
  { content: string }
>(function MarkdownTooltipContent({ content }, propRef) {
  return (
    <TooltipContent ref={propRef}>
      <ReactMarkdown className={styles.popoverMarkdown}>
        {content}
      </ReactMarkdown>
    </TooltipContent>
  );
});

export const TooltipContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>(function TooltipContent({ children, className, ...props }, propRef) {
  const context = useTooltipContext();
  const ref = useMergeRefs([context.refs.setFloating, propRef]);

  return (
    <FloatingPortal>
      {context.open && (
        <>
          <div
            ref={ref}
            className={mergeClasses(
              "p-2 rounded-standard bg-rstudio-white overflow-hidden",
              className
            )}
            style={{
              position: context.strategy,
              zIndex: 10,
              top: context.y ?? 0,
              left: context.x ?? 0,
              visibility: context.x == null ? "hidden" : "visible",
              filter: "var(--simple-drop-shadow-filter)",
              ...props.style,
            }}
            {...context.getFloatingProps(props)}
          >
            {children}
            <FloatingArrow
              ref={context.arrowRef}
              context={context.context}
              fill="var(--rstudio-white, white)"
            />
          </div>
        </>
      )}
    </FloatingPortal>
  );
});

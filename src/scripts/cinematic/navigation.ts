import { clientCopy } from "./client";
type Transition = {
  version: number;
  animation?: Animation;
  children: Animation[];
  opening?: ReturnType<typeof setTimeout>;
  closing?: ReturnType<typeof setTimeout>;
};

// Native details remain the fallback. Enhancement keeps closing panels visible
// only for their exit transition, immediately removing them from interaction.
export function enhanceNavigation(
  motionAllowed: () => boolean,
  motionListeners: (() => void)[],
  updateIcons: (root: ParentNode) => void,
) {
  const header = document.querySelector<HTMLElement>(".site-header")!;
  const nav = header.querySelector<HTMLElement>("#site-nav")!;
  const button = header.querySelector<HTMLButtonElement>(".menu-toggle")!;
  const menus = [...nav.querySelectorAll<HTMLDetailsElement>(".nav-menu")];
  const transitions = new Map<HTMLDetailsElement, Transition>(
    menus.map((menu) => [menu, { children: [], version: 0 }]),
  );
  let drawer: Animation | undefined;
  let drawerVersion = 0;
  const expanded = (menu: HTMLDetailsElement) =>
    menu.dataset.navState === "opening" || menu.dataset.navState === "open";
  const cancel = (transition: Transition) => {
    transition.version++;
    if (transition.animation) {
      transition.animation.onfinish = null;
      transition.animation.cancel();
      transition.animation = undefined;
    }
    transition.children.forEach((animation) => animation.cancel());
    transition.children = [];
    clearTimeout(transition.opening);
    clearTimeout(transition.closing);
  };
  function setOpen(
    menu: HTMLDetailsElement,
    opening: boolean,
    immediate = false,
  ) {
    if (expanded(menu) === opening && !immediate) return;
    const panel = menu.querySelector<HTMLElement>(".nav-popover")!;
    const summary = menu.querySelector<HTMLElement>("summary")!;
    const transition = transitions.get(menu)!;
    const visible = menu.open;
    const current = getComputedStyle(panel);
    const opacity = visible ? current.opacity : "0";
    const transform = visible
      ? current.transform
      : "translateY(-8px) scale(.985)";
    const height = visible ? panel.getBoundingClientRect().height : 0;
    cancel(transition);
    const version = transition.version;
    if (opening) {
      menus
        .filter((other) => other !== menu)
        .forEach((other) => setOpen(other, false, immediate));
      menu.open = true;
      if (innerWidth > 960 && panel.classList.contains("compact-menu")) {
        const trigger = summary.getBoundingClientRect();
        const width = panel.offsetWidth;
        const center = trigger.left + trigger.width / 2;
        const left = Math.max(
          16,
          Math.min(
            center - width / 2,
            document.documentElement.clientWidth - width - 16,
          ),
        );
        panel.style.setProperty("--nav-offset", `${left - center}px`);
      }
    }
    summary.setAttribute("aria-expanded", String(opening));
    panel.inert = !opening;
    panel.setAttribute("aria-hidden", String(!opening));
    menu.dataset.navState = opening ? "opening" : "closing";
    const finish = () => {
      if (version !== transition.version) return;
      cancel(transition);
      menu.open = opening;
      menu.dataset.navState = opening ? "open" : "closed";
    };
    if (
      (!visible && !opening) ||
      immediate ||
      !motionAllowed() ||
      typeof panel.animate !== "function"
    )
      return finish();
    const mobile = innerWidth <= 960;
    const frames: Keyframe[] = mobile
      ? [
          { height: `${height}px`, opacity, overflow: "hidden" },
          {
            height: `${opening ? panel.scrollHeight : 0}px`,
            opacity: opening ? 1 : 0,
            overflow: "hidden",
          },
        ]
      : [
          { opacity, transform },
          {
            opacity: opening ? 1 : 0,
            transform: opening
              ? "translateY(0) scale(1)"
              : "translateY(-4px) scale(.99)",
          },
        ];
    transition.animation = panel.animate(frames, {
      duration: opening ? 280 : 160,
      easing: "cubic-bezier(.22,1,.36,1)",
      fill: "both",
    });
    transition.animation.onfinish = finish;
    if (opening && !visible && !mobile) {
      transition.children = [
        ...panel.querySelectorAll<HTMLElement>(
          ".menu-intro, .menu-grid > a, .menu-item",
        ),
      ].map((item, index) =>
        item.animate(
          [
            { opacity: 0, transform: "translateY(6px)" },
            { opacity: 1, transform: "translateY(0)" },
          ],
          {
            duration: 180,
            delay: 12 + Math.min(index * 18, 72),
            easing: "cubic-bezier(.22,1,.36,1)",
            fill: "both",
          },
        ),
      );
    }
  }
  function buttonState(opening: boolean) {
    button.setAttribute("aria-expanded", String(opening));
    button.setAttribute(
      "aria-label",
      opening ? clientCopy.menuClose : clientCopy.menuOpen,
    );
    const glyph = button.querySelector<HTMLElement>("i");
    if (glyph) {
      glyph.dataset.icon = opening ? "X" : "List";
      updateIcons(button);
    }
  }
  function cancelDrawer() {
    drawerVersion++;
    if (!drawer) return;
    drawer.onfinish = null;
    drawer.cancel();
    drawer = undefined;
  }
  function closeNavigation(returnFocus = false, immediate = false) {
    const visible =
      document.body.dataset.menu === "open" ||
      document.body.dataset.menu === "closing";
    const current = getComputedStyle(nav);
    const opacity = current.opacity;
    const transform = current.transform;
    cancelDrawer();
    const version = drawerVersion;
    buttonState(false);
    if (!visible) menus.forEach((menu) => setOpen(menu, false, immediate));
    if (returnFocus) button.focus();
    const finish = () => {
      if (version !== drawerVersion) return;
      cancelDrawer();
      if (visible) menus.forEach((menu) => setOpen(menu, false, true));
      document.body.dataset.menu = "closed";
      document
        .querySelectorAll<HTMLElement>("main, .site-footer")
        .forEach((el) => (el.inert = false));
      document.body.style.removeProperty("overflow");
      nav.inert = false;
      nav.removeAttribute("aria-hidden");
    };
    if (
      !visible ||
      immediate ||
      !motionAllowed() ||
      typeof nav.animate !== "function"
    )
      return finish();
    document.body.dataset.menu = "closing";
    nav.inert = true;
    nav.setAttribute("aria-hidden", "true");
    drawer = nav.animate(
      [
        { opacity, transform },
        { opacity: 0, transform: "translateY(-12px)" },
      ],
      { duration: 160, easing: "cubic-bezier(.22,1,.36,1)", fill: "both" },
    );
    drawer.onfinish = finish;
  }
  button.addEventListener("click", () => {
    if (button.getAttribute("aria-expanded") === "true")
      return closeNavigation(true);
    cancelDrawer();
    document.body.dataset.menu = "open";
    nav.inert = false;
    nav.removeAttribute("aria-hidden");
    document
      .querySelectorAll<HTMLElement>("main, .site-footer")
      .forEach((el) => (el.inert = true));
    document.body.style.overflow = "hidden";
    buttonState(true);
    menus.forEach((menu, index) => setOpen(menu, index === 0, true));
    menus[0].querySelector<HTMLElement>("summary")!.focus();
    if (motionAllowed() && typeof nav.animate === "function") {
      const animation = nav.animate(
        [
          { opacity: 0, transform: "translateY(-12px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        { duration: 240, easing: "cubic-bezier(.22,1,.36,1)", fill: "both" },
      );
      drawer = animation;
      animation.onfinish = () => {
        if (drawer === animation) cancelDrawer();
      };
    }
  });
  menus.forEach((menu) => {
    const summary = menu.querySelector<HTMLElement>("summary")!;
    const transition = transitions.get(menu)!;
    setOpen(menu, false, true);
    summary.addEventListener("click", (event) => {
      event.preventDefault();
      menu.dataset.input = event.detail === 0 ? "keyboard" : "pointer";
      const keepHoveredOpen =
        event.detail > 0 && menu.dataset.openedBy === "hover" && expanded(menu);
      menu.dataset.openedBy = "activation";
      if (!keepHoveredOpen) setOpen(menu, !expanded(menu));
    });
    menu.addEventListener("pointerenter", (event) => {
      if (event.pointerType !== "mouse" || innerWidth <= 960) return;
      clearTimeout(transition.closing);
      menu.dataset.input = "pointer";
      if (!expanded(menu))
        transition.opening = setTimeout(() => {
          menu.dataset.openedBy = "hover";
          setOpen(menu, true);
        }, 100);
    });
    summary.addEventListener("pointerdown", () =>
      clearTimeout(transition.opening),
    );
    menu.addEventListener("pointerleave", () => {
      clearTimeout(transition.opening);
      if (innerWidth > 960)
        transition.closing = setTimeout(() => {
          if (
            menu.dataset.input !== "keyboard" ||
            !menu.contains(document.activeElement)
          )
            setOpen(menu, false);
        }, 180);
    });
    summary.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowDown") return;
      event.preventDefault();
      menu.dataset.input = "keyboard";
      menu.dataset.openedBy = "activation";
      setOpen(menu, true);
      menu.querySelector<HTMLElement>("a")?.focus();
    });
    menu.addEventListener("focusout", (event) => {
      if (
        innerWidth > 960 &&
        event.relatedTarget instanceof Node &&
        !menu.contains(event.relatedTarget)
      )
        setOpen(menu, false);
    });
  });
  nav
    .querySelectorAll("a")
    .forEach((link) =>
      link.addEventListener("click", () => closeNavigation(false, true)),
    );
  document.addEventListener("click", (event) => {
    if (event.target instanceof Node && !header.contains(event.target))
      closeNavigation();
  });
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Tab" &&
      button.getAttribute("aria-expanded") === "true"
    ) {
      const controls = [
        ...header.querySelectorAll<HTMLElement>("a,button,summary"),
      ].filter(
        (el) => el.getClientRects().length > 0 && !el.closest("[inert]"),
      );
      const first = controls[0],
        last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    if (event.key !== "Escape") return;
    if (button.getAttribute("aria-expanded") === "true")
      return closeNavigation(true);
    const menu = menus.find(expanded);
    if (menu) {
      menu.querySelector<HTMLElement>("summary")!.focus();
      setOpen(menu, false);
    }
  });
  window.addEventListener("resize", () => closeNavigation(false, true));
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) closeNavigation(false, true);
  });
  motionListeners.push(() => {
    if (!motionAllowed()) {
      menus.forEach((menu) => setOpen(menu, expanded(menu), true));
      if (document.body.dataset.menu === "closing")
        closeNavigation(false, true);
      else cancelDrawer();
    }
  });
  closeNavigation(false, true);
}

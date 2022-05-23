import type { Rule } from "unocss";
import {
  cssvar,
  makeBorder,
  makeColor,
  makeNumber,
  makeSide,
  makeValues,
  percentToEm,
  px,
} from "./adorable.makeValue";

export const adorable2uno: Rule[] = [
  [/^c\((\S+)\)$/, ([, value]) => ({ color: makeColor(value) })],

  [/^m\((\S+)\)$/, ([, value]) => ({ margin: makeSide(value) })],
  [/^mt\((\S+)\)$/, ([, value]) => ({ "margin-top": px(value) })],
  [/^mr\((\S+)\)$/, ([, value]) => ({ "margin-right": px(value) })],
  [/^mb\((\S+)\)$/, ([, value]) => ({ "margin-bottom": px(value) })],
  [/^ml\((\S+)\)$/, ([, value]) => ({ "margin-left": px(value) })],

  [/^p\((\S+)\)$/, ([, value]) => ({ padding: makeSide(value) })],
  [/^pt\((\S+)\)$/, ([, value]) => ({ "padding-top": px(value) })],
  [/^pr\((\S+)\)$/, ([, value]) => ({ "padding-right": px(value) })],
  [/^pb\((\S+)\)$/, ([, value]) => ({ "padding-bottom": px(value) })],
  [/^pl\((\S+)\)$/, ([, value]) => ({ "padding-left": px(value) })],

  [/^b\((\S+)\)$/, ([, value]) => ({ border: makeBorder(value) })],
  [/^bt\((\S+)\)$/, ([, value]) => ({ "border-top": makeBorder(value) })],
  [/^br\((\S+)\)$/, ([, value]) => ({ "border-right": makeBorder(value) })],
  [/^bb\((\S+)\)$/, ([, value]) => ({ "border-bottom": makeBorder(value) })],
  [/^bl\((\S+)\)$/, ([, value]) => ({ "border-left": makeBorder(value) })],

  [/^r\((\S+)\)$/, ([, value]) => ({ "border-radius": makeSide(value) })],
  [
    /^rt\((\S+)\)$/,
    ([, value]) => ({
      "border-top-left-radius": px(value),
      "border-top-right-radius": px(value),
    }),
  ],
  [
    /^rr\((\S+)\)$/,
    ([, value]) => ({
      "border-top-right-radius": px(value),
      "border-bottom-right-radius": px(value),
    }),
  ],
  [
    /^rb\((\S+)\)$/,
    ([, value]) => ({
      "border-bottom-left-radius": px(value),
      "border-bottom-right-radius": px(value),
    }),
  ],
  [
    /^rl\((\S+)\)$/,
    ([, value]) => ({
      "border-top-left-radius": px(value),
      "border-bottom-left-radius": px(value),
    }),
  ],

  [/^z\((\S+)\)$/, ([, value]) => ({ "z-index": cssvar(value) })],
  [
    /^w\((\S+)\)$/,
    ([, value]) => {
      if (value.includes("~")) {
        const result: Record<string, string | number> = {};
        const [min, max] = value.split("~");
        if (min) result["min-width"] = px(min);
        if (max) result["max-width"] = px(max);
        return result;
      }
      return { width: px(value) };
    },
  ],
  [
    /^h\((\S+)\)$/,
    ([, value]) => {
      if (value.includes("~")) {
        const result: Record<string, string | number> = {};
        const [min, max] = value.split("~");
        if (min) result["min-height"] = px(min);
        if (max) result["max-height"] = px(max);
        return result;
      }
      return { height: px(value) };
    },
  ],

  [/^top\((\S+)\)$/, ([, value]) => ({ top: px(value) })],
  [/^left\((\S+)\)$/, ([, value]) => ({ left: px(value) })],
  [/^right\((\S+)\)$/, ([, value]) => ({ right: px(value) })],
  [/^bottom\((\S+)\)$/, ([, value]) => ({ bottom: px(value) })],

  [
    /^font\((\S+)\)$/,
    ([, value]) => {
      const values = value?.split("/");
      const result: Record<string, string | number> = {};
      values?.forEach((value, index) => {
        if (value === "-") return;

        switch (index) {
          case 0: {
            return (result["font-size"] = px(value));
          }
          case 1: {
            return (result["line-height"] = `${
              +value < 4 ? makeNumber(+value) : px(value)
            }`);
          }
          case 2: {
            return (result["letter-spacing"] = percentToEm(value));
          }
        }
      });
      return result;
    },
  ],

  ["thin", { "font-weight": "200" }],
  ["light", { "font-weight": "300" }],
  ["regular", { "font-weight": "normal" }],
  ["medium", { "font-weight": "500" }],
  ["semibold", { "font-weight": "600" }],
  ["bold", { "font-weight": "bold" }],
  ["heavy", { "font-weight": "900" }],

  [
    /^box\-shadow\((\S+)\)$/,
    ([, value]) => ({ "box-shadow": makeValues(value) }),
  ],
  [
    /^caret-color\((\S+)\)$/,
    ([, value]) => ({ "caret-color": makeColor(value) }),
  ],
  [
    /^backdrop-blur\((\S+)\)$/,
    ([, value]) => ({ "backdrop-filter": `blur(${px(value)})` }),
  ],
  [
    /^invert\((\S+)\)$/,
    ([, value]) => ({ filter: `invert(${cssvar(value)})` }),
  ],
  [/^opacity\((\S+)\)$/, ([, value]) => ({ opacity: cssvar(value) })],
  [/^bg\((\S+)\)$/, ([, value]) => ({ "background-color": makeColor(value) })],
  [
    /^layer(\((\S+)\))?$/,
    ([, , value]) => {
      const pos: Record<string, string | number> = {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      };
      value?.split("+").forEach((v) => {
        switch (v) {
          case "top": {
            return delete pos.bottom;
          }
          case "right": {
            return delete pos.left;
          }
          case "bottom": {
            return delete pos.top;
          }
          case "left": {
            return delete pos.right;
          }
        }
      });
      return pos;
    },
  ],
  [
    /^hbox(\((\S+)\))?$/,
    ([, , value]) => {
      const result: Record<string, string | number> = {
        display: "flex",
        "flex-flow": "row",
        "align-items": "center",
      };
      const values = value?.split("+");
      values?.forEach((v) => {
        switch (v) {
          case "top": {
            return (result["align-items"] = "flex-start");
          }
          case "bottom": {
            return (result["align-items"] = "flex-end");
          }
          case "fill": {
            return (result["align-items"] = "stretch");
          }
          case "stretch": {
            return (result["align-items"] = "stretch");
          }
          case "space-between": {
            return (result["justify-content"] = "space-between");
          }
          case "center": {
            return (result["justify-content"] = "center");
          }
          case "left": {
            return values.includes("reverse")
              ? (result["justify-content"] = "flex-end")
              : (result["justify-content"] = "flex-start");
          }
          case "right": {
            return values.includes("reverse")
              ? (result["justify-content"] = "flex-start")
              : (result["justify-content"] = "flex-end");
          }
          case "reverse": {
            return (result["flex-direction"] = "row-reverse");
          }
        }
      });
      return result;
    },
  ],
  [
    /^vbox(\((\S+)\))?$/,
    ([, , value]) => {
      const result: Record<string, string | number> = {
        display: "flex",
        "flex-flow": "column",
        "align-items": "center",
      };
      const values = value?.split("+");
      values?.forEach((v) => {
        switch (v) {
          case "left": {
            return (result["align-items"] = "flex-start");
          }
          case "center": {
            return (result["align-items"] = "center");
          }
          case "right": {
            return (result["align-items"] = "flex-end");
          }
          case "top": {
            return (
              values.includes("reverse") &&
              (result["justify-content"] = "flex-end")
            );
          }
          case "middle": {
            return (result["justify-content"] = "center");
          }
          case "bottom": {
            return (
              !values.includes("reverse") &&
              (result["justify-content"] = "flex-end")
            );
          }
          case "reverse": {
            return (result["flex-direction"] = "column-reverse");
          }
        }
      });
      return result;
    },
  ],
  [
    "pack",
    { display: "flex", "justify-content": "center", "align-items": "center" },
  ],

  [
    /^space\((\S+)\)$/,
    ([, value]) => ({ width: px(value), height: px(value) }),
  ],

  ["nowrap", { "white-space": "nowrap" }],
  [
    "nowrap...",
    {
      "white-space": "nowrap",
      "text-overflow": "ellipsis",
      overflow: "hidden",
    },
  ],
  ["no-border", { border: "none", outline: "none" }],
  ["none", { display: "none" }],

  [
    "cover",
    {
      "background-size": "cover",
      "background-position": "center",
      "background-repeat": "no-repeat",
      "object-fit": "cover",
    },
  ],
];

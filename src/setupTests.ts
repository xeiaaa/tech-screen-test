// src/setupTests.ts (or wherever your setup file is)
import "@testing-library/jest-dom";
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

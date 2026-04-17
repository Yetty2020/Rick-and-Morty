# 🌀 Rick & Morty Character Portal

A high-performance, immersive character database built to bridge the gap between gritty "comic-book" aesthetics and modern web performance. 

[(https://rick-and-morty-blush-mu.vercel.app/)]

---

## 🚀 The Mission
The goal was to build a portal that feels like a salvaged piece of Citadel technology. I focused on moving away from "clean" minimalist UI to experiment with heavy SVG filters, displacement textures, and complex GSAP orchestrations—all while maintaining a 60fps experience.

## 🛠️ Tech Stack
* Frontend: React 18, TypeScript, Tailwind CSS
* Animations: GSAP (GreenSock)
* Data Fetching: GraphQL (Apollo/URQL)

## ✨ Key Features
* **Intelligent Search:** A custom debounced search terminal that handles heavy UI filtering without input lag.
* **Bento Grid Layout:** A responsive, non-traditional grid that adapts character vitals into an organized "desk file" aesthetic.
* **Chromatic Aberration:** CSS-driven "split-panel" hover effects mimicking vintage comic book misprints.
* **Interactive Scanners:** Dynamic scan-line animations and targeting UI for every character card.

## 🧠 Technical Challenges & Solutions

### The "Laggy Input" Problem
Challenge: Applying multiple SVG filters (turbulence and displacement) to dozens of cards simultaneously caused significant frame drops during real-time searching.
Solution: I implemented a custom `useEffect` debounce pattern. By delaying the state sync by 500ms, I reduced the re-render load significantly, allowing the browser to prioritize the input responsiveness before recalculating the complex filter layouts.

### Efficient Data Querying
Challenge: The character list contains deep nested data, much of which wasn't needed for the initial portal view.
Solution: Used GraphQL to request only the necessary fields (name, status, origin, image), reducing the payload size and speeding up the initial load time.

